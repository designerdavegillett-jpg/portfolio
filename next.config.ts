import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Static HTML export -> ./out . Required for Cloudflare Pages direct upload.
  output: "export",
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
