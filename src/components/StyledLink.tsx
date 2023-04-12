import Link from 'next/link';
import type { ReactNode } from 'react';

type StyledLinkProps = {
    children: ReactNode;
    href: string;
};

export default function StyledLink({ children, href, ...props }: StyledLinkProps) {
    return (
        <Link href={href} className="text-accent-blue" {...props}>
            {children}
        </Link>
    );
}
