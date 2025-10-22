import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   headers: async () => {
    return [
      {
        source: '/:path*.{jpg,jpeg,png,webp,svg,ico}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/:path*.{js,css}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  output: "standalone",
  images: {
    remotePatterns: [new URL("https://catalog-management.s3.ap-south-1.amazonaws.com/**")],
    qualities: [75, 85, 100],
  },
};

export default nextConfig;
