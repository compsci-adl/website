import './src/env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    allowedDevOrigins: ['127.0.0.1', 'localhost', '127.0.0.1:3000', 'localhost:3000'],
    images: {
        minimumCacheTTL: 86400,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.gravatar.com',
            },
            {
                protocol: process.env.NEXT_PUBLIC_PAYLOAD_URI?.startsWith('https')
                    ? 'https'
                    : 'http',
                hostname: process.env.NEXT_PUBLIC_PAYLOAD_URI
                    ? new URL(process.env.NEXT_PUBLIC_PAYLOAD_URI).hostname
                    : 'localhost',
                port: process.env.NEXT_PUBLIC_PAYLOAD_URI
                    ? new URL(process.env.NEXT_PUBLIC_PAYLOAD_URI).port || ''
                    : '',
                pathname: '/api/media/file/**',
            },
        ],
        unoptimized: true,
    },
    typescript: {
        // Ignore TypeScript errors during production build
        ignoreBuildErrors: process.env.PRODUCTION_BUILD === 'true',
    },
    async headers() {
        return [
            {
                source: '/:path*\\.(png|jpg|jpeg|gif|webp|svg|ico|mp4|webm|pdf|woff2|woff)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
