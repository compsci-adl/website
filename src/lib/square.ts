import { env } from '@/env.mjs';
import { SquareClient, SquareEnvironment } from 'square';

export function resolveSquareEnvironment(nodeEnv?: string): SquareEnvironment {
    return nodeEnv === 'production' ? SquareEnvironment.Production : SquareEnvironment.Sandbox;
}

export const squareClient = new SquareClient({
    token: env.SQUARE_ACCESS_TOKEN,
    environment: resolveSquareEnvironment(process.env.NODE_ENV),
});
