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

    const bgColours: { [key: string]: string } = {
        black: 'bg-black',
        grey: 'bg-grey',
        white: 'bg-white',
        yellow: 'bg-yellow',
        orange: 'bg-orange',
        purple: 'bg-purple',
    };

    const borderColours: { [key: string]: string } = {
        black: 'border-black border-2',
        grey: 'border-grey border-2',
        white: 'border-white border-2',
        yellow: 'border-yellow border-2',
        orange: 'border-orange border-2',
        purple: 'border-purple border-2',
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
