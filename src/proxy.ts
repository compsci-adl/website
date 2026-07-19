import { auth } from '@/auth';
import { NextResponse, type NextRequest } from 'next/server';

export const proxy = async (request: NextRequest) => {
    if (process.env.NODE_ENV !== 'production' && request.headers.get('x-mock-auth')) {
        return NextResponse.next();
    }

    return auth(request);
};
