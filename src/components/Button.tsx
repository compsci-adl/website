import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonProps = {
    href: string;
    className?: string;
    children: ReactNode;
};

export default function Button({ href, className, children }: ButtonProps) {
    return (
        <Link
            className={`flex items-center justify-center border-primary border-black shadow-solid hover:translate-x-1
            hover:translate-y-1 motion-safe:transition-transform ${className ?? ''}`}
            href={href}
        >
            {children}
        </Link>
    );
}
