interface SidebarTabProps {
    tabName: string;
    selected: boolean;
    onClick: () => void;
}

export default function SidebarTab({ tabName, selected, onClick }: SidebarTabProps) {
    return (
        <button
            className={`py-2 pr-4 text-left ${selected ? 'font-bold' : ''} ${selected ? '' : 'hover:underline'}`}
            onClick={onClick}
            type="button"
        >
            {tabName}
        </button>
    );
}
