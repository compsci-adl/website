/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
    serverActions: true,
  },
};

module.exports = nextConfig;
