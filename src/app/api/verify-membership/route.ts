import { verifyMembershipPayment } from '@/server/verify-membership-payment';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    try {
        const result = await verifyMembershipPayment(userId);
        return NextResponse.json(result);
    } catch (err) {
        console.error('Error verifying membership:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
