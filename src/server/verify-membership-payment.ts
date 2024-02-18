import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { redisClient } from '@/lib/redis';
import { squareClient } from '@/lib/square';
import { eq } from 'drizzle-orm';
import { updateMemberExpiryDate } from './update-member-expiry-date';

export const verifyMembershipPayment = async (clerkId: string) => {
    // Get user's membership expiry date from the database
    const [{ membershipExpiresAt }] = await db
        .select({
            id: memberTable.id,
            membershipExpiresAt: memberTable.membershipExpiresAt,
        })
        .from(memberTable)
        .where(eq(memberTable.clerkId, clerkId));
    // If membership expiry date exists, return the existing date
    if (membershipExpiresAt) {
        return { paid: true as const, membershipExpiresAt };
    }

    const paymentId = await redisClient.hGet(`payment:membership:${clerkId}`, 'paymentId');
    if (!paymentId) {
        // Membership payment for the user does not exist
        return { paid: false as const };
    }

    const resp = await squareClient.checkoutApi.retrievePaymentLink(paymentId);
    const respFields = resp.result;
    if (!respFields.paymentLink || respFields.paymentLink.id !== paymentId) {
        // Payment has not been made
        return { paid: false as const };
    }

    // Set expiry date to be the January 1st of the following year
    const expiryDate = await updateMemberExpiryDate(clerkId, 'clerkId');

    // Delete key from Redis since it is no longer needed
    await redisClient.del(`payment:membership:${clerkId}`);

    return { paid: true as const, membershipExpiresAt: expiryDate };
};
export type MembershipPayment = Awaited<ReturnType<typeof verifyMembershipPayment>>;
