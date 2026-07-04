import { storeDiscordTokens, getDiscordTokens } from '@/lib/storage';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

describe('storage utility functions', () => {
    it('stores and retrieves discord tokens successfully', async () => {
        const userId = 'user-123';
        const tokens = {
            accessToken: 'access-abc',
            refreshToken: 'refresh-xyz',
            expiresAt: 123456789,
        };

        await storeDiscordTokens(userId, tokens);
        const retrieved = await getDiscordTokens(userId);

        assert.deepEqual(retrieved, tokens);
    });

    it('returns undefined if tokens do not exist', async () => {
        const retrieved = await getDiscordTokens('non-existent');
        assert.strictEqual(retrieved, undefined);
    });
});
