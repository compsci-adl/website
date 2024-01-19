import type { Colour } from '@/constants/colours';
import { BG_COLOURS, BORDER_COLOURS } from '@/constants/colours';
import React from 'react';

// Fancy rectangle component used in various elements taking parameters child, colour, offset and filled
interface FancyRectangleProps {
    children: React.ReactNode;
    colour: Colour;
    offset: string;
    filled: boolean;
}

const FancyRectangle = ({ children, colour, offset, filled }: FancyRectangleProps) => {
    const offsetValue = parseInt(offset, 10);

    const offsetStyles = {
        marginBottom: `-${offsetValue}px`,
        marginRight: `-${offsetValue}px`,
    };

    return (
        <div className="flex items-center">
            <div className="w-auto h-auto relative">
                <div
                    style={offsetStyles}
                    className={`absolute right-0 bottom-0 w-full h-full ${
                        filled ? BG_COLOURS[colour] : BORDER_COLOURS[colour]
                    }`}
                ></div>
                <div className="w-full h-full flex justify-center items-center z-10 relative">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FancyRectangle;
