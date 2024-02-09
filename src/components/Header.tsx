'use client';

import FancyRectangle from '@/components/FancyRectangle';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import Button from './Button';
import UserButton from './UserButton';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isSignedIn } = useUser();

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
                className={`fixed z-20 h-40 w-full transition-all duration-500 ${
                    isScrolled ? 'bg-gradient-to-b from-black from-10% to-transparent to-100%' : ''
                } `}
            ></div>

            <div className="flex w-full justify-center">
                <div
                    ref={headerRef}
                    className={`fixed z-[9999] md:left-auto ${
                        isMenuOpen
                            ? 'h-full w-full  flex-col bg-white'
                            : 'mt-8 w-responsive flex-row'
                    } flex items-center text-sm text-grey transition-all duration-500 md:mr-4 md:justify-between md:border-4 md:border-black md:bg-white md:px-4 md:py-2 lg:px-8 lg:py-4 lg:text-base`}
                >
                    <div className={`flex w-full flex-col ${isMenuOpen ? 'px-8 py-8' : ''}`}>
                        <div className="flex flex-row items-center">
                            <Link href="/" className="flex flex-row items-center">
                                <Image
                                    src="/images/logos/logo.svg"
                                    alt="Computer Science Club Logo"
                                    className="h-full w-[3rem] md:w-[1.62rem] lg:w-[2.2rem]"
                                    width={100}
                                    height={100}
                                />
                                <h1
                                    className={`ml-6 text-3xl md:ml-4 md:text-xl lg:text-2xl ${
                                        isMenuOpen ? 'text-grey' : 'text-white'
                                    } font-bold md:text-grey`}
                                >
                                    CS CLUB
                                </h1>
                            </Link>

                            <div
                                className={`absolute md:hidden ${
                                    isMenuOpen ? 'right-8' : 'right-0'
                                }`}
                            >
                                <FancyRectangle colour="black" offset="4" filled={true}>
                                    <button
                                        onClick={toggleMenu}
                                        className={`${
                                            isMenuOpen ? 'bg-orange' : 'bg-white'
                                        } flex h-16 w-16 items-center justify-center border-4 border-black transition-all duration-300`}
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
                            className={`mt-8 h-0.5 w-full bg-grey md:hidden ${
                                isMenuOpen ? '' : 'hidden'
                            }`}
                        ></div>
                    </div>

                    <nav
                        className={`flex flex-col items-center whitespace-nowrap ${
                            isMenuOpen ? 'mt-12 space-y-8' : 'hidden'
                        } mb-4 text-4xl md:mb-0 md:flex md:flex-row md:space-x-4 md:space-y-0 md:text-base lg:space-x-8`}
                    >
                        <Link href="/about" className="hover:underline">
                            About Us
                        </Link>
                        <Link href="/events" className="hover:underline">
                            Events
                        </Link>
                        <Link href="/sponsors" className="hover:underline">
                            Sponsors
                        </Link>
                        <Link href="/contact" className="hover:underline">
                            Contact
                        </Link>
                        <div
                            className={`flex flex-col items-center md:flex-row ${
                                isMenuOpen ? '' : 'hidden'
                            } space-y-8 md:flex md:space-x-4 md:space-y-0 lg:space-x-8`}
                        >
                            {isSignedIn ? (
                                <>
                                    <Button colour="purple" href="/join">
                                        Continue Signing Up
                                    </Button>
                                    <UserButton />
                                </>
                            ) : (
                                <>
                                    <Button colour="orange" href="/signin">
                                        Sign In
                                    </Button>
                                    <Button colour="purple" href="/join">
                                        Join Us
                                    </Button>
                                </>
                            )}
                        </div>
                    </nav>
                </div>

                <div
                    className={`fixed z-[9998] mt-9 h-[3.75em] w-responsive transition-all duration-500 md:mt-11 md:h-14 md:border-4 md:border-black md:bg-white md:px-4 md:py-2 lg:mt-10 lg:h-[5.25em] lg:px-8 lg:py-4`}
                ></div>
            </div>
        </header>
    );
}
