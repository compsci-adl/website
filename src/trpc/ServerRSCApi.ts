/**
 * This module exports a TRPC server instance for use with React Server Components with the 'use
 * server' flag. It uses the `experimental_createTRPCNextAppDirServer` function from the
 * `@trpc/next/app-dir/server` package to create the server instance.
 *
 * Should be used if you want to render on server side and fecth data on server side with RSC.
 *
 * Warning: This doesn't have auth context, so you can't use protected procedures. Use
 * `ClientApi.ts` if you need auth context.
 *
 * The server instance uses SuperJson as its data transformer. Query logs is enabled in
 * non-production environments only. This uses experimental undocumented features from trpc.
 *
 * @see https://github.com/trpc/examples-next-app-dir/blob/main/src/trpc/server-invoker.ts
 */
'use server';

import { loggerLink } from '@trpc/client';
import { experimental_createTRPCNextAppDirServer } from '@trpc/next/app-dir/server';
import { experimental_nextCacheLink } from '@trpc/next/app-dir/links/nextCache';
import { auth } from '@clerk/nextjs';
import { cookies } from 'next/headers';
import type { AppRouter } from '@/server/api/_app';
import { appRouter } from '@/server/api/_app';
import SuperJson from 'superjson';
import db from '@/lib/db/drizzle-db';

export const serverRSCApi = experimental_createTRPCNextAppDirServer<AppRouter>({
    config() {
        return {
            transformer: SuperJson,
            links: [
                loggerLink({
                    enabled: () => {
                        return process.env.NODE_ENV !== 'production';
                    },
                }),
                experimental_nextCacheLink({
                    // cache reqs for 0 seconds
                    revalidate: 5,
                    router: appRouter,
                    // eslint-disable-next-line @typescript-eslint/require-await
                    createContext: async () => {
                        const session = auth();
                        console.log('session', session);
                        return {
                            session,
                            db,
                            headers: {
                                cookie: cookies().toString(),
                                'x-trpc-source': 'rsc-client',
                            },
                        };
                    },
                }),
            ],
        };
    },
});
