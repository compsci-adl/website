'use client';

import FancyRectangle from '@/components/FancyRectangle';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const IMAGES = [
    {
        src: '/images/home/duck-ctf.jpg',
        alt: 'DuckCTF',
    },
    {
        src: '/images/home/pizza.jpg',
        alt: 'Pizza',
    },
    {
        src: '/images/home/cyber-panel.jpg',
        alt: 'Cyber Panel',
    },
] as const;

export default function ImageCarousel() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goToNextImage = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === IMAGES.length - 1 ? 0 : prevIndex + 1
            );
            setIsTransitioning(false);
        }, 500);
    };

    useEffect(() => {
        const interval = setInterval(goToNextImage, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative z-10 mr-2">
            <FancyRectangle colour="purple" offset="8" filled={true}>
                <div className="relative h-full w-full bg-white">
                    <div
                        className={`transition-opacity duration-500 ease-in-out ${
                            isTransitioning ? 'opacity-0' : 'opacity-100'
                        }`}
                    >
                        <Image
                            src={IMAGES[currentImageIndex].src}
                            alt={IMAGES[currentImageIndex].alt}
                            width={2132}
                            height={1600}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </FancyRectangle>
        </div>
    );
}
