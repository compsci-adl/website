'use client';

import FancyRectangle from '@/components/FancyRectangle';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import Button from './Button';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 0);
    };

    return (
        <header className="z-[9999] w-full">
            <div
                className={`fixed w-full h-60 transition-all duration-500 z-20 ${
                    isScrolled ? 'bg-gradient-to-b from-black from-10% to-transparent to-100%' : ''
                } `}
            ></div>

            <div className="w-full flex justify-center">
                <div
                    ref={headerRef}
                    className={`fixed z-[9999] md:left-auto ${
                        isMenuOpen
                            ? 'bg-white flex-col  w-full h-full'
                            : 'flex-row mt-8 w-responsive'
                    } md:bg-white text-grey lg:px-8 md:px-4 lg:py-4 md:py-2 transition-all duration-500 flex items-center md:justify-between text-sm lg:text-base md:border-4 md:border-black md:mr-4`}
                >
                    <div className={`flex flex-col w-full ${isMenuOpen ? 'px-8 py-8' : ''}`}>
                        <div className="flex flex-row items-center">
                            <a href="/" className="flex flex-row items-center">
                                <Image
                                    src="/logo/logo.svg"
                                    alt="Computer Science Club Logo"
                                    className="w-[3rem] md:w-[1.62rem] lg:w-[2.2rem] h-full"
                                    width={100}
                                    height={100}
                                />
                                <h1
                                    className={`text-3xl md:text-xl lg:text-2xl ml-6 md:ml-4 ${
                                        isMenuOpen ? 'text-grey' : 'text-white'
                                    } md:text-grey font-bold`}
                                >
                                    CS CLUB
                                </h1>
                            </a>

                            <div
                                className={`md:hidden absolute ${
                                    isMenuOpen ? 'right-8' : 'right-0'
                                }`}
                            >
                                <FancyRectangle colour="black" offset="4" filled={true}>
                                    <button
                                        onClick={toggleMenu}
                                        className={`${
                                            isMenuOpen ? 'bg-orange' : 'bg-white'
                                        } w-16 h-16 flex items-center justify-center border-4 border-black transition-all duration-300`}
                                    >
                                        <IoMdMenu
                                            className={`text-4xl text-black ${
                                                isMenuOpen ? 'hidden' : ''
                                            }`}
                                            aria-label="Menu"
                                        />
                                        <IoMdClose
                                            className={`text-4xl text-black ${
                                                isMenuOpen ? '' : 'hidden'
                                            }`}
                                            aria-label="Close"
                                        />
                                    </button>
                                </FancyRectangle>
                            </div>
                        </div>
                        <div
                            className={`md:hidden w-full mt-8 h-0.5 bg-grey ${
                                isMenuOpen ? '' : 'hidden'
                            }`}
                        ></div>
                    </div>

                    <nav
                        className={`flex flex-col items-center ${
                            isMenuOpen ? 'mt-12 space-y-8' : 'hidden'
                        } md:flex md:flex-row md:space-x-4 lg:space-x-8 md:space-y-0 mb-4 md:mb-0 text-4xl md:text-base`}
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
                        <div
                            className={`flex flex-col md:flex-row items-center ${
                                isMenuOpen ? '' : 'hidden'
                            } md:flex md:space-x-4 lg:space-x-8 space-y-8 md:space-y-0`}
                        >
                            <Button colour="orange" href="/sign-in">
                                Sign In
                            </Button>
                            <Button colour="purple" href="/join-us">
                                Join Us
                            </Button>
                        </div>
                    </nav>
                </div>

                <div
                    className={`fixed z-[9998] w-responsive h-[3.75em] mt-9 md:mt-11 lg:mt-10 md:h-14 lg:h-[5.25em] lg:px-8 md:px-4 lg:py-4 md:py-2 transition-all duration-500 md:bg-white md:border-4 md:border-black`}
                ></div>
            </div>
        </header>
    );
}
