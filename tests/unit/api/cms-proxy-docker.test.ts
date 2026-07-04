import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

// Set NODE_ENV to production to simulate Docker/non-development routing
process.env.NODE_ENV = 'production';

// Mock env
mock.module('@/env.mjs', {
    exports: {
        env: {
            NEXT_PUBLIC_PAYLOAD_URI: 'http://localhost:4000',
        },
    },
});

// Mock fetch globally
const mockFetch = mock.fn(async () => {
    return {
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
    } as any;
});
globalThis.fetch = mockFetch as any;

describe('CMS Proxy Route Handler (Docker / Production)', () => {
    it('rewrites localhost to payload hostname in non-development environments', async () => {
        const { GET } = await import('../../../src/app/api/cms/[...slug]/route.ts');

        const req = new Request('http://localhost:3000/api/cms/globals/notification');
        const res = await GET(req, {
            params: Promise.resolve({ slug: ['globals', 'notification'] }),
        });

        assert.strictEqual(res.status, 200);
        const lastCall = mockFetch.mock.calls[mockFetch.mock.calls.length - 1];
        assert.strictEqual(lastCall.arguments[0], 'http://payload:4000/api/globals/notification');
    });
});
