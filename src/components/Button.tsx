import Link from 'next/link';
import type { MouseEventHandler, ReactNode } from 'react';

type ButtonProps = {
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    href?: string;
    className?: string;
    children: ReactNode;
};

export default function Button({ onClick, href, className, children }: ButtonProps) {
    return (
        <button className="relative z-10">
            <Link
                className={`z-10 flex items-center justify-center border-primary border-black hover:translate-x-[4px]
                hover:translate-y-[4px] motion-safe:transition-transform ${className ?? ''}`}
                href={href ?? ''}
                {...{ onClick }}
            >
                {children}
            </Link>
            <div className="absolute top-0 left-0 -z-10 box-content h-full w-full translate-x-[7px] translate-y-[7px] bg-black" />
        </button>
    );
}
