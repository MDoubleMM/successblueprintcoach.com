/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/successblueprintcoach.com',
  assetPrefix: '/successblueprintcoach.com',
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
