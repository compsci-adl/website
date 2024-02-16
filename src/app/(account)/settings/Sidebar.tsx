import SidebarTab from './SidebarTab';

interface SidebarProps {
    selectedTab: string;
    handleTabClick: (tab: string) => void;
}

export default function Sidebar({ selectedTab, handleTabClick }: SidebarProps) {
    return (
        <div className="flex flex-col border-r-2 border-grey pr-4">
            {/* TODO: Implement account settings */}
            {/* <SidebarTab
                tabName="Account"
                selected={selectedTab === 'account'}
                onClick={() => handleTabClick('account')}
            /> */}
            {/* TODO: Implement personal info settings */}
            {/* <SidebarTab
                tabName="Personal Info"
                selected={selectedTab === 'personalInfo'}
                onClick={() => handleTabClick('personalInfo')}
            /> */}
            <SidebarTab
                tabName="Membership"
                selected={selectedTab === 'membership'}
                onClick={() => handleTabClick('membership')}
            />
            {/* TODO: Implement email notification settings */}
            {/* <SidebarTab
                tabName="Notifications"
                selected={selectedTab === 'notifications'}
                onClick={() => handleTabClick('notifications')}
            /> */}
        </div>
    );
}
