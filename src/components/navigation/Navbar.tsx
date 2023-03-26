import Link from 'next/link';
import Button from '@/components/Button';
import { GiHamburgerMenu } from 'react-icons/gi';
import NavLinks from './NavLinks';

export default function Navbar() {
    return (
        <nav
            className="fixed top-10 z-20 flex w-responsive items-center justify-between border-primary border-black
            bg-primary-fg py-3 px-7 text-xl shadow-solid"
        >
            <Link className="text-3xl font-bold leading-[0] md:text-4xl" href="/">
                CS Club
            </Link>
            <div className="flex flex-row items-center gap-5">
                <NavLinks className="hidden flex-row items-center gap-5 lg:flex" />
                <Button
                    className="bg-accent-highlight py-2 px-6 text-2xl font-bold max-md:hidden"
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
