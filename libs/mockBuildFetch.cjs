// Test-only preload. Never imported by production application code.
const fixtures = [{
  id: "mock-public-event",
  title: "モック公開イベント",
  date: "2026-10-01T00:00:00.000Z",
  content: "<p>実microCMSへ接続しないビルド検証用の記事です。</p>",
  summary: "モック検証用",
  tag: [],
}];

globalThis.fetch = async function mockBuildFetch(input) {
  const url = new URL(typeof input === "string" ? input : input instanceof URL ? input.href : input.url);
  if (url.hostname !== "mock-preview-build.microcms.io") throw new Error("Mock build forbids external requests");
  let payload;
  if (url.pathname === "/api/v1/blog") {
    payload = { contents: fixtures, totalCount: fixtures.length, offset: 0, limit: 100 };
  } else if (url.pathname === "/api/v1/blog/mock-public-event") {
    payload = fixtures[0];
  } else if (url.pathname === "/api/v1/news") {
    payload = { contents: [], totalCount: 0, offset: 0, limit: 100 };
  } else {
    return new Response(JSON.stringify({ message: "Not found in mock fixture" }), { status: 404, headers: { "Content-Type": "application/json" } });
  }
  return new Response(JSON.stringify(payload), { status: 200, headers: { "Content-Type": "application/json" } });
};
