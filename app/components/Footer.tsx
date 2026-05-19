import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-bold text-lg mb-2">KANDA Startup Commons</p>
            <p className="text-sm text-gray-400">神田から、次世代の豊かさへ</p>
          </div>
          <nav className="flex flex-col gap-3 text-sm text-gray-400">
            <Link href="#about" className="hover:text-white transition-colors">KANDA Startup Commons とは</Link>
            <Link href="#openday" className="hover:text-white transition-colors">過去のイベント実績</Link>
            <Link href="#kanda" className="hover:text-white transition-colors">神田について</Link>
            <Link href="#contact" className="hover:text-white transition-colors">お問い合わせ</Link>
          </nav>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} KANDA Startup Commons. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
