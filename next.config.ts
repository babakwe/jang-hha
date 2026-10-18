import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: pre-rendered HTML/JS/CSS from the CDN edge. Offline-capable PWA, free on Vercel.
  output: "export",
  trailingSlash: true,
  basePath: "/hha", // served at /hha/ here and inside jang-nyc (see vercel.json)
  images: { unoptimized: true },
  turbopack: { rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } } },
};

export default nextConfig;
