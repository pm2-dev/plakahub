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
        destination: "http://165.245.210.97:3001/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://165.245.210.97:3001/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
