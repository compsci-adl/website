import { env } from '@/env.mjs';
import { createClient } from 'redis';

let isConnected = false;

const baseClient = env.REDIS_URI
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

const ensureConnection = async () => {
    if (env.REDIS_URI && !isConnected) {
        await baseClient.connect();
        isConnected = true;
    }
};

export const redisClient = {
    connect: ensureConnection,
    ping: async () => {
        await ensureConnection();
        return (baseClient as any).ping();
    },
    get: async (key: string) => {
        await ensureConnection();
        return (baseClient as any).get(key);
    },
    set: async (key: string, value: string) => {
        await ensureConnection();
        return (baseClient as any).set(key, value);
    },
    hSet: async (key: string, values: Record<string, string>) => {
        await ensureConnection();
        return (baseClient as any).hSet(key, values);
    },
    hGet: async (key: string, field: string) => {
        await ensureConnection();
        return (baseClient as any).hGet(key, field);
    },
    del: async (key: string) => {
        await ensureConnection();
        return (baseClient as any).del(key);
    },
};
