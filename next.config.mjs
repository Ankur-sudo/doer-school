import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      ...(process.env.ADDITIONAL_HOSTNAME
        ? [
            {
              protocol: process.env.ADDITIONAL_PROTOCOL || "http",
              hostname: process.env.ADDITIONAL_HOSTNAME, // Using environment variable here
              port: process.env.ADDITIONAL_PORT || "",
              pathname: process.env.ADDITIONAL_PATHNAME || "/api/uploads/**",
            },
          ]
        : []),
      {
        protocol: "http",
        hostname: "192.168.0.65",
        port: "5000",
        pathname: "/api/uploads/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
