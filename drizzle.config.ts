import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: './src/db/schema.ts',
  connectionString: process.env.DB_CONNECTION_URI,
};

export default config;
