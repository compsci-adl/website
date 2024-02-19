'use client';

import { useClerk } from '@clerk/clerk-react';
import Link from 'next/link';
import { useState } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import type { HeaderData } from '.';
import FancyRectangle from '../FancyRectangle';
import { Links, MenuLinks } from './components/Links';
import LogoTitle from './components/LogoTitle';
import ScrollShader from './components/ScrollShader';
import { SignInJoinMobile } from './components/SignInJoin';

export default function HeaderMobileClient({
    data,
    className,
}: {
    data: HeaderData;
    className?: string;
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const { signOut } = useClerk();
    const handleSignOut = async () => {
        await signOut();
        setIsMenuOpen(false);
    };

    return (
        <div
            className={`${className} fixed z-[9999] w-full transition-all ${isMenuOpen ? 'h-full bg-white/95' : ''}`}
        >
            <ScrollShader className={isMenuOpen ? 'hidden' : ''} />
            <div
                className={`mx-auto mt-8 transition-all ${isMenuOpen ? 'w-[90vw]' : 'w-responsive'}`}
            >
                <div className="flex">
                    <LogoTitle
                        titleColor={isMenuOpen ? 'text-grey' : 'text-white'}
                        className="grow"
                        onClick={closeMenu}
                    />
                    <FancyRectangle colour="black" offset="4" filled>
                        <button
                            onClick={toggleMenu}
                            className={`${
                                isMenuOpen ? 'bg-orange' : 'bg-white'
                            } relative flex h-16 w-16 items-center justify-center border-4 border-black text-4xl text-black transition-all duration-300`}
                        >
                            {isMenuOpen ? (
                                <IoMdClose aria-label="Close" />
                            ) : (
                                <IoMdMenu aria-label="Menu" />
                            )}
                            {data.isSignedIn && data.nextStep !== null && !isMenuOpen && (
                                <span className="absolute -right-2 -top-2 z-50 flex h-3 w-3">
                                    <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                                    <div className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
                                </span>
                            )}
                        </button>
                    </FancyRectangle>
                </div>
                {isMenuOpen && (
                    <>
                        <div className="mt-8 h-0.5 w-full bg-grey" />
                        <div className="mt-12 flex flex-col items-center gap-8 text-4xl text-grey">
                            <Links onClick={closeMenu} />
                            <div className="mt-4 h-0.5 w-full bg-grey" />
                            {data.isSignedIn && data.nextStep === 'signup' && (
                                <Link
                                    href="/join"
                                    className="block font-bold underline"
                                    onClick={closeMenu}
                                >
                                    Continue Signing Up
                                </Link>
                            )}
                            {data.isSignedIn && data.nextStep === 'payment' && (
                                <Link
                                    href="/settings"
                                    className="block font-bold underline"
                                    onClick={closeMenu}
                                >
                                    Continue to payment
                                </Link>
                            )}

                            <MenuLinks data={data} onClick={closeMenu} />

                            {/* Links for sign up, sign in, sign out */}
                            {!data.isSignedIn && (
                                <SignInJoinMobile
                                    className="block hover:underline"
                                    onClick={closeMenu}
                                />
                            )}
                            {data.isSignedIn && (
                                <Link
                                    href="/"
                                    className="block hover:underline"
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </Link>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
