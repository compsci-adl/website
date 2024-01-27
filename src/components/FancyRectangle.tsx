import type { Colour } from '@/constants/colours';
import { BG_COLOURS, BORDER_COLOURS } from '@/constants/colours';
import React from 'react';

// Fancy rectangle component used in various elements taking parameters child, colour, offset and filled
interface FancyRectangleProps {
    children: React.ReactNode;
    colour: Colour;
    offset: string;
    filled?: boolean;
    rounded?: boolean;
}

const FancyRectangle = ({ children, colour, offset, filled, rounded }: FancyRectangleProps) => {
    const offsetValue = parseInt(offset, 10);

    const offsetStyles = {
        marginBottom: `-${offsetValue}px`,
        marginRight: `-${offsetValue}px`,
    };

    return (
        <div className="flex items-center">
            <div className="relative h-auto w-auto">
                <div
                    style={offsetStyles}
                    className={`absolute bottom-0 right-0 h-full w-full ${
                        filled ? BG_COLOURS[colour] : BORDER_COLOURS[colour]
                    } ${rounded ? 'rounded-xl' : ''}`}
                ></div>
                <div className="relative z-10 flex h-full w-full items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FancyRectangle;
