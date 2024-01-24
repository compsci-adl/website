import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());

import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migration',
  driver: 'turso',
  dbCredentials: { url: process.env.DATABASE_URL!, authToken: process.env.DATABASE_AUTH_TOKEN },
} satisfies Config;
