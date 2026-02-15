import Button from '@/components/Button';
import { fetcher } from '@/lib/fetcher';
import { formatDate } from '@/utils/format-date';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import type { PaymentLink } from 'square';
import useSWRMutation from 'swr/mutation';
import type { SettingTabProps } from '../Settings';

export default function MembershipSettings({
    settingData: { membershipPayment: payment },
}: SettingTabProps) {
    const { data: session } = useSession();

    const pay = useSWRMutation('payment', fetcher.post.mutate, {
        onSuccess: async (data: PaymentLink) => {
            window.location.href = data.url!;
        },
    });

    const handlePayment = async () => {
        pay.trigger({
            product: 'membership',
            customerId: session?.user!.id,
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
                        . Membership for {new Date().getFullYear()} will expire on{' '}
                        <span className="font-bold">
                            {formatDate(new Date(new Date().getFullYear() + 1, 0, 1))}
                        </span>
                        .
                        <br />
                        <br />
                        <span className="font-bold">Note:</span> As AUSA is now managing club
                        memberships, we are currently waiting for their new sign-up system to be
                        finalised. You will be required to register through their platform at a
                        later date, we want to assure you that all existing membership payments for
                        this year will be transferred over.
                    </p>
                    <h2 className="mt-8 text-2xl font-bold">Pay Membership Fee</h2>
                    <div className="mb-6 border-b-2 border-black" />
                    <Button
                        type="submit"
                        colour="orange"
                        onClick={handlePayment}
                        width="w-full md:w-42"
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
