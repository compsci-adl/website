import ky from 'ky';

const kyInstance = ky.create({ prefixUrl: '/api' });

export const fetcher = {
    get: async (args: Parameters<typeof kyInstance.get>) =>
        (await kyInstance.get(...args).json()) as any,
    post: async (url: string, { arg }: { arg: unknown }) =>
        (await kyInstance.post(url, { json: arg }).json()) as any,
};
