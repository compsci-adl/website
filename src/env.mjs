import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const isDev = process.env.NODE_ENV === 'development';

export const env = createEnv({
    server: {
        AUTH_KEYCLOAK_ID: z.string().min(1).optional(),
        AUTH_KEYCLOAK_SECRET: z.string().min(1).optional(),
        DATABASE_URL: z.string().min(1),
        DATABASE_AUTH_TOKEN: isDev ? z.string().optional() : z.string().min(1),
        SQUARE_ACCESS_TOKEN: z.string().min(1),
        SQUARE_LOCATION_ID: z.string().min(1),
        REDIS_URI: z.string().min(1),
        SMTP_HOST: z.string().min(1).optional(),
        SMTP_USER: z.string().min(1).optional(),
        SMTP_PASS: z.string().min(1).optional(),
        SMTP_EMAIL_ADDRESS: z.string().min(1).email().optional(),
        DISCORD_TOKEN: z.string().min(1).optional(),
    },
    client: {
        NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI: z.string().url().min(1).optional(),
        NEXT_PUBLIC_AUTH_REALM: z.string().min(1).optional(),
        NEXT_PUBLIC_CONTAINER_KEYCLOAK_ENDPOINT: z.string().url().min(1).optional(),
        NEXT_PUBLIC_LOCAL_KEYCLOAK_URL: z.string().url().min(1).optional(),
        NEXT_PUBLIC_DRIVE_LINK: z.string().url().min(1),
        NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().optional(),
        NEXT_PUBLIC_PAYLOAD_URI: z.string().url(),
        NEXT_PUBLIC_DISCORD_REDIRECT_URI: z.string().url().min(1).optional(),
        NEXT_PUBLIC_DISCORD_CLIENT_ID: z.string().min(1).optional(),
        NEXT_PUBLIC_DISCORD_CLIENT_SECRET: z.string().min(1).optional(),
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI: process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI,
        NEXT_PUBLIC_AUTH_REALM: process.env.NEXT_PUBLIC_AUTH_REALM,
        NEXT_PUBLIC_CONTAINER_KEYCLOAK_ENDPOINT:
            process.env.NEXT_PUBLIC_CONTAINER_KEYCLOAK_ENDPOINT,
        NEXT_PUBLIC_LOCAL_KEYCLOAK_URL: process.env.NEXT_PUBLIC_LOCAL_KEYCLOAK_URL,
        NEXT_PUBLIC_DRIVE_LINK: process.env.NEXT_PUBLIC_DRIVE_LINK,
        NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
        NEXT_PUBLIC_PAYLOAD_URI: process.env.NEXT_PUBLIC_PAYLOAD_URI,
        NEXT_PUBLIC_DISCORD_REDIRECT_URI: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI,
        NEXT_PUBLIC_DISCORD_CLIENT_ID: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
        NEXT_PUBLIC_DISCORD_CLIENT_SECRET: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET,
    },
    skipValidation: process.env.SKIP_ENV_VALIDATION,
});
