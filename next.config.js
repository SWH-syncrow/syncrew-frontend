/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === "production",
  },
  transpilePackages: ["jotai-devtools"],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      { hostname: "*", protocol: "http" },
      { hostname: "*", protocol: "https" },
    ],
  },
  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "http://ec2-43-201-9-81.ap-northeast-2.compute.amazonaws.com:8080/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
