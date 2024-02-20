									import FancyRectangle from '@/components/FancyRectangle';
									import Title from '@/components/Title';
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
                    <FancyRectangle colour="purple" offset="8" filled>
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
									