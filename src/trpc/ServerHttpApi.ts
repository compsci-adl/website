/**
 * This module exports a TRPC server instance that can be used to handle HTTP requests. This server
 * instance should be used be used without the 'use client' flag.
 *
 * Should be used if you want to render on server side but fecth data on client side.
 *
 * Warning: This doesn't have auth context, so you can't use protected procedures. Use
 * `ClientApi.ts` if you need auth context.
 *
 * It uses the`experimental_createTRPCNextAppDirServer` function from `@trpc/next/app-dir/server` to
 * create the server. The server is configured with `superjson` as the transformer.
 *
 * - The `loggerLink` logs TRPC requests and responses in non-production environments.
 * - The `experimental_nextHttpLink` is used to send HTTP requests to the TRPC server.
 *
 * The server is configured with `batch: true` to enable batching of requests and the `cookies`
 * function from the `next/headers` module is used to retrieve cookies from the incoming HTTP
 * request and add them to the outgoing request headers. The `x-trpc-source` header is also added to
 * the outgoing request headers to indicate that the request was made from an HTTP client.
 *
 * @see https://github.com/trpc/examples-next-app-dir/blob/main/src/trpc/server-http.ts
 */
'use server';

import { loggerLink } from '@trpc/client';
import { experimental_nextHttpLink } from '@trpc/next/app-dir/links/nextHttp';
import { experimental_createTRPCNextAppDirServer } from '@trpc/next/app-dir/server';
import type { AppRouter } from '@/server/api/_app';
import { cookies } from 'next/headers';
import { getApiUrl } from '@/util/trpc';
import superjson from 'superjson';

export const serverHttpApi = experimental_createTRPCNextAppDirServer<AppRouter>({
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
                            cookie: cookies().toString(),
                            'x-trpc-source': 'http-client',
                            // Disable caching for HTTP requests. Change this if you want to enable caching.
                            'cache-control': `no-cache`,
                        };
                    },
                }),
            ],
        };
    },
});
