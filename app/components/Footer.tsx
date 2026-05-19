import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="text-xl font-bold mb-2">KSC</p>
            {/* TODO: 団体の説明を追加 */}
          </div>

          <nav className="flex flex-col gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">
              ホーム
            </Link>
            {/* TODO: フッターリンクを追加 */}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} KSC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
