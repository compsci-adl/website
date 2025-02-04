import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth';
import type { Session } from 'next-auth';
import Keycloak from 'next-auth/providers/keycloak';

interface ExtendedSession extends Session {
    user: {
        id?: string;
        email?: string;
        name?: string;
        firstName?: string;
        lastName?: string;
        isCommittee?: boolean;
    };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Keycloak],
    trustHost: true,
    callbacks: {
        async jwt({ token, user, account, profile }) {
            // Add user information to the JWT token
            if (account?.access_token) {
                const decodedToken = jwt.decode(account?.access_token);
                if (decodedToken && typeof decodedToken !== 'string') {
                    if (decodedToken?.realm_access?.roles.includes('restricted-access')) {
                        token.isCommittee = true;
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
            return token;
        },
        async session({ session, token }) {
            // Add user ID and names to the session
            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name ?? undefined;
                (session.user as ExtendedSession['user']).firstName = token.firstName as
                    | string
                    | undefined;
                (session.user as ExtendedSession['user']).lastName = token.lastName as
                    | string
                    | undefined;
                (session.user as ExtendedSession['user']).isCommittee = token.isCommittee as
                    | boolean
                    | undefined;
            }
            return session;
        },
    },
});
