/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === "production",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: { dimensions: false },
        },
      ],
    });

    return config;
  },
  images: {
    remotePatterns: [
      { hostname: "*", protocol: "http" },
      { hostname: "*", protocol: "https" },
    ],
  },
};

module.exports = nextConfig;
