import { db } from '@/db';
import { members } from '@/db/schema';
import { redisClient } from '@/lib/redis';
import { squareClient } from '@/lib/square';
import { currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { ApiError } from 'square';
import { z } from 'zod';

/**
 * Verify that the membership payment has been made and update the database to reflect the payment
 * status
 *
 * A redirect URL can be specified as well.
 */
export async function PUT(request: Request) {
    let req;
    try {
        req = await request.json();
    } catch (e) {
        return new Response(null, { status: 400 });
    }

    const schema = z.object({
        redirectUrl: z.string().min(1).url().optional(),
    });

    // Ensure user is logged in
    const user = await currentUser();
    if (!user) {
        return new Response(null, { status: 401 });
    }

    const result = schema.safeParse(req);
    if (!result.success) {
        return new Response(result.error.message, { status: 400 });
    }

    try {
        // Get payment ID from Redis cache
        const dbRes = await db
            .select({
                id: members.id,
            })
            .from(members)
            .where(eq(members.clerkId, user.id));
        const userId = dbRes[0].id;
        const paymentId = await redisClient.hGet(`payment:membership:${userId}`, 'paymentId');
        if (!paymentId) {
            return new Response('Membership payment for the user does not exist', { status: 404 });
        }

        const resp = await squareClient.paymentsApi.getPayment(paymentId);
        const respFields = resp.result;
        if (respFields.payment?.status === 'COMPLETED') {
            const now = new Date();
            const expiryDate = new Date(now.setFullYear(now.getFullYear() + 1));
            await db
                .update(members)
                .set({ membershipExpiresAt: expiryDate })
                .where(eq(members.id, userId));
        } else {
            return new Response('Payment has not been made', { status: 404 });
        }
    } catch (e) {
        if (e instanceof ApiError) {
            return new Response(JSON.stringify(e.errors), { status: e.statusCode });
        }
        return new Response(null, { status: 404 });
    }

    if (result.data.redirectUrl) {
        redirect(result.data.redirectUrl);
    }

    return new Response(null, { status: 200 });
}
