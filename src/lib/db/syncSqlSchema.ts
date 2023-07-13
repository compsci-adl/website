/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable unicorn/no-process-exit */
import { migrate } from 'drizzle-orm/planetscale-serverless/migrator';
import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';

const syncSqlSchema = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (process.env.DB_CONNECTION_URI === null) {
        throw new Error('DB_CONNECTION_URI is not defined');
    }

    const connection = connect({
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
    });

    const db = drizzle(connection);

    console.log('⏳ Syncing Sql Schema to Planetbase...');

    const start = Date.now();

    await migrate(db, { migrationsFolder: './drizzle' });

    const end = Date.now();

    console.log(`✅ Sync completed in ${end - start}ms`);

    process.exit(0);
};

syncSqlSchema().catch((err) => {
    console.error('❌ Syncing failed');
    console.error(err);
    process.exit(1);
});
