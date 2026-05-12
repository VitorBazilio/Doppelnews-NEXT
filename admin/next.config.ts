import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.18.17", "26.242.142.182"],
  experimental: {
    authInterrupts: true,
  },
  transpilePackages: ["@doppelnews/shared"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "assets.nintendo.com" },
      { protocol: "https", hostname: "shared.akamai.steamstatic.com" },
      { protocol: "https", hostname: "shared.fastly.steamstatic.com" },
    ],
  },
};

export default nextConfig;
