import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

// Set NODE_ENV to development to exercise the local 127.0.0.1 routing path
process.env.NODE_ENV = 'development';

// Mock env with NEXT_PUBLIC_PAYLOAD_URI undefined to test fallback branch
mock.module('@/env.mjs', {
    exports: {
        env: {
            NEXT_PUBLIC_PAYLOAD_URI: undefined,
        },
    },
});

describe('CMS Proxy API - Fallback Base URL', () => {
    it('falls back to local port 4000 when NEXT_PUBLIC_PAYLOAD_URI is undefined', async () => {
        // Mock global fetch
        const mockFetch = mock.fn(async (url: string | URL | Request) => {
            return new Response(JSON.stringify({ success: true, url: url.toString() }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        });
        globalThis.fetch = mockFetch as any;

        const { GET } = await import('../../../src/app/api/cms/[...slug]/route.ts');
        const req = new Request('http://localhost:3000/api/cms/globals/notification');
        const res = await GET(req, {
            params: Promise.resolve({ slug: ['globals', 'notification'] }),
        });

        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.strictEqual(data.url, 'http://127.0.0.1:4000/api/globals/notification');

        // Cleanup
        // @ts-ignore
        delete globalThis.fetch;
    });
});
