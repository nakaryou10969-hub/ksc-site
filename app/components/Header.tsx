"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          KSC
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            ホーム
          </Link>
          {/* TODO: ナビゲーション項目を追加 */}
        </nav>

        {/* ハンバーガーメニュー（モバイル） */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
        >
          <span className="block w-6 h-0.5 bg-gray-800 mb-1" />
          <span className="block w-6 h-0.5 bg-gray-800 mb-1" />
          <span className="block w-6 h-0.5 bg-gray-800" />
        </button>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-4 flex flex-col gap-4 text-sm">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            ホーム
          </Link>
          {/* TODO: ナビゲーション項目を追加 */}
        </nav>
      )}
    </header>
  );
}
