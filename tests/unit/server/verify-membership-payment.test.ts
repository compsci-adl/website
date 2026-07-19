import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

let mockDbResults: any[] = [];
let mockRedisHash: Record<string, string> = {};
let mockSquareOrderRes: any = null;
let mockSquareThrowError = false;
let updateMemberExpiryDateCalled = false;
let redisDelCalledKey: string | null = null;

// Mock Drizzle DB
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

mock.module('drizzle-orm', {
    exports: {
        eq: (col: any, val: any) => ({ col, val }),
        sql: (strings: any, ...values: any[]) => strings.join('?'),
    },
});

// Mock Redis Client
mock.module('@/lib/redis', {
    exports: {
        redisClient: {
            hGet: async (key: string, field: string) => {
                return mockRedisHash[field] ?? null;
            },
            del: async (key: string) => {
                redisDelCalledKey = key;
            },
        },
    },
});

// Mock Square Client
mock.module('@/lib/square', {
    exports: {
        squareClient: {
            orders: {
                get: async () => {
                    if (mockSquareThrowError) {
                        throw new Error('Square API error');
                    }
                    return mockSquareOrderRes;
                },
            },
        },
    },
});

// Mock updateMemberExpiryDate server action
let updateMemberExpiryDateThrow = false;
mock.module('../../../src/server/update-member-expiry-date', {
    exports: {
        updateMemberExpiryDate: async (id: string, mode: string) => {
            updateMemberExpiryDateCalled = true;
            if (updateMemberExpiryDateThrow) {
                throw new Error('Database write failed');
            }
            return '2027-01-01';
        },
    },
});

const { verifyMembershipPayment } = await import('@/server/verify-membership-payment');

describe('verifyMembershipPayment server function', () => {
    it('returns paid=true if membershipExpiresAt exists and is in the future', async () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        mockDbResults = [{ id: '123', membershipExpiresAt: futureDate.toISOString() }];

        const result = await verifyMembershipPayment('keycloak-id');

        assert.deepEqual(result, { paid: true, membershipExpiresAt: futureDate.toISOString() });
    });

    it('returns paid=false if orderId does not exist in Redis', async () => {
        mockDbResults = [];
        mockRedisHash = {};

        const result = await verifyMembershipPayment('keycloak-id');

        assert.deepEqual(result, { paid: false });
    });

    it('returns paid=false if Square API fails or times out', async () => {
        mockDbResults = [];
        mockRedisHash = { orderId: 'order-123' };
        mockSquareThrowError = true;

        const result = await verifyMembershipPayment('keycloak-id');

        assert.deepEqual(result, { paid: false });
    });

    it('returns paid=false if order exists but contains no payments', async () => {
        mockDbResults = [];
        mockRedisHash = { orderId: 'order-123' };
        mockSquareThrowError = false;
        mockSquareOrderRes = { order: { tenders: [] } };

        const result = await verifyMembershipPayment('keycloak-id');

        assert.deepEqual(result, { paid: false });
    });

    it('returns paid=true, updates database and deletes redis key if payment was successful', async () => {
        mockDbResults = [];
        mockRedisHash = { orderId: 'order-123' };
        mockSquareThrowError = false;
        mockSquareOrderRes = {
            order: {
                tenders: [{ paymentId: 'payment-123' }],
            },
        };
        updateMemberExpiryDateCalled = false;
        redisDelCalledKey = null;

        const result = await verifyMembershipPayment('keycloak-id');

        assert.deepEqual(result, { paid: true, membershipExpiresAt: '2027-01-01' });
        assert.ok(updateMemberExpiryDateCalled);
        assert.strictEqual(redisDelCalledKey, 'payment:membership:keycloak-id');
    });

    it('returns paid=false if member exists but membershipExpiresAt is null', async () => {
        mockDbResults = [{ id: '123', membershipExpiresAt: null }];
        mockRedisHash = {};

        const result = await verifyMembershipPayment('keycloak-id');

        assert.deepEqual(result, { paid: false });
    });

    it('returns paid=false if member exists but membershipExpiresAt is in the past', async () => {
        const pastDate = new Date();
        pastDate.setFullYear(pastDate.getFullYear() - 1);
        mockDbResults = [{ id: '123', membershipExpiresAt: pastDate.toISOString() }];
        mockRedisHash = {};

        const result = await verifyMembershipPayment('keycloak-id');

        assert.deepEqual(result, { paid: false });
    });

    it('returns paid=false if database update or other outer code throws an error', async () => {
        mockDbResults = [];
        mockRedisHash = { orderId: 'order-123' };
        mockSquareThrowError = false;
        mockSquareOrderRes = {
            order: {
                tenders: [{ paymentId: 'payment-123' }],
            },
        };
        updateMemberExpiryDateThrow = true;

        const result = await verifyMembershipPayment('keycloak-id');

        assert.deepEqual(result, { paid: false });
        updateMemberExpiryDateThrow = false; // Restore
    });
});
