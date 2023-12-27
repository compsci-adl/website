import FancyRectangle from '@/components/FancyRectangle';
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    colour: string;
    href: string;
}

const Button = ({ children, colour, href }: ButtonProps) => {
    const buttonColors: { [key: string]: string } = {
        orange: 'bg-orange hover:bg-yellow',
        purple: 'bg-purple hover:bg-yellow',
    };

    return (
        <FancyRectangle colour="black" offset="4" filled={true}>
            <a href={href}>
                <button
                    className={`whitespace-nowrap py-4 px-12 md:py-1 md:px-2 lg:py-2 lg:px-6 border-2 border-black font-bold transition-colors duration-300 ${buttonColors[colour]}`}
                >
                    {children}
                </button>
            </a>
        </FancyRectangle>
    );
};

export default Button;
