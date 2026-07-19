import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

const mockClient = {
    connect: async () => {
        throw new Error('Connection refused');
    },
};

mock.module('redis', {
    exports: {
        createClient: () => mockClient,
    },
});

describe('Redis Client Failure', () => {
    it('fails open on connection error', async () => {
        const { redisClient } = await import('../../../src/lib/redis.ts');

        await redisClient.connect();

        const val = await redisClient.get('test-key');
        assert.strictEqual(val, null);

        await redisClient.set('test-key', 'val');
    });
});
