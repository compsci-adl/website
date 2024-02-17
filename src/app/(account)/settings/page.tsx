import FancyRectangle from '@/components/FancyRectangle';
import Title from '@/components/Title';
import { db } from '@/db';
import { checkUserExists } from '@/db/queries';
import { memberTable } from '@/db/schema';
import { redisClient } from '@/lib/redis';
import { squareClient } from '@/lib/square';
import { currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Settings from './Settings';

const verifyMembershipPayment = async (clerkId: string) => {
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
    const now = new Date();
    const expiryDate = new Date(`${now.getFullYear() + 1}-01-01`);
    await db
        .update(memberTable)
        .set({ membershipExpiresAt: expiryDate })
        .where(eq(memberTable.clerkId, clerkId));

    // Delete key from Redis since it is no longer needed
    await redisClient.del(`payment:membership:${clerkId}`);

    return { paid: true as const, membershipExpiresAt: expiryDate };
};
export type MembershipPayment = Awaited<ReturnType<typeof verifyMembershipPayment>>;

export default async function SettingsPage() {
    const user = await currentUser();
    if (!user) return notFound();

    const exists = await checkUserExists(user.id);
    const membershipPayment = await verifyMembershipPayment(user.id);

    return (
        <div className="flex flex-col">
            <div className="flex justify-center">
                <Title colour="purple">Settings</Title>
            </div>
            <section className="mt-12 flex justify-center">
                <FancyRectangle colour="purple" offset="8" filled={true}>
                    <div className="z-0 flex w-fit gap-8 border-4 border-black bg-white px-8 py-8 text-black md:w-[48rem] md:px-12 md:py-12">
                        {exists ? (
                            <Settings settingData={{ membershipPayment }} />
                        ) : (
                            <h2 className="text-2xl">
                                Please finishing{' '}
                                <Link href="/join" className="font-bold text-purple">
                                    signing up
                                </Link>{' '}
                                first.
                            </h2>
                        )}
                    </div>
                </FancyRectangle>
            </section>
        </div>
    );
}
