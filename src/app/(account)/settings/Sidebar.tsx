import SidebarTab from './SidebarTab';

interface SidebarProps {
    selectedTab: string;
    handleTabClick: (tab: string) => void;
}

export default function Sidebar({ selectedTab, handleTabClick }: SidebarProps) {
    return (
        <div className="flex flex-col border-r-2 border-grey pr-4">
            <SidebarTab
                tabName="Account"
                selected={selectedTab === 'account'}
                onClick={() => handleTabClick('account')}
            />
            <SidebarTab
                tabName="Personal Info"
                selected={selectedTab === 'personalInfo'}
                onClick={() => handleTabClick('personalInfo')}
            />
            <SidebarTab
                tabName="Membership"
                selected={selectedTab === 'membership'}
                onClick={() => handleTabClick('membership')}
            />
            <SidebarTab
                tabName="Notifications"
                selected={selectedTab === 'notifications'}
                onClick={() => handleTabClick('notifications')}
            />
        </div>
    );
}
