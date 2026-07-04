import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

// Set NODE_ENV to development to exercise the local 127.0.0.1 routing path
process.env.NODE_ENV = 'development';

// Mock env
mock.module('@/env.mjs', {
    exports: {
        env: {
            NEXT_PUBLIC_PAYLOAD_URI: 'http://localhost:4000',
        },
    },
});

// Mock fetch globally
const mockFetch = mock.fn(async (url: string) => {
    if (url.includes('error-route')) {
        return {
            ok: false,
            status: 404,
        } as any;
    }
    if (url.includes('throw-route')) {
        throw new Error('Fetch failed');
    }
    return {
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
    } as any;
});
globalThis.fetch = mockFetch as any;

describe('CMS Proxy Route Handler', () => {
    it('proxies requests successfully to the CMS', async () => {
        const { GET } = await import('../../../src/app/api/cms/[...slug]/route.ts');

        const req = new Request('http://localhost:3000/api/cms/globals/notification?param=1');
        const res = await GET(req, {
            params: Promise.resolve({ slug: ['globals', 'notification'] }),
        });

        assert.strictEqual(res.status, 200);
        const json = await res.json();
        assert.deepEqual(json, { success: true });

        // Verify target URL normalization
        const lastCall = mockFetch.mock.calls[0];
        assert.strictEqual(
            lastCall.arguments[0],
            'http://127.0.0.1:4000/api/globals/notification?param=1'
        );
    });

    it('returns error status if CMS returns not ok', async () => {
        const { GET } = await import('../../../src/app/api/cms/[...slug]/route.ts');

        const req = new Request('http://localhost:3000/api/cms/error-route');
        const res = await GET(req, { params: Promise.resolve({ slug: ['error-route'] }) });

        assert.strictEqual(res.status, 404);
    });

    it('returns 500 error if fetch throws exception', async () => {
        const { GET } = await import('../../../src/app/api/cms/[...slug]/route.ts');

        const req = new Request('http://localhost:3000/api/cms/throw-route');
        const res = await GET(req, { params: Promise.resolve({ slug: ['throw-route'] }) });

        assert.strictEqual(res.status, 500);
    });
});
