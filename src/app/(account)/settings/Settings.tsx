'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import type { SettingData } from './page';
import AccountSettings from './tabs/AccountSettings';
import MembershipSettings from './tabs/MembershipSettings';
import PersonalInfoSettings from './tabs/PersonalInfoSettings';

export const TAB_NAMES = ['Account', 'Personal Info', 'Membership', 'Notifications'] as const;
export type TabNames = (typeof TAB_NAMES)[number];

export type SettingTabProps = { settingData: SettingData };
type SettingTabComponent = ({ settingData }: SettingTabProps) => React.ReactNode;
const SETTING_TABS = {
    Account: AccountSettings,
    'Personal Info': PersonalInfoSettings,
    Membership: MembershipSettings,
    // TODO(#31): Email notifications (enable tab like below)
    // Notifications: NotificationsSettings,
    Notifications: () => <div>Coming soon</div>,
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
