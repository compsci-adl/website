import Link from 'next/link';
import Button from './Button';
import { GiHamburgerMenu } from 'react-icons/gi';
import type { ReactNode } from 'react';

type NavLinkProps = {
    href: string;
    children: ReactNode;
};

function NavLink({ href, children }: NavLinkProps) {
    return (
        <li>
            <Link className="hover:opacity-70 motion-safe:transition-opacity" href={href}>
                {children}
            </Link>
        </li>
    );
}

export default function Navbar() {
    return (
        <nav
            className="fixed top-10 z-20 flex w-responsive items-center justify-between border-primary border-black
            bg-primary-fg py-3 px-7 text-xl shadow-solid"
        >
            <Link className="text-2xl font-bold md:text-4xl" href="/">
                CS Club
            </Link>
            <div className="flex flex-row items-center gap-5">
                <ul className="hidden flex-row items-center gap-5 lg:flex">
                    <NavLink href="/about">About</NavLink>
                    <NavLink href="/events">Events</NavLink>
                    <NavLink href="/contact">Contact</NavLink>
                    <NavLink href="/sponsors">Sponsors</NavLink>
                </ul>
                <Button
                    className="hidden bg-accent-highlight py-2 px-6 text-2xl font-bold md:flex"
                    href="/join"
                >
                    Join Us
                </Button>
                <Button
                    className="bg-accent-highlight px-1 py-1 md:px-2 md:py-2 lg:hidden"
                    href="/navigation"
                >
                    <GiHamburgerMenu className="h-6 w-6 text-black md:h-8 md:w-8" />
                </Button>
            </div>
        </nav>
    );
}
