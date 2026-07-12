import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tree-shake barrel imports from the animation runtime so only the used
  // exports land in the client bundle.
  experimental: {
    optimizePackageImports: ["motion"],
  },
};

export default nextConfig;
