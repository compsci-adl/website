import Link from 'next/link';
import type { ReactNode } from 'react';

type NavLinkProps = {
    href: string;
    children: ReactNode;
};

type NavLinksProps = {
    className?: string;
};

export function NavLink({ href, children }: NavLinkProps) {
    return (
        <li>
            <Link
                className="hover:opacity-70 motion-safe:transition-opacity"
                href={{ pathname: href }}
            >
                {children}
            </Link>
        </li>
    );
}

export default function NavLinks({ className }: NavLinksProps) {
    return (
        <ul className={className}>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="/sponsors">Sponsors</NavLink>
        </ul>
    );
}
