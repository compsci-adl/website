import Link from 'next/link';
import { useState } from 'react';
import { IoChevronForward, IoChevronBack } from 'react-icons/io5';

export type MobileDropdownMenuProps = {
    title: string;
    items: { title: string; href: string }[];
    onClick?: () => void;
};

export default function MobileDropdownMenu({ title, items, onClick }: MobileDropdownMenuProps) {
    const [submenuOpen, setSubmenuOpen] = useState(false);
    return (
        <>
            <button
                className="flex w-full items-center justify-between px-4 py-1 font-bold hover:underline"
                onClick={() => setSubmenuOpen(true)}
                aria-haspopup="menu"
                aria-expanded={submenuOpen}
            >
                {title}
                <span className="ml-2 transition-transform">
                    <IoChevronForward size={20} />
                </span>
            </button>
            <div
                className={`fixed inset-0 z-[99999] flex items-end transition-all duration-300 ${submenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} bg-black/40`}
                onClick={() => setSubmenuOpen(false)}
            >
                <div
                    className={`w-full transform border-t-4 border-black bg-white p-6 shadow-2xl transition-all duration-300 ${submenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="mb-4 flex items-center gap-2 px-3 text-base font-bold text-black hover:underline"
                        onClick={() => setSubmenuOpen(false)}
                    >
                        <IoChevronBack size={20} />
                        Back
                    </button>
                    <ul>
                        {items.map((item, idx) => (
                            <li key={idx}>
                                <Link
                                    href={item.href}
                                    className="flex items-center justify-between px-4 py-3 font-semibold hover:underline"
                                    onClick={() => {
                                        setSubmenuOpen(false);
                                        if (onClick) onClick();
                                    }}
                                >
                                    <span>{item.title}</span>
                                    <IoChevronForward size={20} className="text-black" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
