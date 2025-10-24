import { env } from '@/env.mjs';
import Link from 'next/link';
import { IoChevronForward } from 'react-icons/io5';
import type { HeaderData } from '..';

export type MenuLinkType = {
    title: string;
    href: string;
    target?: string;
    rel?: string;
};

export default function MenuLinks({
    data,
    onClick,
    mobile = false,
    links,
}: {
    data: HeaderData;
    onClick?: () => void;
    mobile?: boolean;
    links?: MenuLinkType[];
}) {
    const linkClass = mobile
        ? 'flex items-center justify-between px-4 py-1 font-bold hover:underline'
        : 'block hover:underline';
    const arrow = mobile ? <IoChevronForward size={20} className="ml-2 text-black" /> : null;
    const finalLinks: MenuLinkType[] | undefined =
        links && links.length > 0
            ? links.concat(
                  data.isCommittee
                      ? [
                            {
                                title: 'Committee Wiki',
                                href: 'https://wiki.csclub.org.au',
                                target: '_blank',
                            },
                        ]
                      : []
              )
            : undefined;

    if (finalLinks && finalLinks.length > 0) {
        return (
            <>
                {finalLinks.map((link, i) => (
                    <Link
                        key={i}
                        href={link.href}
                        target={link.target}
                        rel={link.rel}
                        className={linkClass}
                        onClick={onClick}
                    >
                        <span>{link.title}</span>
                        {arrow}
                    </Link>
                ))}
            </>
        );
    }
    const isMember = data.nextStep === null;
    return (
        <>
            {isMember && (
                <Link
                    href={env.NEXT_PUBLIC_DRIVE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                    onClick={onClick}
                >
                    <span>CS Club Drive</span>
                    {arrow}
                </Link>
            )}
            {isMember && (
                <Link href="/gallery" className={linkClass} onClick={onClick}>
                    <span>Photo Gallery</span>
                    {arrow}
                </Link>
            )}
            {data.isSignedIn && (
                <Link href="/settings" className={linkClass} onClick={onClick}>
                    <span>Settings</span>
                    {arrow}
                </Link>
            )}
            {data.isCommittee && (
                <Link
                    href="https://wiki.csclub.org.au"
                    target="_blank"
                    className={linkClass}
                    onClick={onClick}
                >
                    <span>Committee Wiki</span>
                    {arrow}
                </Link>
            )}
            {data.isAdmin && (
                <Link href="/admin" className={linkClass} onClick={onClick}>
                    <span>Admin Panel</span>
                    {arrow}
                </Link>
            )}
        </>
    );
}
