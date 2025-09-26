import FancyRectangle from '@/components/FancyRectangle';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useOnClickOutside } from 'usehooks-ts';

interface DropdownMenuProps {
    title: string;
    items: { title: string; href: string }[];
    onClick?: () => void;
}

export default function DropdownMenu({ title, items, onClick }: DropdownMenuProps) {
    const [open, setOpen] = useState(false);
    const [canToggle, setCanToggle] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(dropdownRef, () => {
        setOpen(false);
        setCanToggle(false);
        setTimeout(() => setCanToggle(true), 200);
    });
    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!canToggle) return;
        setOpen((prev) => !prev);
        if (open) {
            setCanToggle(false);
            setTimeout(() => setCanToggle(true), 200);
        }
    };
    return (
        <div className="relative">
            <button
                className="flex items-center py-2"
                onClick={handleButtonClick}
                aria-haspopup="menu"
                aria-expanded={open}
            >
                {title}
                <FaChevronDown
                    className={`ml-1 transition-transform ${open ? 'rotate-180' : ''}`}
                />
            </button>
            <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90"
            >
                <div ref={dropdownRef}>
                    <FancyRectangle colour="black" offset="4" filled>
                        <div className="absolute left-0 top-full z-50 w-36 space-y-4 border-4 border-black bg-white p-4">
                            <ul className="flex flex-col">
                                {items.map((item, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href={item.href}
                                            className="block border-b border-grey py-2 last:border-b-0 hover:underline"
                                            onClick={() => {
                                                setOpen(false);
                                                if (onClick) onClick();
                                            }}
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FancyRectangle>
                </div>
            </Transition>
        </div>
    );
}
