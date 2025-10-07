'use client';

import type { MembershipPayment } from '@/server/verify-membership-payment';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Account from './tabs/AccountSettings';
import MembershipSettings from './tabs/MembershipSettings';
import Notifications from './tabs/NotificationsSettings';
import PersonalInfo from './tabs/PersonalInfoSettings';

export const TAB_NAMES = ['Account', 'Personal Info', 'Membership', 'Notifications'] as const;
export type TabNames = (typeof TAB_NAMES)[number];

export type SettingData = { membershipPayment: MembershipPayment };
export type SettingTabProps = { settingData: SettingData };
type SettingTabComponent = ({ settingData }: SettingTabProps) => React.ReactNode;
const SETTING_TABS = {
    Account: Account,
    'Personal Info': PersonalInfo,
    Membership: MembershipSettings,
    Notifications: Notifications,
} as const satisfies Record<TabNames, SettingTabComponent>;

export default function Settings({ settingData }: { settingData: SettingData }) {
    const [tab, setTab] = useState<TabNames>('Membership');
    const Tab = SETTING_TABS[tab];

    const { refresh } = useRouter();

    return (
        <div className="flex w-full flex-col gap-4 border-4 border-black bg-white px-4 py-8 text-black md:flex-row md:gap-8 md:p-12">
            <Sidebar
                currentTab={tab}
                onTabChange={(tab) => {
                    setTab(tab);
                    refresh();
                }}
            />
            <div className="w-full">
                <Tab settingData={settingData} />
            </div>
        </div>
    );
}
