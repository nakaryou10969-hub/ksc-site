import assert from "node:assert/strict";
import test from "node:test";
import { JSDOM } from "jsdom";
import { readPreviewRequest } from "./previewInput.ts";
import { normalizePreviewContent, sanitizePreviewHtml, isSafePreviewUrl } from "./previewContent.ts";
import { renderEventContent } from "./renderEventContent.ts";
import { formatEventDate } from "./formatEventDate.ts";

const safeImage = "https://images.microcms-assets.io/assets/mock.png";
function sanitize(html) {
  const dom = new JSDOM("");
  try { return sanitizePreviewHtml(html, dom.window); }
  finally { dom.window.close(); }
}

test("unpublished and published-update URLs preserve opaque UTF-8 tokens", () => {
  for (const id of ["unpublished", "published-update"]) {
    const token = "mock + / ? & = 日本語 😀 token";
    const url = new URL(`https://preview.example/preview/?endpoint=blog&contentId=${id}`);
    url.hash = new URLSearchParams({ draftKey: token }).toString();
    assert.deepEqual(readPreviewRequest(url), { endpoint: "blog", contentId: id, draftKey: token });
  }
});

test("rejects unknown, duplicated, query-based, malformed and unsafe preview input", () => {
  const cases = [
    "?endpoint=blog&contentId=id&draftKey=mock#draftKey=mock",
    "?endpoint=blog&endpoint=blog&contentId=id#draftKey=mock",
    "?endpoint=blog&contentId=id&contentId=id#draftKey=mock",
    "?endpoint=blog&contentId=id&extra=x#draftKey=mock",
    "?endpoint=blog&contentId=id#draftKey=mock&draftKey=mock",
    "?endpoint=blog&contentId=id#draftKey=mock&extra=x",
    "?endpoint=https%3A%2F%2Fevil.example&contentId=id#draftKey=mock",
    "?endpoint=blog&contentId=..%2Fid#draftKey=mock",
    "?endpoint=blog&contentId=id#draftKey=",
    "?endpoint=blog&contentId=id#draftKey=mock%0Akey",
    "?endpoint=blog&contentId=id#draftKey=mock%C2%80key",
    "?endpoint=blog&contentId=id#draftKey=%ED%A0%80",
    "?endpoint=blog&contentId=id#draftKey=%ZZ",
    "?endpoint=blog&contentId=id#draftKey=" + "x".repeat(513),
    "?endpoint=blog&contentId=" + "x".repeat(129) + "#draftKey=mock",
    "?endpoint=blog&contentId=id",
  ];
  for (const value of cases) assert.equal(readPreviewRequest(new URL("https://preview.example/preview/" + value)), null);
});

test("drafts without dates or images are supported; response IDs and field types are checked", () => {
  const draft = normalizePreviewContent({ id: "unpublished", title: "未公開記事" }, "unpublished");
  assert.equal(draft.title, "未公開記事");
  assert.equal(draft.date, undefined);
  assert.equal(draft.content, "");
  assert.equal(formatEventDate(undefined), "");
  assert.equal(formatEventDate("invalid-date"), "");
  assert.equal(formatEventDate("2026-10-01T00:00:00.000Z"), "2026年10月1日");
  assert.equal(normalizePreviewContent({ id: "other", title: "x" }, "unpublished"), null);
  assert.equal(normalizePreviewContent({ id: "unpublished", title: { unsafe: true } }, "unpublished"), null);
  assert.equal(normalizePreviewContent({ id: "unpublished", title: "x", content: {} }, "unpublished"), null);
  assert.equal(normalizePreviewContent({ id: "unpublished", title: "x", eyecatch: { url: "javascript:alert(1)" } }, "unpublished").eyecatch, undefined);
});

test("strips script-capable markup, events, unsafe image URLs, classes and CSS", () => {
  const html = sanitize(`<script>alert(1)</script><svg><foreignObject><iframe srcdoc="unsafe"></iframe></foreignObject></svg>
    <img src="${safeImage}" onerror="alert(1)" class="ksc-left-image fixed inset-0" style="position:fixed;background:url(https://evil.example);text-align: center">
    <img src="//evil.example/pixel"><img src="data:image/svg+xml,unsafe"><img src="https://evil.example/pixel">
    <a href="jav&#x61;script:alert(1)">unsafe</a><a href="https://example.com/path" target="_blank">safe</a>
    <form><input name="location"></form><math><mtext>math</mtext></math>`);
  const dom = new JSDOM(html);
  try {
    assert.equal(dom.window.document.querySelector("script,svg,iframe,form,input,math"), null);
    const images = [...dom.window.document.querySelectorAll("img")];
    assert.equal(images[0].getAttribute("src"), safeImage);
    assert.equal(images[0].getAttribute("class"), "ksc-left-image");
    assert.equal(images[0].getAttribute("style"), "text-align: center");
    assert.ok(images.every((image) => !image.hasAttribute("onerror")));
    assert.ok(images.slice(1).every((image) => !image.hasAttribute("src")));
    assert.equal(dom.window.document.querySelectorAll("a")[0].getAttribute("href"), null);
    assert.equal(dom.window.document.querySelectorAll("a")[1].getAttribute("rel"), "noopener noreferrer");
  } finally { dom.window.close(); }
});

test("image URLs use approved HTTPS hosts or root paths and reject ambiguous origins", () => {
  for (const value of [safeImage, "https://novolba.com/image.png", "/images/local.png"]) assert.equal(isSafePreviewUrl(value, true), true);
  for (const value of ["http://images.microcms-assets.io/a", "https://evil.example/a", "//evil.example/a", "/\\evil.example/a",
    "https://user:pass@images.microcms-assets.io/a", "https://images.microcms-assets.io:444/a", "javascript:alert(1)"]) {
    assert.equal(isSafePreviewUrl(value, true), false);
  }
});

test("sanitizes after shortcode expansion and retains galleries, image/text blocks and TOC", () => {
  const content = `[[toc]]<h2>見出し</h2>[[gallery columns="3"]]${safeImage}|写真\n[[/gallery]]
    [[image-text image="${safeImage}"]]<p>本文</p>&lt;img src=&quot;https://evil.example/a&quot; onerror=&quot;alert(1)&quot;&gt;[[/image-text]]`;
  const transformed = renderEventContent(content, "published-update");
  const html = sanitize(transformed);
  const dom = new JSDOM(html);
  try {
    assert.ok(dom.window.document.querySelector(".article-shortcode-gallery"));
    assert.equal(dom.window.document.querySelector(".article-shortcode-gallery").style.getPropertyValue("--gallery-columns"), "3");
    assert.ok(dom.window.document.querySelector(".article-image-text"));
    assert.equal(dom.window.document.querySelector(".article-toc a").getAttribute("href"), "#article-heading-1");
    assert.ok(dom.window.document.getElementById("article-heading-1"));
    assert.ok([...dom.window.document.querySelectorAll("img")].every((image) => !image.hasAttribute("onerror")));
  } finally { dom.window.close(); }
});

test("article-specific compact and left images survive final sanitization", () => {
  const compact = sanitize(renderEventContent(`<figure><img src="${safeImage}" width="1000"></figure><p>パネルディスカッション</p>`, "hwuj-4b16s"));
  const left = sanitize(renderEventContent(`<figure><img src="${safeImage}"></figure><p>株式会社Sworkers 担当者</p>`, "xfhqw3p4sn-k"));
  assert.match(compact, /ksc-half-right-figure/);
  assert.match(compact, /ksc-half-right-image/);
  assert.match(compact, /--ksc-half-image-width: 500px/);
  assert.match(left, /ksc-left-figure/);
  assert.match(left, /ksc-left-image/);
  assert.equal(renderEventContent("<p>そのままの本文</p>", "ordinary"), "<p>そのままの本文</p>");
});
