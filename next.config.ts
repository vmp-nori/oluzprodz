import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["noriserver", "noriserver-ts"],
  images: {
    qualities: [75, 86],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "main--cc--adobecom.aem.live",
        pathname: "/cc-shared/assets/img/product-icons/**",
      },
      {
        protocol: "https",
        hostname: "lf16-web-buz.capcut.com",
        pathname: "/obj/capcut-web-buz-sg/common/images/**",
      },
      {
        protocol: "https",
        hostname: "cdsassets.apple.com",
        pathname: "/live/7WUAS350/images/pro-apps/**",
      },
    ],
  },
};

export default nextConfig;
