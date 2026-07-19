import { DateTime } from 'luxon';
import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

let lastUpdateValues: any = null;
let lastUpdateId: any = null;

mock.module('@/db', {
    exports: {
        db: {
            update: () => ({
                set: (values: any) => {
                    lastUpdateValues = values;
                    return {
                        where: async (cond: any) => {
                            lastUpdateId = cond;
                        },
                    };
                },
            }),
        },
    },
});

mock.module('drizzle-orm', {
    exports: {
        eq: (col: any, val: any) => {
            return { col, val };
        },
        sql: (strings: any, ...values: any[]) => strings.join('?'),
    },
});

const { updateMemberExpiryDate } = await import('@/server/update-member-expiry-date');

describe('updateMemberExpiryDate server function', () => {
    it('updates user expiry date to Jan 1st of next year using keycloakId mode', async () => {
        lastUpdateValues = null;
        lastUpdateId = null;

        const returnedDate = await updateMemberExpiryDate('mock-keycloak-id', 'keycloakId');

        const nextYear = new Date().getFullYear() + 1;
        const expectedDate = new Date(`${nextYear}-01-01`);

        assert.strictEqual(returnedDate.getTime(), expectedDate.getTime());
        assert.deepEqual(lastUpdateValues, {
            membershipExpiresAt: expectedDate,
            welcomeEmailSent: false,
        });
        assert.ok(lastUpdateId);
        assert.strictEqual(lastUpdateId.val, 'mock-keycloak-id');
    });

    it('updates user expiry date to Jan 1st of next year using id mode', async () => {
        lastUpdateValues = null;
        lastUpdateId = null;

        const returnedDate = await updateMemberExpiryDate('mock-db-id', 'id');

        const nextYear = new Date().getFullYear() + 1;
        const expectedDate = new Date(`${nextYear}-01-01`);

        assert.strictEqual(returnedDate.getTime(), expectedDate.getTime());
        assert.deepEqual(lastUpdateValues, {
            membershipExpiresAt: expectedDate,
            welcomeEmailSent: false,
        });
        assert.ok(lastUpdateId);
        assert.strictEqual(lastUpdateId.val, 'mock-db-id');
    });
});
