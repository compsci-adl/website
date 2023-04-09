import Link from 'next/link';
import type { MouseEventHandler, ReactNode } from 'react';

type ButtonProps = JSX.IntrinsicElements["button"] & {
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    href?: string;
    className?: string;
    smallShadow?: boolean;
    children: ReactNode;
};

// TODO: Make buttons and elements in general more accessible

export default function Button({ onClick, type, href, className, children, smallShadow }: ButtonProps) {
    return (
        <button type={type} className="relative z-10">
            <Link
                className={`z-10 flex h-full items-center justify-center border-primary border-black hover:translate-x-[6px]
                hover:translate-y-[6px] motion-safe:transition-transform ${
                    smallShadow === true ? 'max-md:hover:translate-x-[5px] max-md:hover:translate-y-[5px]' : ''
                } ${className ?? ''}`}
                href={href ?? ''}
                {...onClick }
            >
                {children}
            </Link>
            <div
                className={`absolute top-0 left-0 -z-10 box-content h-full w-full translate-x-[6px] translate-y-[6px] bg-black ${
                    smallShadow === true ? 'max-md:translate-y-[5px] max-md:translate-x-[5px]' : ''
                }`}
            />
        </button>
    );
}

export function Button2({ type, href, className, children, smallShadow, ...buttonProps}: ButtonProps) {
    return (
        <button type={type} className="relative z-10" {...buttonProps}>
            <div
                className={`z-10 flex h-full items-center justify-center border-primary border-black hover:translate-x-[6px]
                hover:translate-y-[6px] motion-safe:transition-transform ${
                    smallShadow === true ? 'max-md:hover:translate-x-[5px] max-md:hover:translate-y-[5px]' : ''
                } ${className ?? ''}`}
                //{...onClick }
            >
                {children}
            </div>
            <div
                className={`absolute top-0 left-0 -z-10 box-content h-full w-full translate-x-[6px] translate-y-[6px] bg-black ${
                    smallShadow === true ? 'max-md:translate-y-[5px] max-md:translate-x-[5px]' : ''
                }`}
            />
        </button>
    );
}
