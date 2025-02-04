import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { redisClient } from '@/lib/redis';
import { squareClient } from '@/lib/square';
import { eq } from 'drizzle-orm';
import { cache } from 'react';
import { updateMemberExpiryDate } from './update-member-expiry-date';

export const verifyMembershipPayment = cache(async (keycloakId: string) => {
    // Get user's membership expiry date from the database
    const [member] = await db
        .select({
            id: memberTable.id,
            membershipExpiresAt: memberTable.membershipExpiresAt,
        })
        .from(memberTable)
        .where(eq(memberTable.keycloakId, keycloakId));
    // If membership expiry date exists and hasn't passed, user has paid
    if (member && member.membershipExpiresAt && new Date(member.membershipExpiresAt) > new Date()) {
        return { paid: true as const, membershipExpiresAt: member.membershipExpiresAt };
    }

    const orderId = await redisClient.hGet(`payment:membership:${keycloakId}`, 'orderId');
    if (!orderId) {
        // Membership payment for the user does not exist
        return { paid: false as const };
    }

    try {
        // Get order details
        const orderRes = await squareClient.ordersApi.retrieveOrder(orderId);

        // Get payment ID from the order
        const paymentId = orderRes.result.order?.tenders?.[0]?.paymentId;

        // If payment ID exists, payment was successful
        if (paymentId) {
            // Set expiry date to be the January 1st of the following year
            const expiryDate = await updateMemberExpiryDate(keycloakId, 'keycloakId');

            // Delete key from Redis since it is no longer needed
            await redisClient.del(`payment:membership:${keycloakId}`);

            return { paid: true as const, membershipExpiresAt: expiryDate };
        }

        return { paid: false as const };
    } catch {
        return { paid: false as const };
    }
});
export type MembershipPayment = Awaited<ReturnType<typeof verifyMembershipPayment>>;
