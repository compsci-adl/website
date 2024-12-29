import { env } from '@/env.mjs';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const client = createClient({
    url: env.DATABASE_URL || 'libsql://localhost:8080',
    authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema, logger: process.env.NODE_ENV === 'development' });
