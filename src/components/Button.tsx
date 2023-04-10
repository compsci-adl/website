import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type ButtonProps = JSX.IntrinsicElements["button"] & JSX.IntrinsicElements["a"] & {
    //onClick?: MouseEventHandler<HTMLAnchorElement>;
    children: ReactNode;
    className?: string;
    href?: string;
    //shadowSize?: number;
    smallShadow?: boolean; // TODO: decrease shadow for smaller screen sizes or omit it all together
}

export default function Button({ children, className, href, smallShadow, ...props }: ButtonProps) {
    {/* If href is provided, use anchor tag (Link) instead of button tag */ }
    if (href !== undefined) {
        return (
            <div className="relative z-10">
                <Link
                    className={`z-10 flex h-full items-center justify-center border-primary border-black hover:translate-x-[6px]
                hover:translate-y-[6px] motion-safe:transition-transform ${smallShadow === true ? 'max-md:hover:translate-x-[5px] max-md:hover:translate-y-[5px]' : ''
                        } ${className ?? ''}`}
                    href={href}
                    {...props}
                >
                    {children}
                </Link>
                <div
                    className={`absolute top-0 left-0 -z-10 box-content h-full w-full translate-x-[6px] translate-y-[6px] bg-black ${smallShadow === true ? 'max-md:translate-y-[5px] max-md:translate-x-[5px]' : ''
                        }`}
                />
            </div>
        );
    }

    return (
        <button className="relative z-10" {...props}>
            <div
                className={`z-10 flex h-full items-center justify-center border-primary border-black hover:translate-x-[6px]
                hover:translate-y-[6px] motion-safe:transition-transform ${smallShadow === true ? 'max-md:hover:translate-x-[5px] max-md:hover:translate-y-[5px]' : ''}
                ${className ?? ''}`}
            >
                {children}
            </div>
            <div
                className={`absolute top-0 left-0 -z-10 box-content h-full w-full translate-x-[6px] translate-y-[6px] bg-black ${smallShadow === true ? 'max-md:translate-y-[5px] max-md:translate-x-[5px]' : ''
                    }`}
            />
        </button>
    );

}
