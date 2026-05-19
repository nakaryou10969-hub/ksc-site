import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">ページが見つかりませんでした</p>
      <Link
        href="/"
        className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
      >
        トップへ戻る
      </Link>
    </main>
  );
}
