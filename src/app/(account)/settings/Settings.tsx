'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import MembershipSettings from './tabs/MembershipSettings';

export const TAB_NAMES = ['Account', 'Personal Info', 'Membership', 'Notifications'] as const;
export type TabNames = (typeof TAB_NAMES)[number];

const SETTING_TABS = {
    Account: <></>,
    'Personal Info': <></>,
    Membership: <MembershipSettings />,
    Notifications: <></>,
} as const satisfies Record<TabNames, React.ReactNode>;

export default function Settings() {
    const [tab, setTab] = useState<TabNames>('Membership');

    return (
        <>
            <Sidebar currentTab={tab} onTabChange={(tab) => setTab(tab)} />
            <div className="flex w-full">{SETTING_TABS[tab]}</div>
        </>
    );
}
