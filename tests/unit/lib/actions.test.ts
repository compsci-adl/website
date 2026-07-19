import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

let signOutCalled = false;

mock.module('@/auth', {
    exports: {
        signOut: async () => {
            signOutCalled = true;
        },
    },
});

const { logout } = await import('@/lib/actions');

describe('Server Actions Library', () => {
    it('logout calls signOut successfully', async () => {
        signOutCalled = false;
        await logout();
        assert.strictEqual(signOutCalled, true);
    });
});
