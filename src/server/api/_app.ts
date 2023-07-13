import { z } from 'zod';
import { publicProcedure, router } from '@/server/trpc';
import { memberRouter } from './routers/members/_app';
import { paymentRouter } from './routers/payments/_app';

// Add Subrouters to the main app router
export const appRouter = router({
    heartbeat: publicProcedure
        .input(
            z.object({
                text: z.string(),
            })
        )
        .query((opts) => {
            return `Echo: ${opts.input.text} \n Up since ${process.uptime()}`;
        }),
    members: memberRouter,
    payments: paymentRouter,
});

// Prevents importing server side code into client side
export type AppRouter = typeof appRouter;
