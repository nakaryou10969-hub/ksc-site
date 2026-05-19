import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      // microCMS の画像
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
};

export default nextConfig;
