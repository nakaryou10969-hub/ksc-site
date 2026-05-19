import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const siteUrl = "https://example.com"; // TODO: 本番URLに変更

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KSC",
    template: "%s | KSC",
  },
  description: "KSC公式サイト",
  authors: [{ name: "KSC" }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "KSC",
    title: "KSC",
    description: "KSC公式サイト",
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
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <div className="flex-1 pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
