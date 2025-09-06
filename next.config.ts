import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // or '/image/upload/**' if you want stricter
      },
    ],
  },
};

export default nextConfig;
