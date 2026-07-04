import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

describe('Redis Fallback Client', () => {
    it('uses fallback methods when REDIS_URI is not set', async () => {
        // Set REDIS_URI to empty before importing
        process.env.REDIS_URI = '';

        // Dynamically import to avoid ESM import hoisting
        const { redisClient } = await import('../../../src/lib/redis.ts');

        await redisClient.connect();

        const pong = await redisClient.ping();
        assert.strictEqual(pong, 'PONG');

        const val = await redisClient.get('test-key');
        assert.strictEqual(val, null);

        await redisClient.set('test-key', 'val');

        await redisClient.hSet('test-key', { field: 'val' });

        const hVal = await redisClient.hGet('test-key', 'field');
        assert.strictEqual(hVal, null);

        await redisClient.del('test-key');
    });
});
