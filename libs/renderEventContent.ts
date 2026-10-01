import { renderArticleContent } from "./renderArticleContent";

const COMPACT_IMAGE_EVENT_ID = "hwuj-4b16s";
const LEFT_ALIGNED_IMAGE_EVENT_ID = "xfhqw3p4sn-k";

const compactImageTargets = [
  { term: "パネルディスカッション", exact: true },
  { term: "ちよだプラットフォームスクウェア運営" },
  { term: "タクトピア株式会社" },
  { term: "株式会社Sworkers" },
  { term: "代表理事 平沢 純一" },
  { term: "スゴシリョ" },
  { term: "SenseDrive株式会社" },
];

const leftAlignedImageTargets = [
  { term: "株式会社Sworkers", startsWith: true },
  { term: "MINDX株式会社", startsWith: true },
  { term: "経営コンサル", startsWith: true },
  { term: "富士リプロ株式会社", startsWith: true },
  { term: "fabula 株式会社", startsWith: true },
  { term: "株式会社三菱UFJ銀行", startsWith: true },
  { term: "安田不動産株式会社", startsWith: true },
];

function getTextContent(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function appendClass(tag: string, className: string) {
  if (tag.includes(className)) return tag;

  if (/\sclass=/.test(tag)) {
    return tag.replace(/\sclass=(["'])(.*?)\1/, ` class=$1$2 ${className}$1`);
  }

  return tag.replace(/>$/, ` class="${className}">`);
}

function addCompactImageStyle(imgTag: string) {
  const widthMatch = imgTag.match(/\swidth=(["']?)(\d+)\1/);
  const halfWidth = widthMatch ? Math.round(Number(widthMatch[2]) / 2) : undefined;
  const imageClass = "ksc-half-right-image";
  const nextTag = appendClass(imgTag, imageClass);

  if (!halfWidth) return nextTag;

  const customWidth = `--ksc-half-image-width: ${halfWidth}px`;
  if (/\sstyle=/.test(nextTag)) {
    return nextTag.replace(/\sstyle=(["'])(.*?)\1/, ` style=$1$2; ${customWidth}$1`);
  }

  return nextTag.replace(/>$/, ` style="${customWidth}">`);
}

function transformImagesBeforeTargets(
  html: string,
  targets: { term: string; exact?: boolean; startsWith?: boolean }[],
  transformFigure: (figure: string) => string
) {
  const blockPattern =
    /<figure[\s\S]*?<\/figure>|<h[1-6][\s\S]*?<\/h[1-6]>|<p[\s\S]*?<\/p>|<ul[\s\S]*?<\/ul>|<ol[\s\S]*?<\/ol>|<blockquote[\s\S]*?<\/blockquote>/g;
  const blocks = html.match(blockPattern);
  if (!blocks) return html;

  const transformed = [...blocks];

  for (let i = 1; i < transformed.length; i++) {
    const text = getTextContent(blocks[i]);
    const shouldTransform = targets.some(({ term, exact, startsWith }) =>
      exact ? text === term : startsWith ? text.startsWith(term) : text.includes(term)
    );

    if (!shouldTransform || !/^<figure[\s\S]*<\/figure>$/.test(blocks[i - 1])) {
      continue;
    }

    transformed[i - 1] = transformFigure(transformed[i - 1]);
  }

  let index = 0;
  return html.replace(blockPattern, () => transformed[index++]);
}

function compactImagesBeforeTargets(html: string) {
  return transformImagesBeforeTargets(html, compactImageTargets, (figure) =>
    figure
      .replace(/^<figure\b([^>]*)>/, (tag) => appendClass(tag, "ksc-half-right-figure"))
      .replace(/<img\b[^>]*>/, (tag) => addCompactImageStyle(tag))
  );
}

function leftAlignImagesBeforeTargets(html: string) {
  return transformImagesBeforeTargets(html, leftAlignedImageTargets, (figure) =>
    figure
      .replace(/^<figure\b([^>]*)>/, (tag) => appendClass(tag, "ksc-left-figure"))
      .replace(/<img\b[^>]*>/, (tag) => appendClass(tag, "ksc-left-image"))
  );
}

export function renderEventContent(content: string | undefined, id: string) {
  let html = content ? renderArticleContent(content) : content;
  if (id === COMPACT_IMAGE_EVENT_ID && html) html = compactImagesBeforeTargets(html);
  if (id === LEFT_ALIGNED_IMAGE_EVENT_ID && html) html = leftAlignImagesBeforeTargets(html);
  return html;
}
