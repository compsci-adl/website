'use client';

import FancyRectangle from '@/components/FancyRectangle';
import Title from '@/components/Title';
import { checkUserExists } from '@/server/check-user-exists';
import { verifyMembershipPayment } from '@/server/verify-membership-payment';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Gallery from './Gallery';

type MembershipPayment =
    | { paid: true; membershipExpiresAt: Date; welcomeEmailSent?: boolean }
    | { paid: false; membershipExpiresAt?: undefined; welcomeEmailSent?: undefined };

export default function GalleryPage() {
    const { data: session } = useSession();

    // if (!session?.user) {
    //     return notFound();
    // }

    const exists = true;

    // let membershipPayment: MembershipPayment = {
    //     paid: false,
    //     membershipExpiresAt: undefined,
    // };

    // if (session?.user.id) {
    //     exists = await checkUserExists(session.user.id);
    //     membershipPayment = await verifyMembershipPayment(session.user.id);

    return (
        <main className="flex flex-col items-center gap-8 md:gap-16">
            <div className="flex justify-center">
                <Title colour="purple">Photo Gallery</Title>
            </div>
            <section className="w-full max-w-[82rem]">
                {exists ? (
                    <Gallery />
                ) : (
                    <FancyRectangle colour="purple" offset="8" filled fullWidth>
                        <div className="flex w-full flex-col gap-4 border-4 border-black bg-white px-4 py-8 text-black md:flex-row md:gap-8 md:p-12">
                            <h2 className="text-xl">
                                Please finish{' '}
                                <Link href="/join" className="font-bold text-purple">
                                    signing up
                                </Link>{' '}
                                first.
                            </h2>
                        </div>
                    </FancyRectangle>
                )}
            </section>
        </main>
    );
}
