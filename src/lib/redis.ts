import { env } from '@/env.mjs';
import { createClient } from 'redis';

export const redisClient = env.REDIS_URI
    ? createClient({ url: env.REDIS_URI })
    : {
          connect: async () => {},
          ping: async () => 'PONG',
          get: async (key: string) => null,
          set: async (key: string, value: string) => {},
          hSet: async (key: string, values: Record<string, string>) => {},
          hGet: async (key: string, field: string) => {},
          del: async (key: string) => {},
      };

if (env.REDIS_URI) {
    await redisClient.connect();
    await redisClient.ping();
}
