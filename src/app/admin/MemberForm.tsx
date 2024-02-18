'use client';

import Autocomplete from '@/components/Autocomplete';
import { fetcher } from '@/lib/fetcher';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import type { Member } from './page';

const getMemberStr = (member: Member) => `${member.email} - ${member.firstName} ${member.lastName}`;

function MemberDetail({ member }: { member: Member }) {
    const { paid, ...details } = member;

    const [payment, setPayment] = useState(member.paid);
    const updatePayment = useSWRMutation('payment', fetcher.put.mutate, {
        onSuccess: () => {
            setPayment(!payment);
        },
    });
    const handlePaymentChange = () => {
        updatePayment.trigger({ id: member.id, paid: !payment });
    };

    return (
        <table className="relative [&>tbody>*>*]:border [&>tbody>*>*]:border-grey [&>tbody>*>*]:px-4 [&>tbody>*>*]:py-2">
            <tbody>
                {Object.entries(details).map(([key, value]) => (
                    <tr key={key}>
                        <td className="font-bold capitalize">{key}</td>
                        <td>{value}</td>
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
