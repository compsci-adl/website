import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

let initializedToken: string | null = null;
let initializedEnv: any = null;

mock.module('square', {
    exports: {
        SquareEnvironment: {
            Production: 'production',
            Sandbox: 'sandbox',
        },
        SquareClient: class {
            constructor(options: any) {
                initializedToken = options.token;
                initializedEnv = options.environment;
            }
        },
    },
});

describe('Square Client Library wrapper', () => {
    it('initializes the SquareClient with correct tokens', async () => {
        const { squareClient, resolveSquareEnvironment } = await import('@/lib/square');
        assert.ok(squareClient);
        assert.strictEqual(initializedToken, 'test-token');
        assert.strictEqual(initializedEnv, 'sandbox');

        // Test environment resolution directly
        assert.strictEqual(resolveSquareEnvironment('production'), 'production');
        assert.strictEqual(resolveSquareEnvironment('development'), 'sandbox');
        assert.strictEqual(resolveSquareEnvironment('test'), 'sandbox');
    });
});
