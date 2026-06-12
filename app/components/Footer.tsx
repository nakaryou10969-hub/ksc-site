import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: "#3B3C3E", color: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-bold text-lg mb-2">KANDA Startup Commons</p>
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
