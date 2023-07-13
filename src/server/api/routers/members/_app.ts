import { z } from 'zod';
import { publicProcedure, router } from '@/server/trpc';

// Add Subrouters to the main app router
export const memberRouter = router({
    heartbeat: publicProcedure
        .input(
            z.object({
                text: z.string(),
            })
        )
        .query((opts) => {
            console.log('Heartbeat');
            return `Echo from Member Router: ${opts.input.text}}`;
        }),
});
