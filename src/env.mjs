import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const isDev = process.env.NODE_ENV === 'development';

export const env = createEnv({
    server: {
        AUTH_KEYCLOAK_ID: z.string().min(1).optional(),
        AUTH_KEYCLOAK_SECRET: z.string().min(1).optional(),
        AUTH_KEYCLOAK_ISSUER: z.string().url().min(1).optional(),
        DATABASE_URL: z.string().min(1),
        DATABASE_AUTH_TOKEN: isDev ? z.string().optional() : z.string().min(1),
        SQUARE_ACCESS_TOKEN: z.string().min(1),
        SQUARE_LOCATION_ID: z.string().min(1),
        REDIS_URI: z.string().min(1),
        SMTP_HOST: z.string().min(1).optional(),
        SMTP_USER: z.string().min(1).optional(),
        SMTP_PASS: z.string().min(1).optional(),
        SMTP_EMAIL_ADDRESS: z.string().min(1).email().optional(),
        CONTACT_EMAIL_ADDRESS: z.string().min(1).email().optional(),
    },
    client: {
        NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI: z.string().url().min(1).optional(),
        NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER: z.string().url().min(1).optional(),
        NEXT_PUBLIC_DRIVE_LINK: z.string().url().min(1),
        NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().optional(),
        NEXT_PUBLIC_PAYLOAD_URI: z.string().url(),
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI: process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI,
        NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER: process.env.NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER,
        NEXT_PUBLIC_DRIVE_LINK: process.env.NEXT_PUBLIC_DRIVE_LINK,
        NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
        NEXT_PUBLIC_PAYLOAD_URI: process.env.NEXT_PUBLIC_PAYLOAD_URI,
    },
    skipValidation: process.env.SKIP_ENV_VALIDATION,
});
