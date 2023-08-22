/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  webpack: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};

module.exports = nextConfig;
