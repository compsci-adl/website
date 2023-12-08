'use client';

import { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = (event: MouseEvent) => {
        if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeMenu);

        return () => {
            document.removeEventListener('mousedown', closeMenu);
        };
    }, []);

    return (
        <header
            ref={headerRef}
            className={`bg-white fixed z-20 mt-8 text-background ${
                isMenuOpen ? 'px-6 py-6' : 'px-4 py-3'
            } lg:px-8 md:px-4 lg:py-4 md:py-2 right-16 md:right-24 w-auto md:w-7/12 lg:w-8/12 transition-all duration-500 flex flex-col md:flex-row items-center justify-between text-sm lg:text-base border-2 border-black`}
        >
            {/* Menu Links */}
            <nav
                className={`flex flex-col ${
                    isMenuOpen ? 'space-y-4' : 'hidden'
                } md:flex md:flex-row md:space-x-4 lg:space-x-8 md:space-y-0 mb-4 md:mb-0`}
            >
                <a href="/about" className="hover:underline">
                    About
                </a>
                <a href="/events" className="hover:underline">
                    Events
                </a>
                <a href="/sponsors" className="hover:underline">
                    Sponsors
                </a>
                <a href="/contact" className="hover:underline">
                    Contact
                </a>
            </nav>

            {/* Sign In and Join Us Buttons */}
            <nav
                className={`flex flex-col md:flex-row ${
                    isMenuOpen ? '' : 'hidden'
                } md:block lg:space-x-8 md:space-x-4 md:space-y-0 space-y-4`}
            >
                <button className="bg-orange py-2 px-4 md:py-1 md:px-2 lg:py-2 lg:px-4 border-2 border-black">
                    Sign In
                </button>
                <button className="bg-yellow py-2 px-4 md:py-1 md:px-2 lg:py-2 lg:px-4 border-2 border-black">
                    Join Us
                </button>
            </nav>

            <div className="ml-auto block md:hidden">
                {/* Hamburger Menu Icon */}
                <button onClick={toggleMenu} className={`${isMenuOpen ? 'hidden' : ''} `}>
                    <FaBars className="text-xl" aria-label="Menu" />
                </button>
            </div>
        </header>
    );
}
