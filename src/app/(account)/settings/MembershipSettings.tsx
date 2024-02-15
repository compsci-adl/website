import Button from '@/components/Button';
import { useMount } from '@/hooks/use-mount';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';

export default function MembershipSettings({}) {
    const [membershipStatus, setMembershipStatus] = useState('Payment Required');
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
                    setMembershipStatus('Paid');
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
            <div>
                <h2 className="text-2xl font-bold">
                    Membership Status:{' '}
                    <span className={membershipStatus === 'Paid' ? 'text-grey' : 'text-orange'}>
                        {membershipStatus}
                    </span>
                </h2>
                <div className="mb-2 border-b-2 border-black"></div>
                {membershipStatus === 'Payment Required' && (
                    <p>
                        Finalise your membership by completing the required payment either online
                        below, at a club event, or contact one of the{' '}
                        <Link href="/about" className="underline">
                            committee members
                        </Link>
                        .
                    </p>
                )}
                {membershipStatus === 'Paid' && <p>You are a CS Club member!</p>}
            </div>
            <h2 className="text-2xl font-bold">Pay Membership Fee</h2>
            <div className="mb-2 border-b-2 border-black"></div>
            <Button type="submit" colour="orange" onClick={handlePayment}>
                Complete Payment
            </Button>
        </div>
    );
}
