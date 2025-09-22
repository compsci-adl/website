import type { Colour } from '@/constants/colours';
import { BG_COLOURS, BORDER_COLOURS } from '@/constants/colours';
import React from 'react';

// Fancy rectangle component used in various elements taking parameters child, colour, offset and filled
interface FancyRectangleProps {
    children: React.ReactNode;
    colour: Colour;
    offset: `${number}`;
    filled?: boolean;
    rounded?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
}

const FancyRectangle = React.forwardRef<HTMLDivElement, FancyRectangleProps>(
    ({ children, colour, offset, filled, rounded, fullWidth, fullHeight }, ref) => {
        const offsetValue = parseInt(offset, 10);

        const offsetStyles = {
            marginBottom: `-${offsetValue}px`,
            marginRight: `-${offsetValue}px`,
        };

        return (
            <div className="flex items-center" ref={ref}>
                <div
                    className={`relative ${fullHeight ? 'h-full' : 'h-auto'} ${fullWidth ? 'w-full' : 'w-auto'}`}
                >
                    <div
                        style={offsetStyles}
                        className={`absolute bottom-0 right-0 h-full w-full ${
                            filled ? BG_COLOURS[colour] : BORDER_COLOURS[colour]
                        } ${rounded ? 'rounded-xl' : ''}`}
                    />
                    <div className="relative z-10 flex h-full w-full items-center justify-center">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
);
FancyRectangle.displayName = 'FancyRectangle';

export default FancyRectangle;
