import NextAuth, { User as NextAuthUser } from 'next-auth';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
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
    callbacks: {
        async jwt({ token, user, profile }) {
            // Add user information to the JWT token
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }

            if (profile) {
                token.firstName = profile.given_name;
                token.lastName = profile.family_name;
                if (profile.isCommittee) {
                    token.isCommittee = profile.isCommittee;
                }
            }
            return token;
        },
        async session({ session, token }) {
            // Add user ID and names to the session
            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name;
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
