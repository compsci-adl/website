import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type ButtonProps = JSX.IntrinsicElements["button"] & JSX.IntrinsicElements["a"] & {
    //onClick?: MouseEventHandler<HTMLAnchorElement>;
    children: ReactNode;
    className?: string;
    href?: string;
    //shadowSize?: number;
    smallShadow?: boolean;
}

export default function Button({ children, className, href, smallShadow, ...props }: ButtonProps) {
    const topLayerClassName = "z-10 flex h-full items-center justify-center border-primary border-black hover:translate-x-[6px] hover:translate-y-[6px] motion-safe:transition-transform";
    const bottomLayerClassName = "absolute top-0 left-0 -z-10 box-content h-full w-full translate-x-[6px] translate-y-[6px] bg-black";

    const smallShadowTopLayer = "max-sm:hover:translate-x-[2px] max-sm:hover:translate-y-[2px] max-md:hover:translate-x-[4px] max-md:hover:translate-y-[4px] max-lg:hover:translate-x-[5px] max-lg:hover:translate-y-[5px]";
    const smallShadowBottomLayer = "max-sm:translate-y-[2px] max-sm:translate-x-[2px] max-md:translate-y-[4px] max-md:translate-x-[4px] max-lg:translate-y-[5px] max-lg:translate-x-[5px]";

    {/* If href is provided, use anchor tag (Link) instead of button tag */ }
    if (href !== undefined) {
        return (
            <div className="relative z-10">
                <Link
                    className={`${topLayerClassName} ${smallShadow === true ? smallShadowTopLayer : ''
                        } ${className ?? ''}`}
                    href={href}
                    {...props}
                >
                    {children}
                </Link>
                <div
                    className={`${bottomLayerClassName} ${smallShadow === true ? smallShadowBottomLayer : ''}`}
                />
            </div>
        );
    }

    return (
        <button className="relative z-10" {...props}>
            <div
                className={`${topLayerClassName} ${smallShadow === true ? smallShadowTopLayer : ''}
                ${className ?? ''}`}
            >
                {children}
            </div>
            <div
                className={`${bottomLayerClassName} ${smallShadow === true ? smallShadowBottomLayer : ''}`}
            />
        </button>
    );
}
