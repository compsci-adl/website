'use client';

import FancyRectangle from '@/components/FancyRectangle';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';

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
        <header className="z-[9999] w-full">
            {/* Drop shadow */}
            <div
                className={`fixed w-full h-60 transition-all duration-500 z-20 ${
                    isScrolled ? 'bg-gradient-to-b from-black from-10% to-transparent to-100%' : ''
                } `}
            ></div>

            <div className="w-full flex justify-center">
                {/* <Image
                        src="/images/logo.png"
                        alt="Computer Science Club Logo"
                        className="z-30 h-28 md:h-36 lg:h-48 w-auto pr-2 md:pr-10 py-4 mt-4 fixed transition-all duration-500"
                        width={300}
                        height={300}
                    /> */}

                <div
                    ref={headerRef}
                    className={`fixed z-[9999] w-responsive flex bg-white mt-8 text-background ${
                        isMenuOpen ? 'px-6 py-6' : 'px-4 py-3'
                    } lg:px-8 md:px-4 lg:py-4 md:py-2 transition-all duration-500 flex flex-col md:flex-row items-center justify-between text-sm lg:text-base border-4 border-black mr-4`}
                >
                    <div>
                        {/* <Image
                            src="/logo/logo-text.svg"
                            alt="Computer Science Club Logo"
                            className=""
                            width={232}
                            height={52}
                        /> */}
                        <h1 className="text-2xl black font-bold">CS CLUB</h1>
                    </div>
                    <div className="flex">
                        {/* Menu Links */}
                        <nav
                            className={`flex flex-col items-center ${
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

                            {/* Sign In and Join Us Buttons */}
                            <div
                                className={`flex flex-col md:flex-row ${
                                    isMenuOpen ? '' : 'hidden'
                                } md:flex md:space-x-4 lg:space-x-8 space-y-4 md:space-y-0`}
                            >
                                <FancyRectangle colour="black" offset="4" filled={true}>
                                    <button className="bg-orange py-2 px-4 md:py-1 md:px-2 lg:py-2 lg:px-6 border-2 border-black font-bold transition-colors duration-300 hover:bg-yellow">
                                        Sign In
                                    </button>
                                </FancyRectangle>
                                <FancyRectangle colour="black" offset="4" filled={true}>
                                    <button className="bg-purple py-2 px-4 md:py-1 md:px-2 lg:py-2 lg:px-6 border-2 border-black font-bold transition-colors duration-300 hover:bg-yellow">
                                        Join Us
                                    </button>
                                </FancyRectangle>
                            </div>
                        </nav>

                        <div className="ml-auto block md:hidden">
                            {/* Hamburger Menu Icon */}
                            <button
                                onClick={toggleMenu}
                                className={`${isMenuOpen ? 'hidden' : ''} `}
                            >
                                <FaBars className="text-xl" aria-label="Menu" />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={`fixed z-[9998] w-responsive h-[3.75em] mt-9 md:mt-10 md:h-14 lg:h-[5.25em] lg:px-8 md:px-4 lg:py-4 md:py-2 transition-all duration-500 bg-purple md:bg-white border-4 border-black`}
                ></div>
            </div>
        </header>
    );
}
