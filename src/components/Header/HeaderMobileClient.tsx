'use client';

import LINKS from '@/constants/links';
import type { LinkType } from '@/constants/links';
import { logout } from '@/lib/actions';
import Link from 'next/link';
import { useState } from 'react';
import {
    FaUserPlus,
    FaCreditCard,
    FaSignOutAlt,
    FaSignInAlt,
    FaUserCheck,
    FaTimes,
} from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import { IoChevronForward } from 'react-icons/io5';
import type { HeaderData } from '.';
import Button from '../Button';
import FancyRectangle from '../FancyRectangle';
import LogoTitle from './components/LogoTitle';
import MenuLinks from './components/MenuLinks';
import type { MenuLinkType } from './components/MenuLinks';
import MobileDropdownMenu from './components/MobileDropdownMenu';
import ScrollShader from './components/ScrollShader';

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
    const handleSignOut = async () => {
        await logout();
        setIsMenuOpen(false);
    };
    const userExists = data.nextStep !== 'signup';
    const isMember = data.nextStep === null;
    // Runtime checks for conditional links
    const isSignedIn = data.isSignedIn;
    const isAdmin = data.isAdmin;
    const conditionalLinks: MenuLinkType[] = [
        ...(isSignedIn ? [{ title: 'Settings', href: '/settings' }] : []),
        ...(isAdmin ? [{ title: 'Admin Panel', href: '/admin' }] : []),
    ];
    const memberLinks = [
        ...(isMember
            ? [
                  {
                      title: 'CS Club Drive',
                      href: process.env.NEXT_PUBLIC_DRIVE_LINK ?? '',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                  },
                  { title: 'Photo Gallery', href: '/gallery' },
              ]
            : []),
    ];

    let actionCount = 0;
    if (!data.isSignedIn) {
        actionCount = 3;
    } else if (data.nextStep === 'signup' || data.nextStep === 'payment') {
        actionCount = 3;
    } else {
        actionCount = 2;
    }
    const actionPadding = actionCount === 2 ? 'px-[3rem]' : 'px-[2rem]';
    return (
        <div className={`${className} fixed z-[9999] w-full`}>
            <ScrollShader className={isMenuOpen ? 'hidden' : ''} />
            <div className="mx-auto mt-8 w-responsive">
                <div className="flex">
                    <LogoTitle titleColor="text-white" className="grow" onClick={closeMenu} />
                    <FancyRectangle colour="black" offset="4" filled>
                        <button
                            onClick={toggleMenu}
                            className="relative flex h-16 w-16 items-center justify-center border-4 border-black bg-white text-4xl text-black transition-all duration-300"
                        >
                            <IoMdMenu aria-label="Menu" />
                            {data.isSignedIn && data.nextStep !== null && !isMenuOpen && (
                                <span className="absolute -right-2 -top-2 z-50 flex h-3 w-3">
                                    <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                                    <div className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
                                </span>
                            )}
                        </button>
                    </FancyRectangle>
                </div>
            </div>
            <div
                className={`fixed inset-0 z-[9998] transition-all duration-300 ${isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} bg-black/60`}
                onClick={closeMenu}
            >
                <div
                    className={`fixed bottom-0 left-0 z-[9999] flex max-h-[80vh] w-full transform flex-col border-t-4 border-black bg-white shadow-2xl transition-all duration-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <nav className="flex flex-col gap-2 overflow-y-auto p-6 text-lg text-black">
                        {LINKS.map((link: LinkType, i: number) =>
                            link.dropdown ? (
                                <MobileDropdownMenu
                                    key={i}
                                    title={link.title}
                                    items={link.dropdown
                                        .filter((item) => typeof item.href === 'string')
                                        .map((item) => ({
                                            title: item.title,
                                            href: item.href as string,
                                        }))}
                                    onClick={closeMenu}
                                />
                            ) : (
                                typeof link.href === 'string' && (
                                    <Link
                                        key={i}
                                        href={link.href}
                                        className="flex items-center justify-between px-4 py-1 font-bold hover:underline"
                                        onClick={closeMenu}
                                    >
                                        <span>{link.title}</span>
                                        <IoChevronForward size={20} className="text-black" />
                                    </Link>
                                )
                            )
                        )}
                        {memberLinks.length > 0 && (
                            <MobileDropdownMenu
                                title="Member Links"
                                items={memberLinks}
                                onClick={closeMenu}
                            />
                        )}
                        <div className="my-4 h-0.5 w-full bg-grey" />
                        {data.isSignedIn && userExists && (
                            <>
                                <MenuLinks
                                    data={data}
                                    onClick={closeMenu}
                                    mobile={true}
                                    links={conditionalLinks}
                                />
                                <div className="my-4 h-0.5 w-full bg-grey" />
                            </>
                        )}

                        {/* Auth and action icons horizontal row */}
                        <div className="flex w-full items-center justify-between gap-4 px-4 py-2">
                            {!data.isSignedIn && (
                                <>
                                    <div className="flex w-full flex-col items-center md:flex-row md:items-end">
                                        <Button
                                            colour="orange"
                                            size="small"
                                            className={`${actionPadding} py-2`}
                                            onClick={() => {
                                                import('next-auth/react').then((mod) => {
                                                    mod.signIn('keycloak');
                                                    closeMenu();
                                                });
                                            }}
                                        >
                                            <FaSignInAlt className="text-2xl" />
                                        </Button>
                                        <span className="mt-1 font-bold text-black md:ml-4 md:mt-0 md:py-1">
                                            Sign In
                                        </span>
                                    </div>
                                    <div className="flex w-full flex-col items-center md:flex-row md:items-end">
                                        <Button
                                            colour="orange"
                                            size="small"
                                            className={`${actionPadding} py-2`}
                                            href="/join"
                                            onClick={closeMenu}
                                        >
                                            <FaUserCheck className="text-2xl" />
                                        </Button>
                                        <span className="mt-1 font-bold text-black md:ml-4 md:mt-0 md:py-1">
                                            Join Us
                                        </span>
                                    </div>
                                </>
                            )}
                            {data.isSignedIn && data.nextStep === 'signup' && (
                                <div className="flex w-full flex-col items-center md:flex-row md:items-end">
                                    <Button
                                        colour="orange"
                                        size="small"
                                        className={`${actionPadding} py-2`}
                                        href="/join"
                                        onClick={closeMenu}
                                    >
                                        <FaUserPlus className="text-2xl" />
                                    </Button>
                                    <span className="mt-1 font-bold text-black md:ml-4 md:mt-0 md:py-1">
                                        Continue
                                    </span>
                                </div>
                            )}
                            {data.isSignedIn && data.nextStep === 'payment' && (
                                <div className="flex w-full flex-col items-center md:flex-row md:items-end">
                                    <Button
                                        colour="orange"
                                        size="small"
                                        className={`${actionPadding} py-2`}
                                        href="/settings"
                                        onClick={closeMenu}
                                    >
                                        <FaCreditCard className="text-2xl" />
                                    </Button>
                                    <span className="mt-1 font-bold text-black md:ml-4 md:mt-0 md:py-1">
                                        Payment
                                    </span>
                                </div>
                            )}
                            {data.isSignedIn && (
                                <div className="flex w-full flex-col items-center md:flex-row md:items-end">
                                    <Button
                                        colour="orange"
                                        size="small"
                                        className={`${actionPadding} py-2`}
                                        onClick={handleSignOut}
                                    >
                                        <FaSignOutAlt className="text-2xl" />
                                    </Button>
                                    <span className="mt-1 font-bold text-black md:ml-4 md:mt-0 md:py-1">
                                        Sign Out
                                    </span>
                                </div>
                            )}
                            <div className="flex w-full flex-col items-center md:flex-row md:items-end">
                                <Button
                                    colour="purple"
                                    size="small"
                                    className={`${actionPadding} py-2`}
                                    onClick={closeMenu}
                                >
                                    <FaTimes className="text-2xl" />
                                </Button>
                                <span className="mt-1 font-bold text-black md:ml-4 md:mt-0 md:py-1">
                                    Close
                                </span>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
