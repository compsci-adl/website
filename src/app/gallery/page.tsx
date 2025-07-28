'use client';

import FancyRectangle from '@/components/FancyRectangle';
import Title from '@/components/Title';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import Gallery from './Gallery';

export default function GalleryPage() {
    const { data: session, status } = useSession();
    const [currentTitle, setCurrentTitle] = useState('Photo Gallery');
    const [member, isMember] = useState<boolean | null>(null);

    useEffect(() => {
        if (member != null) return;
        const checkMembership = async () => {
            if (!session) return;

            try {
                const res = await fetch(`/api/verify-membership?userId=${session.user.id}`);
                const data = await res.json();

                if (data.paid) {
                    isMember(true);
                } else {
                    isMember(false);
                }
            } catch (err) {
                console.error('Failed to verify membership', err);
                isMember(false);
            }
        };

        if (session?.user?.id) {
            checkMembership();
        }
    }, [session]);

    if (status === 'unauthenticated') {
        return notFound();
    }

    if (status === 'loading' || member === null) {
        // Loading state while checking user existence
        return (
            <main className="flex flex-col items-center gap-8 md:gap-16">
                <div className="flex justify-center">
                    <Title colour="purple">{currentTitle}</Title>
                </div>
                <section className="w-full">
                    <FancyRectangle colour="purple" offset="8" filled fullWidth>
                        <div className="flex w-full flex-col gap-4 border-4 border-black bg-white px-4 py-8 text-black md:flex-row md:gap-8 md:p-12">
                            <h2 className="text-xl">Loading...</h2>
                        </div>
                    </FancyRectangle>
                </section>
            </main>
        );
    }

    return (
        <main className="flex flex-col items-center gap-8 md:gap-16">
            <div className="flex justify-center">
                <Title colour="purple">{currentTitle}</Title>
            </div>
            <section className="w-full">
                {member ? (
                    <Gallery setCurrentTitle={setCurrentTitle} />
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
