import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const siteUrl = "https://www.kansta.jp";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KANDA Startup Commons",
    template: "%s | KANDA Startup Commons",
  },
  description: "神田から、次世代の豊かさへ。スタートアップ・新規事業・社会課題への挑戦を支えるコミュニティ。",
  authors: [{ name: "KANDA Startup Commons" }],
  icons: {
    icon: "/images/events/kansta-logo.png",
    apple: "/images/events/kansta-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "KANDA Startup Commons",
    title: "KANDA Startup Commons",
    description: "神田から、次世代の豊かさへ。スタートアップ・新規事業・社会課題への挑戦を支えるコミュニティ。",
    images: [{ url: "/images/events/kansta-logo.png", width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
