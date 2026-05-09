import { env } from '@/env.mjs';
import { createClient } from 'redis';

let isConnected = false;
let connectionHealthy = false;
let connectionFailed = false;
let connectInProgress = false;

const baseClient = env.REDIS_URI
    ? createClient({ url: env.REDIS_URI })
    : {
          connect: async () => {},
          ping: async () => 'PONG',
          get: async (_key: string) => null,
          set: async (_key: string, _value: string) => {},
          hSet: async (_key: string, _values: Record<string, string>) => {},
          hGet: async (_key: string, _field: string) => null,
          del: async (_key: string) => {},
      };

const DEFAULT_CONNECT_TIMEOUT = 2000; // ms

const ensureConnection = async () => {
    if (!env.REDIS_URI) return;

    const client: any = baseClient;

    if (connectionHealthy) return;

    // If a previous attempt failed, don't block requests by retrying synchronously
    if (connectionFailed) return;

    // Avoid concurrent connect attempts
    if (connectInProgress) return;

    connectInProgress = true;
    try {
        // Fail fast if the client doesn't connect within the timeout
        await Promise.race([
            client.connect(),
            new Promise((_, reject) =>
                setTimeout(
                    () => reject(new Error('Redis connect timeout')),
                    DEFAULT_CONNECT_TIMEOUT
                )
            ),
        ]);

        isConnected = true;
        connectionHealthy = true;
    } catch (err: any) {
        connectionFailed = true;
        // If it's the known HMR error, treat as healthy to avoid repeated noise
        if (String(err?.message).includes('Socket already opened')) {
            connectionHealthy = true;
            isConnected = true;
            console.warn('Redis: socket already opened, marking connection healthy');
        } else {
            console.warn('Redis connection failed (fast-fail):', err?.message ?? err);
        }
    } finally {
        connectInProgress = false;
    }
};

export const redisClient = {
    connect: ensureConnection,
    ping: async () => {
        await ensureConnection();
        if (!connectionHealthy) return 'PONG';
        return (baseClient as any).ping();
    },
    get: async (key: string) => {
        await ensureConnection();
        if (!connectionHealthy) return null;
        return (baseClient as any).get(key);
    },
    set: async (key: string, value: string) => {
        await ensureConnection();
        if (!connectionHealthy) return;
        return (baseClient as any).set(key, value);
    },
    hSet: async (key: string, values: Record<string, string>) => {
        await ensureConnection();
        if (!connectionHealthy) return;
        return (baseClient as any).hSet(key, values);
    },
    hGet: async (key: string, field: string) => {
        await ensureConnection();
        if (!connectionHealthy) return null;
        return (baseClient as any).hGet(key, field);
    },
    del: async (key: string) => {
        await ensureConnection();
        if (!connectionHealthy) return;
        return (baseClient as any).del(key);
    },
};
