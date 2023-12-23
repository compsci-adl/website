'use client';

import { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import FancyRectangle from './FancyRectangle';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);

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
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', closeMenu);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    return (
        <header className="w-auto h-auto relative font-archivo">
            <div
                className={`fixed w-full h-72 transition-all duration-500 z-20 ${
                    isScrolled ? 'bg-gradient-to-b from-black from-10% to-transparent to-100%' : ''
                } `}
            ></div>
            <div
                className={`fixed w-[3.75em] h-[3.75em] mt-9 md:mt-10 md:h-14 lg:h-[5.25em] mr-2 right-6 md:right-[5.5em] lg:right-[8.5em] md:w-7/12 lg:w-[62%] transition-all duration-500 bg-purple md:bg-white border-4 border-black z-20`}
            ></div>
            <div
                ref={headerRef}
                className={`bg-white fixed z-30 mt-8 text-background ${
                    isMenuOpen ? 'px-6 py-6' : 'px-4 py-3'
                }  md:px-4 lg:px-8 md:py-2 lg:py-4 right-8 md:right-24 lg:right-36 w-auto md:w-7/12 lg:w-[62%] transition-all duration-500 flex flex-col md:flex-row items-center justify-between text-sm lg:text-base border-4 border-black mr-2`}
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
                    } md:flex md:space-x-4 lg:space-x-8 space-y-4 md:space-y-0`}
                >
                    <FancyRectangle colour="black" offset="4" filled={true}>
                        <a
                            href="/sign-in"
                            className="block bg-orange py-2 px-4 md:py-1 md:px-2 lg:py-2 lg:px-6 border-2 border-black font-bold transition-colors duration-300 hover:bg-yellow"
                        >
                            Sign In
                        </a>
                    </FancyRectangle>
                    <FancyRectangle colour="black" offset="4" filled={true}>
                        <a
                            href="/join-us"
                            className="block bg-purple py-2 px-4 md:py-1 md:px-2 lg:py-2 lg:px-6 border-2 border-black font-bold transition-colors duration-300 hover:bg-yellow"
                        >
                            Join Us
                        </a>
                    </FancyRectangle>
                </nav>
                <div className="ml-auto block md:hidden">
                    {/* Hamburger Menu Icon */}
                    <button onClick={toggleMenu} className={`${isMenuOpen ? 'hidden' : ''} `}>
                        <FaBars className="text-xl" aria-label="Menu" />
                    </button>
                </div>
            </div>
        </header>
    );
}
