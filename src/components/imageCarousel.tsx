'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import FancyRectangle from '../components/fancyRectangle';

interface CarouselImage {
    src: string;
    alt: string;
}

const images: CarouselImage[] = [
    {
        src: '/images/duckCTF.jpg',
        alt: 'duckCTF',
    },
    {
        src: '/images/pizza.jpg',
        alt: 'Pizza',
    },
    {
        src: '/images/cyberPanel.jpg',
        alt: 'Cyber Panel',
    },
];

export default function ImageCarousel() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const interval = setInterval(goToNextImage, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative z-10">
            <FancyRectangle colour="purple" offset="8" filled={true}>
                <div className="relative bg-white w-[66.5vw] h-[50vw] lg:w-[31.99vw] lg:h-[24vw]">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute transition-opacity duration-1000 ease-in-out ${
                                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={533.2}
                                height={400}
                                className="w-[66.5vw] h-[50vw] lg:w-[31.99vw] lg:h-[24vw]"
                            />
                        </div>
                    ))}
                </div>
            </FancyRectangle>
        </div>
    );
}
