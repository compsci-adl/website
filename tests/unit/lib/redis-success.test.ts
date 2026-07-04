import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

let connectCalled = false;
let pingCalled = false;
let getCalledWith: string | null = null;
let setCalledWith: [string, string] | null = null;
let hSetCalledWith: [string, Record<string, string>] | null = null;
let hGetCalledWith: [string, string] | null = null;
let delCalledWith: string | null = null;

const mockClient = {
    connect: async () => {
        connectCalled = true;
    },
    ping: async () => {
        pingCalled = true;
        return 'PONG';
    },
    get: async (key: string) => {
        getCalledWith = key;
        return 'mock-val';
    },
    set: async (key: string, value: string) => {
        setCalledWith = [key, value];
    },
    hSet: async (key: string, values: Record<string, string>) => {
        hSetCalledWith = [key, values];
    },
    hGet: async (key: string, field: string) => {
        hGetCalledWith = [key, field];
        return 'mock-field-val';
    },
    del: async (key: string) => {
        delCalledWith = key;
    },
};

mock.module('redis', {
    exports: {
        createClient: () => mockClient,
    },
});

describe('Redis Client Success', () => {
    it('successfully connects and routes commands to redis client', async () => {
        const { redisClient } = await import('../../../src/lib/redis.ts');

        await redisClient.connect();
        assert.strictEqual(connectCalled, true);

        const pong = await redisClient.ping();
        assert.strictEqual(pong, 'PONG');
        assert.strictEqual(pingCalled, true);

        const val = await redisClient.get('test-key');
        assert.strictEqual(val, 'mock-val');
        assert.strictEqual(getCalledWith, 'test-key');

        await redisClient.set('test-key', 'val');
        assert.deepEqual(setCalledWith, ['test-key', 'val']);

        await redisClient.hSet('test-key', { field: 'val' });
        assert.deepEqual(hSetCalledWith, ['test-key', { field: 'val' }]);

        const hVal = await redisClient.hGet('test-key', 'field');
        assert.strictEqual(hVal, 'mock-field-val');
        assert.deepEqual(hGetCalledWith, ['test-key', 'field']);

        await redisClient.del('test-key');
        assert.strictEqual(delCalledWith, 'test-key');
    });
});
