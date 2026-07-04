import assert from 'node:assert/strict';
import { describe, it, beforeEach, mock } from 'node:test';

let lastKyUrl: string | null = null;
let lastKyOptions: any = null;
let mockKyResponseData: any = {};
let mockKyResponseOk = true;
let mockKyResponseStatus = 200;
let mockKyResponseStatusText = 'OK';
let shouldKyThrow = false;

const mockKy = {
    post: (url: string, options: any) => {
        lastKyUrl = url;
        lastKyOptions = options;
        if (shouldKyThrow) throw new Error('ky network error');
        return {
            json: async () => mockKyResponseData,
        };
    },
    put: (url: string, options: any) => {
        lastKyUrl = url;
        lastKyOptions = options;
        if (shouldKyThrow) throw new Error('ky network error');
        return {
            ok: mockKyResponseOk,
            status: mockKyResponseStatus,
            statusText: mockKyResponseStatusText,
            text: async () => JSON.stringify(mockKyResponseData),
        };
    },
};

mock.module('ky', {
    exports: {
        default: mockKy,
    },
});

// Set mock env vars
process.env.NEXT_PUBLIC_CONTAINER_KEYCLOAK_ENDPOINT = 'http://keycloak';
process.env.NEXT_PUBLIC_AUTH_REALM = 'test-realm';
process.env.AUTH_KEYCLOAK_ID = 'test-id';
process.env.AUTH_KEYCLOAK_SECRET = 'test-secret';
process.env.AUTH_REALM = 'admin-realm';

const { getKeycloakAdminToken, updateKeycloakUserName } = await import('@/lib/keycloak-admin');

describe('Keycloak Admin Library', () => {
    beforeEach(() => {
        lastKyUrl = null;
        lastKyOptions = null;
        mockKyResponseData = {};
        mockKyResponseOk = true;
        mockKyResponseStatus = 200;
        mockKyResponseStatusText = 'OK';
        shouldKyThrow = false;
    });

    describe('getKeycloakAdminToken', () => {
        it('fetches Keycloak admin token successfully', async () => {
            mockKyResponseData = { access_token: 'admin-token-abc' };

            const token = await getKeycloakAdminToken();

            assert.strictEqual(token, 'admin-token-abc');
            assert.strictEqual(
                lastKyUrl,
                'http://keycloak/realms/test-realm/protocol/openid-connect/token'
            );
            assert.ok(lastKyOptions.body.includes('grant_type=client_credentials'));
            assert.ok(lastKyOptions.body.includes('client_id=test-id'));
            assert.ok(lastKyOptions.body.includes('client_secret=test-secret'));
        });

        it('throws descriptive error on network/connection failure', async () => {
            shouldKyThrow = true;

            await assert.rejects(
                async () => await getKeycloakAdminToken(),
                /Failed to get Keycloak admin token \(network or server error\)/
            );
        });

        it('throws descriptive error when response is missing access_token', async () => {
            mockKyResponseData = {}; // No access_token

            await assert.rejects(
                async () => await getKeycloakAdminToken(),
                /Failed to get Keycloak admin token \(no access_token\)/
            );
        });
    });

    describe('updateKeycloakUserName', () => {
        it('updates user name successfully', async () => {
            mockKyResponseData = { access_token: 'admin-token-abc' }; // For getKeycloakAdminToken call

            // We need to support subsequent mock responses. But our simple mock post/put separates them:
            // post is for token fetching, put is for user update.
            mockKyResponseOk = true;

            const result = await updateKeycloakUserName({
                keycloakId: 'user-123',
                firstName: 'Alice',
                lastName: 'Smith',
            });

            assert.strictEqual(result, true);
            assert.strictEqual(
                lastKyUrl,
                'http://keycloak/admin/realms/admin-realm/users/user-123'
            );
            assert.strictEqual(lastKyOptions.headers.Authorization, 'Bearer admin-token-abc');
            assert.deepEqual(lastKyOptions.json, { firstName: 'Alice', lastName: 'Smith' });
        });

        it('throws error when user update throws network error', async () => {
            mockKyResponseData = { access_token: 'admin-token-abc' };
            shouldKyThrow = true; // Force put to fail

            // Since getKeycloakAdminToken calls post, we need to only fail the PUT request
            // Our mock post does not check shouldKyThrow or we can make shouldKyThrow only apply to put.
            // Let's refine the test to check that the network error during put is caught.
            let firstCall = true;
            mockKy.post = () => {
                return {
                    json: async () => ({ access_token: 'admin-token-abc' }),
                };
            };
            shouldKyThrow = true;

            await assert.rejects(
                async () =>
                    await updateKeycloakUserName({
                        keycloakId: 'user-123',
                        firstName: 'Alice',
                        lastName: 'Smith',
                    }),
                /Failed to update Keycloak user name \(network error\)/
            );
        });

        it('throws error when user update response is not ok', async () => {
            mockKy.post = () => {
                return {
                    json: async () => ({ access_token: 'admin-token-abc' }),
                };
            };
            shouldKyThrow = false;
            mockKyResponseOk = false;
            mockKyResponseStatus = 400;
            mockKyResponseStatusText = 'Bad Request';
            mockKyResponseData = { error: 'invalid name' };

            await assert.rejects(
                async () =>
                    await updateKeycloakUserName({
                        keycloakId: 'user-123',
                        firstName: 'Alice',
                        lastName: 'Smith',
                    }),
                /Failed to update Keycloak user name: 400 Bad Request/
            );
        });
    });
});
