/**
 * TRPC Runtime Configuration docs
 *
 * @link https://trpc.io/docs/server/routers#runtime-configuration
 */

// TODO: Proper Error Logging and Handeling

import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import type { Context } from '@/server/context';

const tRPC = initTRPC.context<Context>().create({
    // Return stacktrace if in dev mode
    isDev: process.env.NODE_ENV !== 'production',
    transformer: superjson,
});

const isAuthed = tRPC.middleware(async ({ next, ctx }) => {
    console.log('isAuthed', ctx.auth);
    if (ctx.auth.userId === null) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
        ctx: {
            auth: ctx.auth,
        },
    });
});

const middleware = tRPC.middleware;
const publicProcedure = tRPC.procedure;
const protectedProcedure = tRPC.procedure.use(isAuthed);
const router = tRPC.router;

export { router, middleware, publicProcedure, protectedProcedure };
