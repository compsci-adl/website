import LINKS from '@/constants/links';
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';

export type HeaderDropdownLink = {
    title: string;
    href: string;
    target?: string;
    rel?: string;
};

export default function HeaderLinks({
    onClick,
    dropdownLinks,
}: {
    onClick?: () => void;
    dropdownLinks?: HeaderDropdownLink[];
}) {
    return (
        <nav className="flex gap-4">
            {LINKS.map((link, i) =>
                link.dropdown ? (
                    <DropdownMenu
                        key={i}
                        title={link.title}
                        items={link.dropdown
                            .filter((item) => typeof item.href === 'string')
                            .map((item) => ({
                                title: item.title,
                                href: item.href as string,
                            }))}
                        onClick={onClick}
                    />
                ) : (
                    <Link
                        href={link.href ?? '#'}
                        className="py-2 hover:underline"
                        onClick={onClick}
                        key={i}
                    >
                        {link.title}
                    </Link>
                )
            )}
            {dropdownLinks && dropdownLinks.length > 0 && (
                <DropdownMenu title="Member Links" items={dropdownLinks} onClick={onClick} />
            )}
        </nav>
    );
}
