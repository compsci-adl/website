import LINKS from '@/constants/links';
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';

export default function HeaderLinks({ onClick }: { onClick?: () => void }) {
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
        </nav>
    );
}
