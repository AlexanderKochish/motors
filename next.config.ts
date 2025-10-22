import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [new URL("https://catalog-management.s3.ap-south-1.amazonaws.com/**")],
    qualities: [75, 85, 100],
  },
};

export default nextConfig;
