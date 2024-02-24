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
        <div className="flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-col gap-y-4">
                {TAB_NAMES.map((tab, i) => (
                    <SidebarTab
                        currentTab={currentTab}
                        onTabChange={onTabChange}
                        tabName={tab}
                        key={i}
                    />
                ))}
            </div>
            <div className="my-4 border-b-2 border-grey md:my-0 md:mr-4 md:border-r-2" />
        </div>
    );
}
