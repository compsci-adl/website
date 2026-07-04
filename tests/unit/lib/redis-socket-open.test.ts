import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

let connectCalled = false;
let getCalledWith: string | null = null;

const mockClient = {
    connect: async () => {
        connectCalled = true;
        throw new Error('Socket already opened');
    },
    get: async (key: string) => {
        getCalledWith = key;
        return 'mock-val';
    },
};

mock.module('redis', {
    exports: {
        createClient: () => mockClient,
    },
});

describe('Redis Client Socket Already Opened Recovery', () => {
    it('recovers and treats connection as healthy if Socket already opened error occurs', async () => {
        const { redisClient } = await import('../../../src/lib/redis.ts');

        await redisClient.connect();
        assert.strictEqual(connectCalled, true);

        const val = await redisClient.get('test-key');
        assert.strictEqual(val, 'mock-val');
        assert.strictEqual(getCalledWith, 'test-key');
    });
});
