import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { redisClient } from '@/lib/redis';
import { squareClient } from '@/lib/square';
import { eq } from 'drizzle-orm';
import { updateMemberExpiryDate } from './update-member-expiry-date';

export const verifyMembershipPayment = async (clerkId: string) => {
    // Get user's membership expiry date from the database
    const [member] = await db
        .select({
            id: memberTable.id,
            membershipExpiresAt: memberTable.membershipExpiresAt,
        })
        .from(memberTable)
        .where(eq(memberTable.clerkId, clerkId));
    // If membership expiry date exists, return the existing date
    if (member && member.membershipExpiresAt) {
        return { paid: true as const, membershipExpiresAt: member.membershipExpiresAt };
    }

    const orderId = await redisClient.hGet(`payment:membership:${clerkId}`, 'orderId');
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
            const expiryDate = await updateMemberExpiryDate(clerkId, 'clerkId');

            // Delete key from Redis since it is no longer needed
            await redisClient.del(`payment:membership:${clerkId}`);

            return { paid: true as const, membershipExpiresAt: expiryDate };
        }

        return { paid: false as const };
    } catch {
        return { paid: false as const };
    }
};
export type MembershipPayment = Awaited<ReturnType<typeof verifyMembershipPayment>>;
