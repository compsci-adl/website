import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

// Mock env
mock.module('@/env.mjs', {
    exports: {
        env: {
            NEXT_PUBLIC_PAYLOAD_URI: 'http://localhost:4000',
        },
    },
});

describe('Payload Utility - resolveCmsUrl', () => {
    it('handles client, server-development, and server-production url resolutions', async () => {
        const { resolveCmsUrl } = await import('../../../src/lib/payload');

        const originalNodeEnv = process.env.NODE_ENV;

        // --- Scenario 1: Client side ---
        globalThis.window = {
            location: {
                origin: 'http://localhost:3000',
            },
        } as any;

        const inputUrl = 'http://localhost:4000/api/events?limit=100';
        assert.strictEqual(resolveCmsUrl(inputUrl), '/api/cms/events?limit=100');

        // Test fallback when URL does not start with /api/
        const nonApiUrl = 'http://localhost:4000/something-else';
        assert.strictEqual(resolveCmsUrl(nonApiUrl), nonApiUrl);

        // Test fallback on invalid URL
        const invalidUrl = 'http://invalid-url-with-bad-port:99999999/';
        assert.strictEqual(resolveCmsUrl(invalidUrl), invalidUrl);

        // Cleanup window
        // @ts-ignore
        delete globalThis.window;

        // --- Scenario 2: Server side in development (NODE_ENV=development) ---
        process.env.NODE_ENV = 'development';
        assert.strictEqual(resolveCmsUrl(inputUrl), 'http://127.0.0.1:4000/api/events?limit=100');

        // --- Scenario 3: Server side in production/Docker (NODE_ENV=production) ---
        process.env.NODE_ENV = 'production';
        assert.strictEqual(resolveCmsUrl(inputUrl), 'http://payload:4000/api/events?limit=100');

        const inputUrl127 = 'http://127.0.0.1:4000/api/events?limit=100';
        assert.strictEqual(resolveCmsUrl(inputUrl127), 'http://payload:4000/api/events?limit=100');

        // Restore env
        process.env.NODE_ENV = originalNodeEnv;
    });
});
