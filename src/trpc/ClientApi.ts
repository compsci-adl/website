/**
 * This module exports a TRPC client and a hook for performing actions on the server.
 *
 * Should be used if you want to render on client side and fecth data on client side.
 *
 * The `clientAPI` is an instance of `experimental_createTRPCNextAppDirClient` that is configured
 * with a `superjson` transformer and two links:
 *
 * - `loggerLink`: a link that logs TRPC requests and responses to the consolein dev mode.
 * - `experimental_nextHttpLink`: a link that sends TRPC requests to the server using the `next/http`
 *   library. It is configured to use the `getApiUrl` function to determine the URL of the server
 *   API, and to include an `x-trpc-source` header with the value "client".
 *
 * The `useAction` hook is created using `experimental_createActionHook` and is configured with a
 * `superjson` transformer and two links:
 *
 * - `experimental_serverActionLink`: a link that sends TRPC requests to the server using the `fetch`
 *   API. This link is used to perform server-side actions, such as sending emails or updating the
 *   database.
 *
 * @see https://github.com/trpc/examples-next-app-dir/blob/main/src/trpc/client.ts
 */

'use client';

import { loggerLink } from '@trpc/client';
import { experimental_nextHttpLink } from '@trpc/next/app-dir/links/nextHttp';
import {
    experimental_createTRPCNextAppDirClient,
    experimental_createActionHook,
    experimental_serverActionLink,
} from '@trpc/next/app-dir/client';
import superjson from 'superjson';
import type { AppRouter } from '@/server/api/_app';
import { getApiUrl } from '@/util/trpc';

const clientAPI = experimental_createTRPCNextAppDirClient<AppRouter>({
    config() {
        return {
            transformer: superjson,
            links: [
                loggerLink({
                    enabled: () => {
                        return process.env.NODE_ENV !== 'production';
                    },
                }),
                experimental_nextHttpLink({
                    batch: true,
                    url: getApiUrl(),
                    headers() {
                        return {
                            'x-trpc-source': 'client',
                            // Disable caching for HTTP requests. Change this if you want to enable caching.
                            'cache-control': `no-cache`,
                        };
                    },
                }),
            ],
        };
    },
});

const useAction = experimental_createActionHook({
    links: [loggerLink(), experimental_serverActionLink()],
    transformer: superjson,
});

export { clientAPI, useAction };
