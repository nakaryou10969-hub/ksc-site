"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "KANDA Startup Commons とは", href: "#about" },
  { label: "過去のイベント実績", href: "#openday" },
  { label: "神田について", href: "#kanda" },
  { label: "お問い合わせ", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8 h-[72px] flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="font-bold text-lg tracking-wide">
          KANDA Startup Commons
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-black transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ハンバーガーメニュー（モバイル） */}
        <button
          className="lg:hidden p-2 flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
        >
          <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-100 px-8 py-6 flex flex-col gap-5 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-black transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
