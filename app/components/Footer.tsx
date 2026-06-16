import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: "#3B3C3E", color: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-bold text-lg mb-2">KANDA Startup Commons</p>
            <div className="flex items-center gap-3 mb-3" style={{ color: "#D6D3CD" }}>
              <a
                href="https://www.instagram.com/kanda.startup_commons/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61555771292866"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-white transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14.25 8.5V6.75c0-.48.39-.75.84-.75H17V3h-2.63C11.98 3 10.5 4.42 10.5 6.6v1.9H8v3.25h2.5V21h3.75v-9.25h2.5l.5-3.25h-3Z" />
                </svg>
              </a>
            </div>
            <p className="text-sm" style={{ color: "#D6D3CD" }}>神田から、次世代の豊かさへ</p>
          </div>
          <nav className="flex flex-col gap-3 text-sm" style={{ color: "#D6D3CD" }}>
            <Link href="/#about" className="hover:text-white transition-colors">KANDA Startup Commons とは</Link>
            <Link href="/#roles" className="hover:text-white transition-colors">メンバーについて</Link>
            <Link href="/#openday" className="hover:text-white transition-colors">過去イベント</Link>
            <Link href="/#contact" className="hover:text-white transition-colors">お問い合わせ</Link>
          </nav>
        </div>
        <div className="mt-10 pt-6 border-t text-center text-sm" style={{ borderColor: "#585858", color: "#767676" }}>
          <p>&copy; {new Date().getFullYear()} KANDA Startup Commons. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
