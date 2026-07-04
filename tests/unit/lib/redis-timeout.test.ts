import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

const mockClient = {
    connect: async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
    },
};

mock.module('redis', {
    exports: {
        createClient: () => mockClient,
    },
});

describe('Redis Client Timeout', () => {
    it('fails fast on connection timeout', async (t) => {
        t.mock.timers.enable({ apis: ['setTimeout'] });
        const { redisClient } = await import('../../../src/lib/redis.ts');

        const connectPromise = redisClient.connect();
        t.mock.timers.tick(2500);
        await connectPromise;

        const val = await redisClient.get('test-key');
        assert.strictEqual(val, null);
    });
});
