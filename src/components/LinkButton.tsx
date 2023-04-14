import Link from 'next/link';
import type { ReactNode } from 'react';

// NOTE: Inheriting properties from `JSX.IntrinsicElements['a'] breaks Vercel build
type LinkButtonProps = {
    children: ReactNode;
    className?: string;
    href: string;
    smallShadow?: boolean;
    target?: string;
};

export default function LinkButton({
    children,
    className,
    href,
    target,
    smallShadow,
    ...props
}: LinkButtonProps) {
    return (
        <div className="relative z-10">
            <Link
                className={`z-10 flex h-full items-center justify-center border-primary border-black hover:translate-x-[6px] hover:translate-y-[6px] motion-safe:transition-transform ${
                    smallShadow === true
                        ? 'max-lg:hover:translate-x-[5px] max-lg:hover:translate-y-[5px] max-md:hover:translate-x-[4px] max-md:hover:translate-y-[4px] max-sm:hover:translate-x-0 max-sm:hover:translate-y-0'
                        : ''
                } ${className ?? ''}`}
                href={{ pathname: href }}
                role="button"
                target={target}
                {...props}
            >
                {children}
            </Link>
            <div
                className={`absolute top-0 left-0 -z-10 box-content h-full w-full translate-x-[6px] translate-y-[6px] bg-black ${
                    smallShadow === true
                        ? 'max-lg:translate-x-[5px] max-lg:translate-y-[5px] max-md:translate-x-[4px] max-md:translate-y-[4px] max-sm:hidden'
                        : ''
                }`}
            />
        </div>
    );
}
