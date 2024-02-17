import { TAB_NAMES, type TabNames } from './Settings';

interface SidebarTabProps {
    tabName: TabNames;
    currentTab: TabNames;
    onTabChange: (tab: TabNames) => void;
}

function SidebarTab({ tabName, currentTab, onTabChange }: SidebarTabProps) {
    const selected = currentTab === tabName;
    return (
        <button
            className={`text-left ${selected ? 'cursor-default font-bold' : 'hover:underline'}`}
            onClick={() => {
                if (!selected) {
                    onTabChange(tabName);
                }
            }}
        >
            {tabName}
        </button>
    );
}

interface SidebarProps {
    currentTab: TabNames;
    onTabChange: (tab: TabNames) => void;
}

export default function Sidebar({ currentTab, onTabChange }: SidebarProps) {
    return (
        <div className="flex w-48 flex-col space-y-4 border-r-2 border-grey">
            {TAB_NAMES.map((tab, i) => (
                <SidebarTab
                    currentTab={currentTab}
                    onTabChange={onTabChange}
                    tabName={tab}
                    key={i}
                />
            ))}
        </div>
    );
}
