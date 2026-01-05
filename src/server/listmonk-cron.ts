import { env } from '@/env.mjs';
import { redisClient } from '@/lib/redis';
import cron from 'node-cron';
import type { RedisClientType, SetOptions } from 'redis';
import { syncAllMembersToListmonk, removeExpiredMembersFromListmonk } from './listmonk-sync';

let registered = false;

export function registerListmonkCron() {
    if (registered) return;
    registered = true;

    // Run email list sync every 12 hours
    const schedule = '0 */12 * * *';
    const tz = process.env.TZ ?? 'UTC';

    try {
        cron.schedule(
            schedule,
            async () => {
                try {
                    // Acquire a Redis lock so that only one instance runs the job when scaled.
                    const lockKey = 'listmonk:sync:lock';
                    const lockTTLSeconds = 60 * 60; // 1 hour

                    if (env.REDIS_URI) {
                        const redis = redisClient as unknown as RedisClientType | undefined;
                        try {
                            const setOptions: SetOptions = { NX: true, EX: lockTTLSeconds };
                            const setResult = await redis?.set?.(lockKey, '1', setOptions);
                            if (!setResult) {
                                console.error(
                                    '[Listmonk] Another instance holds the lock, skipping this run'
                                );
                                return;
                            }

                            // First sync paid members (create or update lists)
                            await syncAllMembersToListmonk();
                            // Then remove expired/unpaid members from Listmonk
                            await removeExpiredMembersFromListmonk();
                        } finally {
                            try {
                                await redis?.del?.(lockKey);
                            } catch (err) {
                                console.error('[Listmonk] Failed to release Redis lock', err);
                            }
                        }
                    } else {
                        // No Redis configured, just run sync directly
                        await syncAllMembersToListmonk();
                        await removeExpiredMembersFromListmonk();
                    }
                } catch (err) {
                    console.error('[Listmonk] Scheduled sync failed:', err);
                }
            },
            {
                timezone: tz,
            }
        );

        (async () => {
            try {
                await syncAllMembersToListmonk();
            } catch (err) {
                console.error('[Listmonk] Initial startup sync failed:', err);
            }
        })();
    } catch (err) {
        console.error('[Listmonk] Failed to register cron job:', err);
    }
}
