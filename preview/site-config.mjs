// Reviewed server-side allowlist. Never accept service domains or URLs from a request.
export const SITE = Object.freeze({
  name: "KSC",
  endpoints: Object.freeze(["blog"]),
  fields: Object.freeze([
    "id", "title", "content", "date", "summary", "tag", "eyecatch",
    "createdAt", "updatedAt", "publishedAt", "revisedAt",
  ]),
});
