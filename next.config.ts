import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't let lint warnings block a production build.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
