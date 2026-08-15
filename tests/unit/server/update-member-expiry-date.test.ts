import { DateTime } from 'luxon';
import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

let lastUpdateValues: unknown = null;
let lastUpdateId: { col?: unknown; val?: unknown } | null = null;

mock.module('@/db', {
    exports: {
        db: {
            update: () => ({
                set: (values: unknown) => {
                    lastUpdateValues = values;
                    return {
                        where: async (cond: { col?: unknown; val?: unknown }) => {
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
        eq: (col: unknown, val: unknown) => {
            return { col, val };
        },
        sql: (strings: TemplateStringsArray, ...values: unknown[]) => strings.join('?'),
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
        const updateId1 = lastUpdateId as { col?: unknown; val?: unknown } | null;
        assert.ok(updateId1);
        assert.strictEqual(updateId1.val, 'mock-keycloak-id');
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
        const updateId2 = lastUpdateId as { col?: unknown; val?: unknown } | null;
        assert.ok(updateId2);
        assert.strictEqual(updateId2.val, 'mock-db-id');
    });
});
