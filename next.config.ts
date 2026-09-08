import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["noriserver", "noriserver-ts"],
  images: {
    qualities: [75, 86],
  },
};

export default nextConfig;
