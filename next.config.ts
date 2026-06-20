import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Disable trailing slash redirect for Cloudflare Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
