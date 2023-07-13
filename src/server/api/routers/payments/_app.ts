import { z } from 'zod';
import { router, protectedProcedure } from '@/server/trpc';

// Add Subrouters to the main app router
export const paymentRouter = router({
    heartbeat: protectedProcedure
        .input(
            z.object({
                text: z.string(),
            })
        )
        .query((opts) => {
            return `Hello ${opts.ctx.auth.userId}`;
        }),
});
