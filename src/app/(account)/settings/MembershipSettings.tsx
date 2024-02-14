import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function MembershipSettings() {
    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold">
                    Membership Status: <span className="text-orange">Payment Required</span>
                </h2>
                <div className="mb-2 border-b-2 border-black"></div>
                {/* TODO: Check Membership status and display relevant message */}
                <p>
                    Finalise your membership by completing the required payment either online below,
                    at a club event, or contact one of the{' '}
                    <Link href="/about" className="underline">
                        committee members
                    </Link>
                    .
                </p>
            </div>
            <h2>Pay Membership Fee</h2>
        </div>
    );
}
