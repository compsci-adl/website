import { auth } from '@/auth';
import FancyRectangle from '@/components/FancyRectangle';
import Title from '@/components/Title';
import { checkUserExists } from '@/server/check-user-exists';
import { verifyMembershipPayment } from '@/server/verify-membership-payment';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Settings from './Settings';

export const metadata: Metadata = {
    title: 'Settings',
    robots: { index: false, follow: false },
};

export default async function SettingsPage() {
    const session = await auth();
    var exists = false;
    var membershipPayment:
        | { paid: true; membershipExpiresAt: Date }
        | { paid: false; membershipExpiresAt?: undefined } = {
        paid: false,
        membershipExpiresAt: undefined,
    };

    if (!session?.user) return notFound();

    if (session?.user.id) {
        exists = await checkUserExists(session.user.id);
        membershipPayment = await verifyMembershipPayment(session.user.id);
    }

    return (
        <main className="flex flex-col items-center gap-8 md:gap-16">
            <div className="flex justify-center">
                <Title colour="purple">Settings</Title>
            </div>
            <section className="w-full max-w-[62rem]">
                <FancyRectangle colour="purple" offset="8" filled fullWidth>
                    {exists ? (
                        <Settings settingData={{ membershipPayment }} />
                    ) : (
                        <div className="flex w-full flex-col gap-4 border-4 border-black bg-white px-4 py-8 text-black md:flex-row md:gap-8 md:p-12">
                            <h2 className="text-xl">
                                Please finish{' '}
                                <Link href="/join" className="font-bold text-purple">
                                    signing up
                                </Link>{' '}
                                first.
                            </h2>
                        </div>
                    )}
                </FancyRectangle>
            </section>
        </main>
    );
}
