import FancyRectangle from '@/components/FancyRectangle';
import { bgColours } from '@/util/colours';
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    colour: string;
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
    type?: 'button' | 'submit' | 'reset';
    width?: string;
}

const Button = ({ children, colour, href, onClick, width }: ButtonProps) => {
    const isAnchor = !!href;
    const Component = isAnchor ? 'a' : 'button';

    const buttonStyles = `whitespace-nowrap py-4 px-12 md:py-1 md:px-2 lg:py-2 lg:px-6 border-2 border-black font-bold hover:bg-yellow transition-colors duration-300 ${bgColours[colour]} text-lg md:text-base`;
    const buttonClasses = width ? `${buttonStyles} ${width}` : buttonStyles;

    return (
        <FancyRectangle colour="black" offset="4" filled={true}>
            <Component
                href={isAnchor ? href : undefined}
                onClick={
                    onClick as (
                        e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>
                    ) => void | Promise<void>
                }
                type={isAnchor ? undefined : 'button'}
                className={buttonClasses}
            >
                {children}
            </Component>
        </FancyRectangle>
    );
};

export default Button;
