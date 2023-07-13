import type { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/db/schema.ts',
  connectionString: process.env.DB_CONNECTION_URI,
  out: './drizzle',
} satisfies Config;
