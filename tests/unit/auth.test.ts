import assert from 'node:assert/strict';
import { describe, it, beforeEach, mock } from 'node:test';

process.env.SKIP_ENV_VALIDATION = 'true';
process.env.NODE_ENV = 'test';

let nextAuthOptions: any = null;
let baseAuthCalledWith: any[] = [];
let mockHeaders = new Map<string, string>();

mock.module('next-auth', {
    exports: {
        default: (options: any) => {
            nextAuthOptions = options;
            return {
                handlers: {},
                signIn: async () => {},
                signOut: async () => {},
                auth: async (...args: any[]) => {
                    baseAuthCalledWith = args;
                    return { user: { name: 'Base User' } };
                },
            };
        },
    },
});

mock.module('next-auth/providers/keycloak', {
    exports: {
        default: () => ({ id: 'keycloak' }),
    },
});

mock.module('jose', {
    exports: {
        decodeJwt: (token: string) => {
            if (token === 'admin-jwt') {
                return { realm_access: { roles: ['restricted-access'] } };
            }
            if (token === 'committee-jwt') {
                return { realm_access: { roles: ['committee'] } };
            }
            if (token === 'null-jwt') {
                return null;
            }
            if (token === 'no-roles-jwt') {
                return { realm_access: {} };
            }
            return {};
        },
    },
});

// Variable to control headers mock throwing
let mockHeadersThrow = false;
mock.module('next/headers', {
    exports: {
        headers: async () => {
            if (mockHeadersThrow) throw new Error('Static generation');
            return {
                get: (key: string) => mockHeaders.get(key) ?? null,
            };
        },
    },
});

const {
    auth,
    resolveContainerKeycloakEndpoint,
    resolveLocalKeycloakUrl,
    resolveAuthRealm,
    resolveChecks,
} = await import('@/auth');

describe('NextAuth Config and Wrapper', () => {
    beforeEach(() => {
        baseAuthCalledWith = [];
        mockHeaders.clear();
    });

    describe('callbacks - jwt', () => {
        const { jwt } = nextAuthOptions.callbacks;

        it('returns token unchanged when no account, user, or profile is provided', async () => {
            const token = { foo: 'bar' };
            const result = await jwt({ token });
            assert.deepEqual(result, { foo: 'bar' });
        });

        it('decodes jwt and sets isAdmin for restricted-access role', async () => {
            const token = {};
            const account = { access_token: 'admin-jwt' };
            const result = await jwt({ token, account });
            assert.strictEqual(result.isAdmin, true);
            assert.strictEqual(result.isCommittee, undefined);
        });

        it('decodes jwt and sets isCommittee for committee role', async () => {
            const token = {};
            const account = { access_token: 'committee-jwt' };
            const result = await jwt({ token, account });
            assert.strictEqual(result.isCommittee, true);
            assert.strictEqual(result.isAdmin, undefined);
        });

        it('copies email and name from user', async () => {
            const token = {};
            const user = { email: 'test@example.com', name: 'Alice' };
            const result = await jwt({ token, user, account: {} as any });
            assert.strictEqual(result.email, 'test@example.com');
            assert.strictEqual(result.name, 'Alice');
        });

        it('copies sub, given_name, family_name from profile', async () => {
            const token = {};
            const profile = { sub: 'sub-123', given_name: 'Bob', family_name: 'Jones' };
            const result = await jwt({ token, profile, account: {} as any });
            assert.strictEqual(result.id, 'sub-123');
            assert.strictEqual(result.firstName, 'Bob');
            assert.strictEqual(result.lastName, 'Jones');
        });

        it('handles null decoded tokens, empty realm_access, or empty roles in jwt callback', async () => {
            const token = {};

            // Null decoded token
            const resNull = await jwt({ token, account: { access_token: 'null-jwt' } });
            assert.strictEqual(resNull.isCommittee, undefined);
            assert.strictEqual(resNull.isAdmin, undefined);

            // Empty realm_access
            const resNoRealm = await jwt({ token, account: { access_token: 'invalid-jwt' } });
            assert.strictEqual(resNoRealm.isCommittee, undefined);
            assert.strictEqual(resNoRealm.isAdmin, undefined);

            // Empty roles
            const resNoRoles = await jwt({ token, account: { access_token: 'no-roles-jwt' } });
            assert.strictEqual(resNoRoles.isCommittee, undefined);
            assert.strictEqual(resNoRoles.isAdmin, undefined);
        });
    });

    describe('callbacks - session', () => {
        const { session: sessionCallback } = nextAuthOptions.callbacks;

        it('copies properties from token to session user object', async () => {
            const session = { user: {} } as any;
            const token = {
                id: 'id-123',
                email: 'test@test.com',
                name: 'Alice',
                firstName: 'Alice',
                lastName: 'Smith',
                isCommittee: true,
                isAdmin: false,
            };

            const result = await sessionCallback({ session, token });
            assert.deepEqual(result.user, {
                id: 'id-123',
                email: 'test@test.com',
                name: 'Alice',
                firstName: 'Alice',
                lastName: 'Smith',
                isCommittee: true,
                isAdmin: false,
            });
        });
    });

    describe('auth mock wrapper', () => {
        it('resolves to mock admin session if x-mock-auth header is admin', async () => {
            mockHeaders.set('x-mock-auth', 'admin');
            const result = await auth();

            assert.strictEqual(result.user.id, 'mock-admin-id');
            assert.strictEqual(result.user.isAdmin, true);
            assert.strictEqual(result.user.isCommittee, true);
        });

        it('resolves to mock user session if x-mock-auth header is user', async () => {
            mockHeaders.set('x-mock-auth', 'user');
            const result = await auth();

            assert.strictEqual(result.user.id, 'mock-user-id');
            assert.strictEqual(result.user.isAdmin, false);
            assert.strictEqual(result.user.isCommittee, false);
        });

        it('falls back to default next-auth if x-mock-auth is not provided', async () => {
            const result = await auth('argument1');
            assert.deepEqual(result, { user: { name: 'Base User' } });
            assert.deepEqual(baseAuthCalledWith, ['argument1']);
        });

        it('falls back to default next-auth if process.env values are not test/true', async () => {
            const originalSkip = process.env.SKIP_ENV_VALIDATION;
            const originalNode = process.env.NODE_ENV;
            process.env.SKIP_ENV_VALIDATION = 'false';
            process.env.NODE_ENV = 'production';

            const result = await auth();
            assert.deepEqual(result, { user: { name: 'Base User' } });

            process.env.SKIP_ENV_VALIDATION = originalSkip;
            process.env.NODE_ENV = originalNode;
        });

        it('does nothing if mockAuth is not admin/user', async () => {
            mockHeaders.set('x-mock-auth', 'other');
            const result = await auth();
            assert.deepEqual(result, { user: { name: 'Base User' } });
        });

        it('returns NextResponse.next for middleware calls with mock auth', async () => {
            mockHeaders.set('x-mock-auth', 'user');
            const result = await auth(new Request('http://localhost:3000/settings'));

            assert.strictEqual(result instanceof Response, true);
            assert.strictEqual(result.headers.get('x-middleware-next'), '1');
            assert.deepEqual(baseAuthCalledWith, []);
        });

        it('handles headers() throwing an error gracefully', async () => {
            mockHeadersThrow = true;
            const result = await auth();
            assert.deepEqual(result, { user: { name: 'Base User' } });
            mockHeadersThrow = false;
        });
    });

    describe('callbacks - edge cases', () => {
        it('jwt callback handles account without access_token', async () => {
            const { jwt } = nextAuthOptions.callbacks;
            const token = { existing: true };
            const result = await jwt({ token, account: {} });
            assert.deepEqual(result, { existing: true });
        });

        it('jwt callback handles decodedToken without realm_access or roles', async () => {
            const { jwt } = nextAuthOptions.callbacks;
            const token = { existing: true };
            const result = await jwt({ token, account: { access_token: 'other-jwt' } });
            assert.deepEqual(result, { existing: true });
        });

        it('session callback handles missing token', async () => {
            const { session: sessionCallback } = nextAuthOptions.callbacks;
            const session = { user: { name: 'KeepMe' } } as any;
            const result = await sessionCallback({ session, token: null });
            assert.deepEqual(result.user, { name: 'KeepMe' });
        });
    });

    describe('helpers', () => {
        it('resolveContainerKeycloakEndpoint', () => {
            assert.strictEqual(
                resolveContainerKeycloakEndpoint('http://container', 'http://local'),
                'http://container'
            );
            assert.strictEqual(
                resolveContainerKeycloakEndpoint('', 'http://local'),
                'http://local'
            );
            assert.strictEqual(resolveContainerKeycloakEndpoint('', ''), 'http://127.0.0.1:8080');
        });

        it('resolveLocalKeycloakUrl', () => {
            assert.strictEqual(resolveLocalKeycloakUrl('http://local'), 'http://local');
            assert.strictEqual(resolveLocalKeycloakUrl(''), 'http://127.0.0.1:8080');
        });

        it('resolveAuthRealm', () => {
            assert.strictEqual(resolveAuthRealm('my-realm'), 'my-realm');
            assert.strictEqual(resolveAuthRealm(''), 'cs-club');
        });

        it('resolveChecks', () => {
            assert.deepEqual(resolveChecks('test', 'false'), []);
            assert.deepEqual(resolveChecks('production', 'true'), []);
            assert.deepEqual(resolveChecks('production', 'false'), ['state']);
        });
    });
});
