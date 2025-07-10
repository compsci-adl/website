import FancyRectangle from '@/components/FancyRectangle';
import type { Colour } from '@/constants/colours';
import { BG_COLOURS } from '@/constants/colours';
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    colour: Colour;
    href?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    width?: string;
    loading?: boolean;
    size?: 'base' | 'small';
    font?: string;
    targetBlank?: boolean;
    className?: string;
}

const Button = ({
    children,
    colour,
    href,
    onClick,
    width,
    type,
    loading,
    font,
    size = 'base',
    targetBlank = false,
    className,
}: ButtonProps) => {
    const isAnchor = !!href;
    const Component = isAnchor ? 'a' : 'button';

    return (
        <FancyRectangle colour="black" offset="4" filled fullWidth>
            <Component
                href={isAnchor ? href : undefined}
                onClick={onClick}
                type={isAnchor ? undefined : type}
                target={isAnchor && targetBlank ? '_blank' : undefined}
                rel={isAnchor && targetBlank ? 'noopener noreferrer' : undefined}
                className={` ${className} ${width} ${font ?? 'text-lg md:text-base'} ${BG_COLOURS[colour]} ${isAnchor ? 'hover:bg-yellow' : 'hover:enabled:bg-yellow'} whitespace-nowrap border-2 border-black ${size === 'base' ? 'px-16 text-lg' : 'px-4 text-sm'} flex items-center justify-center py-4 font-bold transition-colors duration-300 disabled:cursor-wait disabled:grayscale md:px-2 md:py-1 md:text-base lg:px-6 lg:py-2`}
                disabled={loading}
            >
                {children}
            </Component>
        </FancyRectangle>
    );
};

export default Button;
