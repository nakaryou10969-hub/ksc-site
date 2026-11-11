import { createClient } from "microcms-js-sdk";

// NovolBa の microCMS（WITH）で「KSCサイトに表示」（showOnKsc）がオンの記事を取得し、
// KSC トップの記事カード用に整形する。カードは novolba.com の記事ページへリンクする。

const NOVOLBA_SITE_URL = "https://novolba.com";
const KSC_FLAG_FIELD = "showOnKsc";

export type NovolbaWithArticle = {
  id: string;
  slug?: string;
  title: string;
  publishedAt?: string;
  eyecatch?: {
    url: string;
    height?: number;
    width?: number;
  } | null;
  content?: string;
};

export type ArticleCardItem = {
  href: string;
  img: string;
  title: string;
  date: string;
  external?: boolean;
};

function getNovolbaClient() {
  const serviceDomain = process.env.NOVOLBA_MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.NOVOLBA_MICROCMS_API_KEY;
  if (!serviceDomain || !apiKey) return null;
  return createClient({ serviceDomain, apiKey });
}

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

// NovolBa 側の記事URL（/media/{slug または id}/）と同じ規則で組み立てる
export function toNovolbaArticleUrl(article: Pick<NovolbaWithArticle, "id" | "slug">) {
  const segment = article.slug ? safeDecodeURIComponent(article.slug) : article.id;
  return `${NOVOLBA_SITE_URL}/media/${encodeURIComponent(segment)}/`;
}

export function extractFirstImage(html?: string) {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

// microCMS の画像はカード用に横幅を縮めて取得する
export function toCardImageUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "images.microcms-assets.io" && !parsed.searchParams.has("w")) {
      parsed.searchParams.set("w", "960");
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

export function toArticleCard(
  article: NovolbaWithArticle,
  formatDate: (value: string) => string,
): ArticleCardItem {
  const image = article.eyecatch?.url ?? extractFirstImage(article.content) ?? "";
  return {
    href: toNovolbaArticleUrl(article),
    img: image ? toCardImageUrl(image) : "",
    title: article.title,
    date: article.publishedAt ? formatDate(article.publishedAt) : "",
    external: true,
  };
}

/**
 * NovolBa の接続情報が未設定なら null を返す（従来どおり KSC 側の blog を使う）。
 * 取得に失敗した場合も null を返し、呼び出し側の従来表示に任せる。
 */
export async function getKscArticlesFromNovolba(
  formatDate: (value: string) => string,
  limit = 12,
): Promise<ArticleCardItem[] | null> {
  const client = getNovolbaClient();
  if (!client) return null;

  try {
    const data = await client.getList<NovolbaWithArticle>({
      endpoint: "with",
      queries: {
        limit,
        orders: "-publishedAt",
        filters: `${KSC_FLAG_FIELD}[equals]true`,
        fields: "id,slug,title,publishedAt,eyecatch,content",
      },
    });
    return data.contents.map((article) => toArticleCard(article, formatDate));
  } catch (error) {
    console.warn("[ksc] NovolBa WITH の記事取得に失敗しました。KSC の blog を表示します。", error);
    return null;
  }
}
