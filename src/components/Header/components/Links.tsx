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
            {data.isSignedIn && (
                <Link href="/settings" className="block hover:underline" onClick={onClick}>
                    Settings
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

const LINKS = ['about', 'events', 'sponsors', 'contact', 'open source'];
export function Links({ onClick }: { onClick?: () => void }) {
    return (
        <>
            {LINKS.map((link, i) => (
                <Link
                    href={link === 'open source' ? '/open-source' : `/${link}`}
                    className="block capitalize hover:underline"
                    onClick={onClick}
                    key={i}
                >
                    {link}
                </Link>
            ))}
        </>
    );
}
