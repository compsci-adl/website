import Image from 'next/image';
import React from 'react';

interface DucksProps {
    size: 'small' | 'large';
}

function Ducks({ size }: DucksProps): JSX.Element {
    const renderImages = (
        count: number,
        src: string,
        alt: string,
        className: string,
        height: number,
        width: number
    ) => {
        return Array.from({ length: count }, (_, index) => (
            <Image
                key={index}
                src={src}
                alt={alt}
                className={className}
                height={height}
                width={width}
            />
        ));
    };

    const getSizeProperties = (size: 'small' | 'large') => {
        return size === 'small' ? { height: 50, width: 50 } : { height: 75, width: 75 };
    };

    const getSizeClassName = (size: 'small' | 'large'): string => {
        return size === 'small' ? 'h-8 md:h-10' : 'mt-8 h-12 md:h-16';
    };

    const { height, width } = getSizeProperties(size);

    return (
        <div className="relative mb-2 flex flex-row justify-end">
            {renderImages(
                2,
                '/images/white-duck-outline.svg',
                'White Duck',
                `ml-4 ${getSizeClassName(size)}`,
                height,
                width
            )}
            {renderImages(
                3,
                '/images/white-duck.svg',
                'White Duck',
                `ml-4 ${getSizeClassName(size)}`,
                height,
                width
            )}
        </div>
    );
}

export default Ducks;
