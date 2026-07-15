import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://api.plakahub.com/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://api.plakahub.com/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
