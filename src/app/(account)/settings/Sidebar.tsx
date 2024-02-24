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
            className={`text-nowrap text-xl md:text-base ${selected ? 'cursor-default font-bold' : 'hover:underline'}`}
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
    className?: string;
}

export default function Sidebar({ currentTab, onTabChange, className }: SidebarProps) {
    return (
        <div
            className={`${className} flex flex-col items-center gap-4 overflow-y-scroll border-2 border-grey p-2 md:items-end md:overflow-visible md:border-y-0 md:border-l-0 md:border-r-2 md:py-0 md:pl-0 md:pr-8`}
        >
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
