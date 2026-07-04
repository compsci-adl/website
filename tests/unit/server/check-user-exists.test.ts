import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

let mockDbResults: any[] = [];

mock.module('@/db', {
    exports: {
        db: {
            select: () => ({
                from: () => ({
                    where: async () => mockDbResults,
                }),
            }),
        },
    },
});

const { checkUserExists } = await import('@/server/check-user-exists');

describe('checkUserExists server function', () => {
    it('returns true when user exists in database', async () => {
        mockDbResults = [{ id: '123' }];
        const result = await checkUserExists('existing-id');
        assert.strictEqual(result, true);
    });

    it('returns false when user does not exist in database', async () => {
        mockDbResults = [];
        const result = await checkUserExists('non-existent-id');
        assert.strictEqual(result, false);
    });
});
