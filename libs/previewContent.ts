import createDOMPurify, { type WindowLike } from "dompurify";
import type { EventArticleData } from "@/app/components/EventArticle";

const imageHosts = new Set(["images.microcms-assets.io", "novolba.com", "kansta.jp"]);
const articleClasses = new Set([
  "wp-block-button", "wp-block-button__link", "ksc-btn", "article-shortcode-button",
  "article-image-text", "article-image-text__figure", "article-image-text__body",
  "article-toc", "article-toc__title", "article-toc__item",
  "article-toc__item--h1", "article-toc__item--h2", "article-toc__item--h3",
  "article-toc__item--h4", "article-toc__item--h5", "wp-block-gallery",
  "blocks-gallery-grid", "blocks-gallery-item", "article-shortcode-gallery",
  "ksc-half-right-figure", "ksc-half-right-image", "ksc-left-figure", "ksc-left-image",
  "h2-banner", "no-marker", "alignleft", "aligncenter", "alignright",
]);

export function isSafePreviewUrl(value: string, image = false) {
  if (/[\u0000-\u0020\u007f-\u009f\\]/.test(value)) return false;
  if (!image && /^#[A-Za-z][A-Za-z0-9_-]{0,127}$/.test(value)) return true;
  if (/^\/(?!\/)/.test(value)) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password && !url.port &&
      (!image || imageHosts.has(url.hostname));
  } catch {
    return false;
  }
}

function safeArticleStyle(value: string) {
  return value.split(";").flatMap((declaration) => {
    const separator = declaration.indexOf(":");
    if (separator < 0) return [];
    const name = declaration.slice(0, separator).trim().toLowerCase();
    const cssValue = declaration.slice(separator + 1).trim();
    if (name === "--gallery-columns" && /^[1-4]$/.test(cssValue)) return [`${name}: ${cssValue}`];
    if (name === "--ksc-half-image-width" && /^\d{1,5}px$/.test(cssValue) &&
        Number.parseInt(cssValue, 10) > 0 && Number.parseInt(cssValue, 10) <= 10000) return [`${name}: ${cssValue}`];
    if (name === "text-align" && /^(left|center|right|justify)$/.test(cssValue)) return [`${name}: ${cssValue}`];
    if (name === "font-weight" && /^(normal|bold|[1-9]00)$/.test(cssValue)) return [`${name}: ${cssValue}`];
    if (name === "text-decoration" && /^(none|underline|line-through)$/.test(cssValue)) return [`${name}: ${cssValue}`];
    if ((name === "color" || name === "background-color") && /^#[\da-f]{3,8}$/i.test(cssValue)) return [`${name}: ${cssValue}`];
    return [];
  }).join("; ");
}

/** Always call after every shortcode and article-specific transformation. */
export function sanitizePreviewHtml(html: string, view: WindowLike) {
  const purifier = createDOMPurify(view);
  purifier.addHook("uponSanitizeAttribute", (_node, attribute) => {
    const { attrName, attrValue } = attribute;
    if ((attrName === "src" && !isSafePreviewUrl(attrValue, true)) ||
        (attrName === "href" && !isSafePreviewUrl(attrValue))) attribute.keepAttr = false;
    if (attrName === "class") {
      attribute.attrValue = attrValue.split(/\s+/).filter((value) => articleClasses.has(value)).join(" ");
      attribute.keepAttr = Boolean(attribute.attrValue);
    }
    if (attrName === "style") {
      attribute.attrValue = safeArticleStyle(attrValue);
      attribute.keepAttr = Boolean(attribute.attrValue);
    }
    if (attrName === "id" && !/^[A-Za-z][A-Za-z0-9_-]{0,127}$/.test(attrValue)) attribute.keepAttr = false;
    if (["width", "height", "colspan", "rowspan"].includes(attrName) &&
        (!/^\d{1,5}$/.test(attrValue) || Number(attrValue) < 1 || Number(attrValue) > 10000)) attribute.keepAttr = false;
    if (attrName === "target" && attrValue !== "_blank" && attrValue !== "_self") attribute.keepAttr = false;
  });
  purifier.addHook("afterSanitizeAttributes", (node) => {
    if (node.nodeName === "A") node.setAttribute("rel", "noopener noreferrer");
  });
  return purifier.sanitize(html, {
    ALLOWED_TAGS: ["p", "br", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "em", "u", "s",
      "span", "div", "a", "blockquote", "ul", "ol", "li", "hr", "figure", "figcaption", "img",
      "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "pre", "code", "nav", "ruby", "rt", "rp"],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "width", "height", "class", "id", "style", "target", "rel",
      "loading", "decoding", "fetchpriority", "colspan", "rowspan", "aria-label"],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: false,
  });
}

export function normalizePreviewContent(value: unknown, expectedId: string): EventArticleData | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const content = value as Record<string, unknown>;
  if (content.id !== expectedId || typeof content.title !== "string" || content.title.length > 10000 ||
      (content.content !== undefined && typeof content.content !== "string") ||
      (typeof content.content === "string" && content.content.length > 2 * 1024 * 1024) ||
      (content.date !== undefined && typeof content.date !== "string")) return null;
  let eyecatch: EventArticleData["eyecatch"];
  if (content.eyecatch && typeof content.eyecatch === "object" && !Array.isArray(content.eyecatch)) {
    const image = content.eyecatch as Record<string, unknown>;
    if (typeof image.url === "string" && isSafePreviewUrl(image.url, true)) {
      eyecatch = {
        url: image.url,
        width: typeof image.width === "number" && Number.isFinite(image.width) && image.width > 0 ? image.width : 1280,
        height: typeof image.height === "number" && Number.isFinite(image.height) && image.height > 0 ? image.height : 720,
      };
    }
  }
  return {
    id: expectedId,
    title: content.title,
    date: typeof content.date === "string" ? content.date : undefined,
    content: typeof content.content === "string" ? content.content : "",
    eyecatch,
  };
}
