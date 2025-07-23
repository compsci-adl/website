import { env } from '@/env.mjs';
import Link from 'next/link';
import type { HeaderData } from '..';

export function MenuLinks({ data, onClick }: { data: HeaderData; onClick?: () => void }) {
    const isMember = data.nextStep === null;
    return (
        <>
            {isMember && (
                <Link
                    href={env.NEXT_PUBLIC_DRIVE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:underline"
                    onClick={onClick}
                >
                    CS Club Drive
                </Link>
            )}
            {isMember && (
                <Link href="/gallery" className="block hover:underline" onClick={onClick}>
                    Photo Gallery
                </Link>
            )}
            {data.isSignedIn && (
                <Link href="/settings" className="block hover:underline" onClick={onClick}>
                    Settings
                </Link>
            )}
            {data.isCommittee && (
                <Link
                    href="https://wiki.csclub.org.au"
                    target="_blank"
                    className="block hover:underline"
                    onClick={onClick}
                >
                    Wiki
                </Link>
            )}
            {data.isAdmin && (
                <Link href="/admin" className="block hover:underline" onClick={onClick}>
                    Admin Panel
                </Link>
            )}
        </>
    );
}

const LINKS = [
    { title: 'About', href: '/about' },
    { title: 'Events', href: '/events' },
    { title: 'Sponsors', href: '/sponsors' },
    { title: 'Open Source', href: '/open-source' },
    { title: 'Contact', href: '/contact' },
];

export function Links({ onClick }: { onClick?: () => void }) {
    return (
        <>
            {LINKS.map((link, i) => (
                <Link href={link.href} className="block hover:underline" onClick={onClick} key={i}>
                    {link.title}
                </Link>
            ))}
        </>
    );
}
