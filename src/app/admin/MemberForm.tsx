'use client';

import Autocomplete from '@/components/Autocomplete';
import { fetcher } from '@/lib/fetcher';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import type { Member } from './page';

const getMemberStr = (member: Member) => `${member.email} - ${member.firstName} ${member.lastName}`;

function MemberDetail({ member }: { member: Member }) {
    const [payment, setPayment] = useState(member.paid);
    useEffect(() => {
        setPayment(member.paid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [member.id]);

    const router = useRouter();
    const updatePayment = useSWRMutation('payment', fetcher.put.mutate, {
        onSuccess: () => {
            setPayment(!payment);
            router.refresh();
        },
    });
    const handlePaymentChange = () => {
        updatePayment.trigger({ id: member.id, paid: !payment });
    };

    const { paid, ...details } = member;
    return (
        <table className="relative [&>tbody>*>*]:border [&>tbody>*>*]:border-grey [&>tbody>*>*]:px-4 [&>tbody>*>*]:py-2">
            <tbody>
                {Object.entries(details).map(([key, value]) => (
                    <tr key={key}>
                        <td className="font-bold capitalize">{key}</td>
                        <td>{value as React.ReactNode}</td>
                    </tr>
                ))}
                <tr>
                    <td className="font-bold">Payment</td>
                    <td>
                        <input
                            type="checkbox"
                            checked={payment}
                            onChange={handlePaymentChange}
                            disabled={updatePayment.isMutating}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default function MemberForm({ members }: { members: Member[] }) {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    return (
        <div className="w-full space-y-4">
            <Autocomplete
                options={members}
                value={selectedMember}
                onChange={setSelectedMember}
                displayOptionStr={getMemberStr}
                placeholder="Search for a member by email or name..."
                notFoundMessage="No members found"
            />
            <div className="flex justify-center">
                {selectedMember ? (
                    <MemberDetail member={selectedMember} />
                ) : (
                    <div className="py-24 text-center text-4xl">
                        Search a member to view details
                    </div>
                )}
            </div>
        </div>
    );
}
