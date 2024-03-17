import FancyRectangle from '@/components/FancyRectangle';
import type { Colour } from '@/constants/colours';
import { BG_COLOURS } from '@/constants/colours';
import clsx from 'clsx';
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
    fullWidth?: boolean;
    disabled?: boolean;
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
    fullWidth,
    disabled,
}: ButtonProps) => {
    const isAnchor = !!href;
    const Component = isAnchor ? 'a' : 'button';

    return (
        <FancyRectangle colour="black" offset="4" filled fullWidth={fullWidth}>
            <Component
                href={isAnchor ? href : undefined}
                onClick={onClick}
                type={isAnchor ? undefined : type}
                disabled={loading || disabled}
                className={clsx(
                    width,
                    BG_COLOURS[colour],
                    font ?? 'text-lg md:text-base',
                    size === 'base' ? 'px-16 text-lg' : 'px-4 text-sm',
                    loading && 'cursor-wait',
                    'whitespace-nowrap border-2 border-black py-4 font-bold transition-colors duration-300 disabled:grayscale md:px-2 md:py-1 md:text-base lg:px-6 lg:py-2'
                )}
            >
                {children}
            </Component>
        </FancyRectangle>
    );
};

export default Button;
