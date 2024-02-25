import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const isDev = process.env.NODE_ENV === 'development';

export const env = createEnv({
    server: {
        CLERK_SECRET_KEY: z.string().min(1),
        DATABASE_URL: z.string().min(1),
        DATABASE_AUTH_TOKEN: isDev ? z.string().optional() : z.string().min(1),
        SQUARE_ACCESS_TOKEN: z.string().min(1),
        SQUARE_LOCATION_ID: z.string().min(1),
        REDIS_URI: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
        NEXT_PUBLIC_DRIVE_LINK: z.string().url().min(1),
        // Clerk URLs. Redundant, but there is no other way from Clerk.
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.literal('/signin'),
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.literal('/join'),
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.literal('/'),
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.literal('/'),
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        NEXT_PUBLIC_DRIVE_LINK: process.env.NEXT_PUBLIC_DRIVE_LINK,
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    },
    skipValidation: process.env.SKIP_ENV_VALIDATION,
});
