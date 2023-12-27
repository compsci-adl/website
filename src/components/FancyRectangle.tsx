import { bgColours, borderColours } from '@/util/colours';
import React from 'react';

// Fancy rectangle component used in various elements taking parameters child, colour, offset and filled
interface FancyRectangleProps {
    children: React.ReactNode;
    colour: string;
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
                        filled ? bgColours[colour] : borderColours[colour]
                    } -z-10`}
                ></div>
                <div className="w-full h-full flex justify-center items-center">{children}</div>
            </div>
        </div>
    );
};

export default FancyRectangle;
