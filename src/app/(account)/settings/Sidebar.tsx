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
            className={`py-2 pr-4 text-left ${selected ? 'font-bold' : ''} ${selected ? '' : 'hover:underline'}`}
            onClick={() => onTabChange(tabName)}
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
        <div className="flex flex-col border-r-2 border-grey pr-4">
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
