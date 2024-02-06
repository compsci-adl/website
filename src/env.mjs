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
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    },
    skipValidation: process.env.SKIP_ENV_VALIDATION,
});
