import { env } from '@/env.mjs';
import Link from 'next/link';
import type { HeaderData } from '..';

export default function MenuLinks({ data, onClick }: { data: HeaderData; onClick?: () => void }) {
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
