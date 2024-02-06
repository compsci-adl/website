import { env } from '@/env.mjs';
import { Client, Environment } from 'square';

export const squareClient = new Client({
    accessToken: env.SQUARE_ACCESS_TOKEN,
    environment:
        process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox,
});
