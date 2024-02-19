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
    font?: string;
}

const Button = ({ children, colour, href, onClick, width, type, loading, font }: ButtonProps) => {
    const isAnchor = !!href;
    const Component = isAnchor ? 'a' : 'button';

    return (
        <FancyRectangle colour="black" offset="4" filled>
            <Component
                href={isAnchor ? href : undefined}
                onClick={onClick}
                type={isAnchor ? undefined : type}
                className={`${width} ${font ?? 'text-lg md:text-base'} ${BG_COLOURS[colour]} ${isAnchor ? 'hover:bg-yellow' : 'hover:enabled:bg-yellow'} whitespace-nowrap border-2 border-black px-12 py-4 font-bold transition-colors duration-300 disabled:cursor-wait disabled:grayscale md:px-2 md:py-1 lg:px-6 lg:py-2`}
                disabled={loading}
            >
                {children}
            </Component>
        </FancyRectangle>
    );
};

export default Button;
