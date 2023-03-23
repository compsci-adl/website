import Link from 'next/link';
import Button from './Button';

export default function Navbar() {
    return (
        <nav
            className="fixed top-10 z-20 flex w-[70rem] items-center justify-between border-primary border-black
            bg-primary-fg py-3 px-7 text-xl shadow-solid"
        >
            <Link className="text-4xl font-bold" href="/">
                CS Club
            </Link>
            <div className="flex flex-row items-center gap-5">
                <Link className="hover:opacity-70 motion-safe:transition-opacity" href="/about">
                    About
                </Link>
                <Link className="hover:opacity-70 motion-safe:transition-opacity" href="/events">
                    Events
                </Link>
                <Link className="hover:opacity-70 motion-safe:transition-opacity" href="/contact">
                    Contact
                </Link>
                <Link className="hover:opacity-70 motion-safe:transition-opacity" href="/sponsors">
                    Sponsors
                </Link>
                <Button className="bg-accent-highlight py-2 px-6 text-2xl font-bold" href="/join">
                    Join Us
                </Button>
            </div>
        </nav>
    );
}
