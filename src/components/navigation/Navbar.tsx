import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';

import LinkButton from '@/components/LinkButton';
import NavLinks from './NavLinks';

export default function Navbar() {
    return (
        <nav
            className="fixed top-7 z-[9999] flex w-responsive items-center justify-between border-primary border-black
            bg-primary-fg px-7 py-3 text-xl shadow-solid"
        >
            <Link className="text-3xl font-bold leading-[0] md:text-4xl" href="/">
                CS Club
            </Link>
            <div className="flex flex-row items-center gap-5">
                <NavLinks className="hidden flex-row items-center gap-5 lg:flex" />
                <LinkButton
                    className="bg-accent-highlight px-5 py-2 text-2xl font-bold max-md:hidden"
                    href="/join"
                >
                    Join Us
                </LinkButton>
                <LinkButton
                    className="bg-accent-highlight px-1 py-1 md:px-2 md:py-2 lg:hidden"
                    href="/navigation"
                    smallShadow
                    aria-label="Navigation dropdown menu"
                >
                    <GiHamburgerMenu className="h-6 w-6 text-black md:h-8 md:w-8" />
                </LinkButton>
            </div>
        </nav>
    );
}
