import ky from 'ky';

export const fetcher = ky.create({ prefixUrl: '/api' });
