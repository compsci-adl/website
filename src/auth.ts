import { decodeJwt } from 'jose';
import NextAuth from 'next-auth';
import type { Session } from 'next-auth';
import Keycloak from 'next-auth/providers/keycloak';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

interface KeycloakToken {
    realm_access?: {
        roles?: string[];
    };
    sub?: string;
    given_name?: string;
    family_name?: string;
    email?: string;
    name?: string;
}

interface ExtendedSession extends Session {
    user: {
        id?: string;
        email?: string;
        name?: string;
        firstName?: string;
        lastName?: string;
        isCommittee?: boolean;
        isAdmin?: boolean;
    };
}

const containerKeycloakEndpoint = resolveContainerKeycloakEndpoint(
    process.env.NEXT_PUBLIC_CONTAINER_KEYCLOAK_ENDPOINT,
    process.env.NEXT_PUBLIC_LOCAL_KEYCLOAK_URL
);
const localKeycloakUrl = resolveLocalKeycloakUrl(process.env.NEXT_PUBLIC_LOCAL_KEYCLOAK_URL);
const authRealm = resolveAuthRealm(process.env.NEXT_PUBLIC_AUTH_REALM);

export function resolveContainerKeycloakEndpoint(container?: string, local?: string) {
    return container || local || 'http://127.0.0.1:8080';
}
export function resolveLocalKeycloakUrl(local?: string) {
    return local || 'http://127.0.0.1:8080';
}
export function resolveAuthRealm(realm?: string) {
    return realm || 'cs-club';
}
export function resolveChecks(nodeEnv?: string, skipEnv?: string): ('state' | 'pkce')[] {
    return nodeEnv === 'test' || skipEnv === 'true' ? [] : ['state'];
}

function jwtCallback(params: any) {
    const token = params.token;
    const user = params.user;
    const account = params.account;
    const profile = params.profile;
    if (account) {
        if (account.access_token) {
            const decodedToken = decodeJwt<KeycloakToken>(account.access_token);
            if (decodedToken && decodedToken.realm_access && decodedToken.realm_access.roles) {
                const roles = decodedToken.realm_access.roles;
                if (roles.includes('committee')) {
                    token.isCommittee = true;
                }
                if (roles.includes('restricted-access')) {
                    token.isAdmin = true;
                }
            }
        }
        if (user) {
            token.email = user.email;
            token.name = user.name;
        }
        if (profile) {
            token.id = profile.sub;
            token.firstName = profile.given_name;
            token.lastName = profile.family_name;
        }
    }
    return token;
}

function sessionCallback(params: any) {
    const session = params.session;
    const token = params.token;
    if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string | undefined;
        (session.user as ExtendedSession['user']).firstName = token.firstName as string | undefined;
        (session.user as ExtendedSession['user']).lastName = token.lastName as string | undefined;
        (session.user as ExtendedSession['user']).isCommittee = token.isCommittee as
            | boolean
            | undefined;
        (session.user as ExtendedSession['user']).isAdmin = token.isAdmin as boolean | undefined;
    }
    return session;
}

const nextAuthResult = NextAuth({
    providers: [
        Keycloak({
            checks: resolveChecks(process.env.NODE_ENV, process.env.SKIP_ENV_VALIDATION),
            jwks_endpoint: `${containerKeycloakEndpoint}/realms/${authRealm}/protocol/openid-connect/certs`,
            wellKnown: undefined,
            clientId: process.env.AUTH_KEYCLOAK_ID,
            clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
            issuer: `${localKeycloakUrl}/realms/${authRealm}`,
            authorization: {
                params: {
                    scope: 'openid email profile',
                },
                url: `${localKeycloakUrl}/realms/${authRealm}/protocol/openid-connect/auth`,
            },
            token: `${containerKeycloakEndpoint}/realms/${authRealm}/protocol/openid-connect/token`,
            userinfo: `${containerKeycloakEndpoint}/realms/${authRealm}/protocol/openid-connect/userinfo`,
        }),
    ],
    trustHost: true,
    callbacks: {
        jwt: jwtCallback,
        session: sessionCallback,
    },
});

export const handlers = nextAuthResult.handlers;
export const signIn = nextAuthResult.signIn;
export const signOut = nextAuthResult.signOut;

interface AuthFunction {
    (): Promise<Session | null>;
    (...args: any[]): any;
}

export const auth: AuthFunction = (async (...args: any[]) => {
    console.log(
        '--- auth() CALLED. env.SKIP_ENV_VALIDATION:',
        process.env.SKIP_ENV_VALIDATION,
        'env.NODE_ENV:',
        process.env.NODE_ENV,
        'args.length:',
        args.length
    );
    if (process.env.SKIP_ENV_VALIDATION === 'true' || process.env.NODE_ENV === 'test') {
        try {
            const reqHeaders = await headers();
            const mockAuth = reqHeaders.get('x-mock-auth');
            console.log('--- E2E MOCK AUTH HEADER RESOLVED:', mockAuth);
            if (mockAuth) {
                if (args.length > 0) {
                    return NextResponse.next();
                }
                if (mockAuth === 'admin') {
                    return {
                        user: {
                            id: 'mock-admin-id',
                            name: 'Mock Admin',
                            email: 'admin@example.com',
                            isCommittee: true,
                            isAdmin: true,
                        },
                        expires: '2026-12-31T23:59:59.999Z',
                    };
                } else if (mockAuth === 'user') {
                    return {
                        user: {
                            id: 'mock-user-id',
                            name: 'Mock User',
                            email: 'user@example.com',
                            isCommittee: false,
                            isAdmin: false,
                        },
                        expires: '2026-12-31T23:59:59.999Z',
                    };
                }
            }
        } catch {
            // headers() throws when called during static generation
        }
    }
    // @ts-ignore
    return nextAuthResult.auth(...args);
}) as any;
