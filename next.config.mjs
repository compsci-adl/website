import './src/env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.gravatar.com',
            },
        ],
    },
    typescript: {
        // Ignore TypeScript errors during production build
        ignoreBuildErrors: process.env.PRODUCTION_BUILD === 'true',
    },
    eslint: {
        // Ignore ESLint errors during production build
        ignoreDuringBuilds: process.env.PRODUCTION_BUILD === 'true',
    },
};

export default nextConfig;
