import { auth } from '@/auth';
import FancyRectangle from '@/components/FancyRectangle';
import Title from '@/components/Title';
import { checkUserExists } from '@/server/check-user-exists';
import { sendWelcomeEmail } from '@/server/send-welcome-email';
import { verifyMembershipPayment } from '@/server/verify-membership-payment';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Settings from './Settings';

export const metadata: Metadata = {
    title: 'Settings',
    robots: { index: false, follow: false },
};

type MembershipPayment =
    | { paid: true; membershipExpiresAt: Date; welcomeEmailSent?: boolean }
    | { paid: false; membershipExpiresAt?: undefined; welcomeEmailSent?: undefined };

export default async function SettingsPage() {
    const session = await auth();
    if (!session?.user) return notFound();

    let exists = false;

    let membershipPayment: MembershipPayment = {
        paid: false,
        membershipExpiresAt: undefined,
    };

    if (session?.user.id) {
        exists = await checkUserExists(session.user.id);
        membershipPayment = await verifyMembershipPayment(session.user.id);
        if (membershipPayment.paid && session.user.email && session.user.firstName)
            await sendWelcomeEmail(session.user.id, session.user.email, session.user.firstName);
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
