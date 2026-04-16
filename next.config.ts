import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'placehold.co' },       // 개발용 더미 이미지
      { hostname: '*.r2.cloudflarestorage.com' }, // Cloudflare R2
      { hostname: '*.cloudflare.com' },
    ],
  },
};

export default nextConfig;
