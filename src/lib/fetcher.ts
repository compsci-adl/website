import ky from 'ky';

const kyInstance = ky.create({ prefixUrl: '/api' });

const METHODS = ['get', 'post', 'put', 'delete', 'patch'] as const;
type Methods = (typeof METHODS)[number];

type Fetcher = {
    [Method in Methods]: {
        query: (args: Parameters<(typeof kyInstance)[Method]>) => Promise<any>;
        mutate: (url: string, { arg }: { arg: unknown }) => Promise<any>;
    };
};
export const fetcher = METHODS.reduce(
    (acc, method) => ({
        ...acc,
        [method]: {
            // @ts-expect-error - args type is unnecessary
            query: async (args: any[]) => (await kyInstance[method](...args).json()) as any,
            mutate: async (url: string, { arg }: { arg: unknown }) =>
                (await kyInstance[method](url, { json: arg }).json()) as any,
        },
    }),
    {} as Fetcher
);
