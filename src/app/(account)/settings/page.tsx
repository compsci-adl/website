import FancyRectangle from '@/components/FancyRectangle';
import Title from '@/components/Title';
import { checkUserExists } from '@/server/check-user-exists';
import { verifyMembershipPayment } from '@/server/verify-membership-payment';
import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Settings from './Settings';

export default async function SettingsPage() {
    const user = await currentUser();
    if (!user) return notFound();

    const exists = await checkUserExists(user.id);
    const membershipPayment = await verifyMembershipPayment(user.id);

    return (
        <main className="flex flex-col items-center gap-8 md:gap-16">
            <div className="flex justify-center">
                <Title colour="purple">Settings</Title>
            </div>
            <section className="w-full max-w-lg">
                <FancyRectangle colour="purple" offset="8" filled={true} fullWidth={true}>
                    <div className="z-0 grid w-full border-4 border-black bg-white p-8 text-black md:grid-cols-3 md:p-12">
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
        </main>
    );
}
