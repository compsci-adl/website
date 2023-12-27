import FancyRectangle from '@/components/FancyRectangle';
import { bgColours } from '@/util/colours';
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    colour: string;
    href: string;
}

const Button = ({ children, colour, href }: ButtonProps) => {
    return (
        <FancyRectangle colour="black" offset="4" filled={true}>
            <a
                href={href}
                className={`whitespace-nowrap py-4 px-12 md:py-1 md:px-2 lg:py-2 lg:px-6 border-2 border-black font-bold hover:bg-yellow transition-colors duration-300 ${bgColours[colour]}`}
            >
                {children}
            </a>
        </FancyRectangle>
    );
};

export default Button;
