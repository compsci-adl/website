import Button from '@/components/Button';
import { fetcher } from '@/lib/fetcher';
import { formatDate } from '@/utils/format-date';
import { useUser } from '@clerk/clerk-react';
import Link from 'next/link';
import type { PaymentLink } from 'square';
import useSWRMutation from 'swr/mutation';
import type { SettingTabProps } from '../Settings';

export default function MembershipSettings({
    settingData: { membershipPayment: payment },
}: SettingTabProps) {
    const { user } = useUser();

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
            <h2 className="text-2xl font-bold">
                Membership Status:{' '}
                <span className={payment.paid ? 'text-orange' : 'text-grey'}>
                    {payment.paid ? 'Paid' : 'Payment Required'}
                </span>
            </h2>
            <div className="mb-6 border-b-2 border-black" />
            {payment.paid ? (
                <p>
                    You are a CS Club member! Your membership expires on{' '}
                    <span className="font-bold">{formatDate(payment.membershipExpiresAt)}</span>.
                </p>
            ) : (
                <>
                    <p>
                        Finalise your membership by completing the required payment either online
                        below, at a club event, or contact one of the{' '}
                        <Link href="/about" className="underline">
                            committee members
                        </Link>
                        .
                    </p>
                    <h2 className="mt-8 text-2xl font-bold">Pay Membership Fee</h2>
                    <div className="mb-6 border-b-2 border-black" />
                    <Button
                        type="submit"
                        colour="orange"
                        onClick={handlePayment}
                        width="w-full"
                        size="small"
                        loading={pay.isMutating}
                    >
                        Pay Online
                    </Button>
                </>
            )}
        </div>
    );
}
