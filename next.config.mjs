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
            {
                protocol: process.env.NEXT_PUBLIC_PAYLOAD_URI.startsWith('https') ? 'https' : 'http',
                hostname: new URL(process.env.NEXT_PUBLIC_PAYLOAD_URI).hostname,
                port: new URL(process.env.NEXT_PUBLIC_PAYLOAD_URI).port || '',
                pathname: '/api/media/file/**',
            }
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
