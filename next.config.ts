import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: pre-rendered HTML/JS/CSS from the CDN edge. Offline-capable PWA, free on Vercel.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: { rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } } },
};

export default nextConfig;
