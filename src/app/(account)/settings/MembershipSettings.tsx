import Button from '@/components/Button';
import { useMount } from '@/hooks/use-mount';
import { formatDate } from '@/utils/format-date';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

interface MembershipSettingsProps {
    membershipStatus: string;
    setMembershipStatus: (status: string) => void;
    membershipExpirationDate: string;
    setMembershipExpirationDate: (date: string) => void;
}

export default function MembershipSettings({
    membershipStatus,
    setMembershipStatus,
    membershipExpirationDate,
    setMembershipExpirationDate,
}: MembershipSettingsProps) {
    const { user } = useUser();

    useMount(() => {
        const verifyMembershipPayment = async () => {
            console.log('Verifying membership payment');
            try {
                const response = await fetch('/api/verify-membership-payment', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        redirectUrl: window.location.href,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setMembershipStatus('Paid');
                    const expirationDate = formatDate(data.membershipExpiresAt);
                    setMembershipExpirationDate(expirationDate);
                } else {
                    setMembershipStatus('Payment Required');
                }
            } catch (error) {
                console.error('Error verifying membership payment:', error);
            }
        };

        verifyMembershipPayment();
    });

    const handlePayment = async () => {
        try {
            if (!user || !user.id) {
                console.error('User not authenticated or ID not available');
                return;
            }

            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product: 'membership',
                    customerId: user.id,
                    redirectUrl: window.location.href,
                }),
            });

            if (response.ok) {
                const paymentLink = await response.json();
                window.location.href = paymentLink.url;
            } else {
                console.error('Failed to create payment link');
            }
        } catch (error) {
            console.error('Error creating payment link:', error);
        }
    };

    return (
        <div>
            {membershipStatus !== null && (
                <div>
                    <h2 className=" text-2xl font-bold">
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
