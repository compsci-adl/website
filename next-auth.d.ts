import NextAuth, { Session } from 'next-auth';

declare module 'next-auth' {
    interface Session {
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
}
