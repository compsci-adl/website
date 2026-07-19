import { env } from '@/env.mjs';

export const payloadURL = env.NEXT_PUBLIC_PAYLOAD_URI;

export function resolveCmsUrl(url: string): string {
    const isClient = typeof window !== 'undefined';
    if (isClient) {
        let parsed: URL;
        try {
            parsed = new URL(url, window.location.origin);
        } catch {
            return url;
        }
        if (parsed.pathname.startsWith('/api/')) {
            const slugPath = parsed.pathname.replace('/api/', '');
            return '/api/cms/' + slugPath + parsed.search;
        }
        return url;
    } else {
        if (process.env.NODE_ENV === 'development') {
            return url.replace('localhost', '127.0.0.1');
        } else {
            return url.replace('localhost', 'payload').replace('127.0.0.1', 'payload');
        }
    }
}
