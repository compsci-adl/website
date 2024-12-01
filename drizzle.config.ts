import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  url: 'file:./dev.sqlite',
  schema: './src/db/schema.ts',
  dbCredentials: {
    url: './dev.sqlite/',
  },
});
