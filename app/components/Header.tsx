"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "KANDA Startup Commons とは", href: "/#about" },
  { label: "メンバーについて", href: "/#roles" },
  { label: "過去イベント", href: "/#openday" },
  { label: "お問い合わせ", href: "/#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: "#E3E0DA" }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[117px] h-[72px] flex items-center">
        <Link href="/" className="shrink-0 font-bold text-base lg:text-2xl tracking-wide" style={{ color: "#3B3C3E" }}>
          KANDA startup Commons
        </Link>

        <div className="hidden min-[1100px]:block" style={{ width: "1px", backgroundColor: "#3B3C3E", margin: "16px 40px", alignSelf: "stretch" }} />

        <nav className="hidden min-[1100px]:flex items-center justify-end gap-6 xl:gap-8 text-sm flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:opacity-60 transition-opacity whitespace-nowrap"
              style={{ color: "#3B3C3E" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="min-[1100px]:hidden ml-auto p-2 relative w-8 h-8 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
        >
          <span
            className="absolute block w-6 h-0.5 transition-all duration-300"
            style={{
              backgroundColor: "#3B3C3E",
              transform: menuOpen ? "rotate(45deg)" : "translateY(-7px)",
            }}
          />
          <span
            className="absolute block w-6 h-0.5 transition-all duration-300"
            style={{
              backgroundColor: "#3B3C3E",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="absolute block w-6 h-0.5 transition-all duration-300"
            style={{
              backgroundColor: "#3B3C3E",
              transform: menuOpen ? "rotate(-45deg)" : "translateY(7px)",
            }}
          />
        </button>
      </div>

      {menuOpen && (
        <nav className="min-[1100px]:hidden border-t px-6 py-6 flex flex-col gap-5 text-sm" style={{ backgroundColor: "#E3E0DA", borderColor: "#3B3C3E" }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:opacity-60 transition-opacity"
              style={{ color: "#3B3C3E" }}
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
