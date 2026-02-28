import { env } from '@/env.mjs';
import { SquareClient, SquareEnvironment } from 'square';

export const squareClient = new SquareClient({
    token: env.SQUARE_ACCESS_TOKEN,
    environment:
        process.env.NODE_ENV === 'production'
            ? SquareEnvironment.Production
            : SquareEnvironment.Sandbox,
});
