import { env } from '@/env.mjs';
import { createClient } from 'redis';

export const redisClient = createClient({
    url: env.REDIS_URI,
});

await redisClient.connect();
await redisClient.ping();
