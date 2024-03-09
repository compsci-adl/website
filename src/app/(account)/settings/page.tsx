import FancyRectangle from '@/components/FancyRectangle';
import Title from '@/components/Title';
import { db } from '@/db';
import { checkUserExists } from '@/server/check-user-exists';
import { verifyMembershipPayment } from '@/server/verify-membership-payment';
import { currentUser } from '@clerk/nextjs';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Settings from './Settings';

export const metadata: Metadata = {
    title: 'Settings',
    robots: { index: false, follow: false },
};

const getSettingData = async (userId: string) => {
    const membershipPayment = await verifyMembershipPayment(userId);

    const personalInfo = await db.query.memberTable.findFirst({
        where: (members, { eq }) => eq(members.clerkId, userId),
        columns: {
            firstName: true,
            lastName: true,
            ageBracket: true,
            gender: true,
            studentType: true,
            studentStatus: true,
            studentId: true,
            degree: true,
        },
    });

    return { membershipPayment, personalInfo };
};
export type SettingData = Awaited<ReturnType<typeof getSettingData>>;

export default async function SettingsPage() {
    const user = await currentUser();
    if (!user) return notFound();

    const exists = await checkUserExists(user.id);
    const settingData = await getSettingData(user.id);

    return (
        <main className="flex flex-col items-center gap-8 md:gap-16">
            <div className="flex justify-center">
                <Title colour="purple">Settings</Title>
            </div>
            <section className="w-full max-w-[62rem]">
                <FancyRectangle colour="purple" offset="8" filled fullWidth>
                    {exists ? (
                        <Settings settingData={settingData} />
                    ) : (
                        <h2 className="text-2xl">
                            Please finishing{' '}
                            <Link href="/join" className="font-bold text-purple">
                                signing up
                            </Link>{' '}
                            first.
                        </h2>
                    )}
                </FancyRectangle>
            </section>
        </main>
    );
}
