/**
 * Context that is used to process every request that goes through the tRPC endpoints.
 *
 * @link https://trpc.io/docs/context
 * @link https://github.com/trpc/examples-next-app-dir/blob/main/src/server/context.ts
 */

import { getAuth } from '@clerk/nextjs/server';
import type { inferAsyncReturnType } from '@trpc/server';
import type { SignedInAuthObject, SignedOutAuthObject } from '@clerk/nextjs/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import db from '@/lib/db/drizzle-db';

type CreateContextOptions = {
    auth: SignedInAuthObject | SignedOutAuthObject;
};

export const createContextInner = (opts: CreateContextOptions) => {
    return {
        auth: opts.auth,
        db,
    };
};

export const createContext = (opts: CreateNextContextOptions) => {
    const auth = getAuth(opts.req);
    console.log('auth', opts.req.headers.cookie);
    return createContextInner({
        auth,
    });
};

export type Context = inferAsyncReturnType<typeof createContext>;
