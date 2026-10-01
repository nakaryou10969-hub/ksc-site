export type PreviewRequest = {
  endpoint: "blog";
  contentId: string;
  draftKey: string;
};

function hasOnly(params: URLSearchParams, names: readonly string[]) {
  return [...params.keys()].every((name) => names.includes(name)) &&
    names.every((name) => params.getAll(name).length === 1);
}

/** Read once from the URL; callers must remove the search and hash immediately. */
export function readPreviewRequest(url: URL): PreviewRequest | null {
  try {
    // URLSearchParams tolerates invalid escapes. Reject them before decoding tokens.
    decodeURIComponent(url.search.slice(1));
    decodeURIComponent(url.hash.slice(1));
  } catch {
    return null;
  }
  const query = url.searchParams;
  const fragment = new URLSearchParams(url.hash.slice(1));
  if (!hasOnly(query, ["endpoint", "contentId"]) ||
      !hasOnly(fragment, ["draftKey"]) || query.get("endpoint") !== "blog") return null;

  const contentId = query.get("contentId")!;
  const draftKey = fragment.get("draftKey")!;
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(contentId) || draftKey.length < 1 ||
      draftKey.length > 512 || /[\u0000-\u001f\u007f-\u009f]/.test(draftKey) ||
      /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/.test(draftKey)) return null;
  return { endpoint: "blog", contentId, draftKey };
}
