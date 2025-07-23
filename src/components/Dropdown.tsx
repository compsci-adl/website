'use client';

import FancyRectangle from '@/components/FancyRectangle';
import type { Colour } from '@/constants/colours';
import { BG_COLOURS } from '@/constants/colours';
import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface DropdownProps {
    options: { value: number | string; label: string }[];
    value: number | string;
    onChange: (value: number | string) => void;
    colour: Colour;
    className?: string;
    font?: string;
    size?: 'base' | 'small';
    width?: string;
}

const Dropdown = ({
    options,
    value,
    onChange,
    colour,
    className = '',
    font,
    size = 'base',
    width = '',
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => setIsOpen((prev) => !prev);

    const handleSelect = (selectedValue: number | string) => {
        onChange(selectedValue);
        setIsOpen(false);
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectedLabel = options.find((opt) => opt.value === value)?.label ?? '30 Images';

    const openDirection =
        size === 'small' ? 'bottom-full mb-1 origin-bottom' : 'top-full mt-1 origin-top';

    return (
        <div className="relative z-[9999]">
            <FancyRectangle colour="black" offset="4" filled fullWidth>
                <div ref={dropdownRef} className={`relative ${width} ${className}`}>
                    <div
                        onClick={toggleOpen}
                        className={`cursor-pointer border-2 border-black font-bold ${BG_COLOURS[colour]} transition-colors duration-300 hover:bg-yellow ${
                            font ?? 'text-lg md:text-base'
                        } ${size === 'base' ? 'px-16 text-lg' : 'px-4 text-sm'} flex w-full items-center justify-between py-4 pr-10 md:px-2 md:py-1 md:text-base lg:px-6 lg:py-2`}
                    >
                        <span>{selectedLabel}</span>
                        {size !== 'small' && (
                            <FaChevronDown
                                className={`ml-3 text-base text-black transition-transform duration-300 md:text-sm ${
                                    isOpen ? 'rotate-180' : 'rotate-0'
                                }`}
                            />
                        )}
                    </div>

                    <div
                        className={`absolute left-0 z-10 w-full transform border-2 border-black bg-white shadow-md transition-all duration-100 ease-out ${
                            openDirection
                        } ${
                            isOpen
                                ? 'translate-y-0 scale-100 opacity-100'
                                : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
                        }`}
                    >
                        {options.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => handleSelect(opt.value)}
                                className={`px-4 py-2 hover:bg-yellow ${
                                    font ?? 'text-base'
                                } ${opt.value === value ? 'font-bold' : ''}`}
                            >
                                {opt.label}
                            </div>
                        ))}
                    </div>
                </div>
            </FancyRectangle>
        </div>
    );
};

export default Dropdown;
