'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import MembershipSettings from './tabs/MembershipSettings';

export const TAB_NAMES = ['account', 'personalInfo', 'membership', 'notifications'] as const;
export type TabNames = (typeof TAB_NAMES)[number];

const SETTING_TABS = {
    account: <></>,
    personalInfo: <></>,
    membership: <MembershipSettings />,
    notifications: <></>,
} as const satisfies Record<TabNames, React.ReactNode>;

export default function Settings() {
    const [tab, setTab] = useState<TabNames>('membership');

    return (
        <>
            <Sidebar currentTab={tab} onTabChange={(tab) => setTab(tab)} />
            <div className="flex w-full">{SETTING_TABS[tab]}</div>
        </>
    );
}
