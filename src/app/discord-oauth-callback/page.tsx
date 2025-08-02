'use client';

import Button from '@/components/Button';
import FancyRectangle from '@/components/FancyRectangle';
import { getOAuthTokens, getUserData, pushMetadata, getOAuthUrl } from '@/lib/discord';
import { storeDiscordTokens } from '@/lib/storage';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

interface Props {
    searchParams: { code?: string; state?: string };
}

export default function CallbackPage({ searchParams }: Props) {
    const sessionData = useSession();
    const session = sessionData.data;
    const sessionStatus = sessionData.status;

    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isMember, setIsMember] = useState<boolean | null>(null);

    const clientStateRef = useRef<string | null>(null);
    const hasStartedRef = useRef<boolean>(false);

    const code = searchParams.code;
    const returnedState = searchParams.state;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedState = localStorage.getItem('clientState');
            if (storedState) {
                clientStateRef.current = storedState;
            }
        }
    }, []);

    useEffect(() => {
        if (!session?.user?.id || isMember !== null) return;

        const checkMembership = async () => {
            try {
                const res = await fetch(`/api/verify-membership?userId=${session.user.id}`);
                const data = await res.json();
                setIsMember(data.paid);
                console.log(`Membership status: ${data.paid ? 'Paid' : 'Not Paid'}`);
            } catch (err) {
                console.error('Failed to verify membership', err);
                setIsMember(false);
            }
        };

        checkMembership();
    }, [session, isMember]);

    useEffect(() => {
        if (
            sessionStatus === 'loading' ||
            isMember === null ||
            isMember === false ||
            !session ||
            hasStartedRef.current
        ) {
            return;
        }

        const handleOAuth = async () => {
            hasStartedRef.current = true;
            try {
                if (code && returnedState) {
                    if (!clientStateRef.current) {
                        setError('Missing client state. Try the flow again.');
                        return;
                    }

                    if (returnedState !== clientStateRef.current) {
                        setError('OAuth state mismatch. Please retry.');
                        return;
                    }

                    setLoading(true);
                    const tokens = await getOAuthTokens(code);
                    const meData = await getUserData(tokens);
                    const userId = meData.user.id;

                    await storeDiscordTokens(userId, {
                        accessToken: tokens.access_token,
                        refreshToken: tokens.refresh_token,
                        expiresAt: Date.now() + tokens.expires_in * 1000,
                    });

                    const metadata = { member: 1 };
                    await pushMetadata(userId, tokens, metadata);
                    setSuccess(true);
                    localStorage.removeItem('clientState');
                } else if (!code && !returnedState && !loading && !success && !error) {
                    const { url, state } = getOAuthUrl();
                    localStorage.setItem('clientState', state);
                    clientStateRef.current = state;
                    router.push(url);
                    setLoading(true);
                }
            } catch (e) {
                console.error('Error during Discord OAuth linking:', e);
                setError('Something went wrong linking your Discord account.');
            } finally {
                setLoading(false);
            }
        };

        handleOAuth();
    }, [session, sessionStatus, isMember, code, returnedState, loading, success, error, router]);

    if (!session) {
        return (
            <main className="flex w-full flex-col items-center gap-8 md:gap-16">
                <FancyRectangle colour="purple" offset="8" filled fullWidth>
                    <div className="w-full flex-col gap-4 border-4 border-black bg-white px-4 py-8 text-black md:flex-row md:gap-8 md:p-12">
                        <p className="mb-2">You need to sign in to link your Discord account.</p>
                        <div className="mt-8 flex justify-center text-grey">
                            <Button colour="orange" onClick={() => signIn('keycloak')}>
                                Sign In
                            </Button>
                        </div>
                    </div>
                </FancyRectangle>
            </main>
        );
    }

    if (sessionStatus === 'loading' || isMember === null || loading) {
        return (
            <main className="flex w-full flex-col items-center gap-8 md:gap-16">
                <FancyRectangle colour="purple" offset="8" filled fullWidth>
                    <div className="flex w-full flex-col gap-4 border-4 border-black bg-white px-4 py-8 text-black md:flex-row md:gap-8 md:p-12">
                        <h2 className="text-xl">Loading...</h2>
                    </div>
                </FancyRectangle>
            </main>
        );
    }

    if (error) {
        return <p className="p-4 text-center text-red-600">{error}</p>;
    }

    if (!isMember) {
        return (
            <main className="flex w-full flex-col items-center gap-8 md:gap-16">
                <FancyRectangle colour="purple" offset="8" filled fullWidth>
                    <div className="w-full flex-col gap-4 border-4 border-black bg-white px-4 py-8 text-black md:flex-row md:gap-8 md:p-12">
                        <p>
                            You aren&apos;t currently a CS Club member, so a Discord role
                            wasn&apos;t assigned.
                        </p>
                        <p className="mt-1">
                            Please visit{' '}
                            <Link
                                href="/settings"
                                className="text-orange underline hover:text-orange/80"
                            >
                                settings
                            </Link>{' '}
                            to complete your membership first and unlock Discord role access.
                        </p>
                    </div>
                </FancyRectangle>
            </main>
        );
    }

    if (success) {
        console.log('Discord account oauth successful');
        return (
            <main className="flex w-full flex-col items-center gap-8 md:gap-16">
                <FancyRectangle colour="purple" offset="8" filled fullWidth>
                    <div className="w-full flex-col gap-4 border-4 border-black bg-white px-4 py-8 text-black md:flex-row md:gap-8 md:p-12">
                        <p className="text-green-600">
                            Your Discord account was successfully linked! You can now return to
                            Discord.
                        </p>

                        <Link href="/" className="text-orange underline hover:text-orange/80">
                            Return to home page
                        </Link>
                    </div>
                </FancyRectangle>
            </main>
        );
    }

    return null;
}
