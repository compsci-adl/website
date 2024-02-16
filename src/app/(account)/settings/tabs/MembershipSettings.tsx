import Button from '@/components/Button';
import { fetcher } from '@/lib/fetcher';
import { formatDate } from '@/utils/format-date';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';
import type { PaymentLink } from 'square';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

type MembershipStatus = 'Checking...' | 'Paid' | 'Payment Required';

export default function MembershipSettings() {
    const { user } = useUser();

    const [membershipStatus, setMembershipStatus] = useState<MembershipStatus>('Checking...');
    const [membershipExpirationDate, setMembershipExpirationDate] = useState('');

    useSWR<{ membershipExpiresAt: string }>(
        ['verify-membership-payment', { json: { redirectUrl: window.location.href } }],
        fetcher.put.query,
        {
            onSuccess: (data) => {
                setMembershipStatus('Paid');
                const expirationDate = formatDate(data.membershipExpiresAt);
                setMembershipExpirationDate(expirationDate);
            },
            onError: () => {
                setMembershipStatus('Payment Required');
            },
        }
    );

    const pay = useSWRMutation('payment', fetcher.post.mutate, {
        onSuccess: async (data: PaymentLink) => {
            window.location.href = data.url!;
        },
    });

    const handlePayment = async () => {
        pay.trigger({
            product: 'membership',
            customerId: user!.id,
            redirectUrl: window.location.href,
        });
    };

    return (
        <div>
            {membershipStatus !== null && (
                <div>
                    <h2 className="text-2xl font-bold">
                        Membership Status:{' '}
                        <span
                            className={
                                membershipStatus === 'Payment Required'
                                    ? 'text-orange'
                                    : 'text-grey'
                            }
                        >
                            {membershipStatus}
                        </span>
                    </h2>
                    <div className="mb-6 border-b-2 border-black"></div>
                    {membershipStatus === 'Payment Required' && (
                        <>
                            <p>
                                Finalise your membership by completing the required payment either
                                online below, at a club event, or contact one of the{' '}
                                <Link href="/about" className="underline">
                                    committee members
                                </Link>
                                .
                            </p>
                            <h2 className="mt-8 text-2xl font-bold">Pay Membership Fee</h2>
                            <div className="mb-6 border-b-2 border-black"></div>
                            <Button type="submit" colour="orange" onClick={handlePayment}>
                                Pay Online
                            </Button>
                        </>
                    )}
                    {membershipStatus === 'Paid' && (
                        <p>
                            You are a CS Club member! Your membership expires on{' '}
                            <span className="font-bold">{membershipExpirationDate}</span>.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
