'use client';

import FancyRectangle from '@/components/FancyRectangle';
import type { Colour } from '@/constants/colours';
import { useMount } from '@/hooks/use-mount';
import Image from 'next/image';
import { useState } from 'react';

export type Image = { src: string; alt: string };
interface ImageCarouselProps {
    images: Image[];
    colour: Colour;
}

export default function ImageCarousel({ images, colour }: ImageCarouselProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goToNextImage = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
            setIsTransitioning(false);
        }, 500);
    };

    useMount(() => {
        const interval = setInterval(goToNextImage, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    });

    return (
        <div className="relative z-10 mr-2">
            <FancyRectangle colour={colour} offset="8" filled={true}>
                <div className="relative h-full w-full bg-white">
                    <div
                        className={`transition-opacity duration-500 ease-in-out ${
                            isTransitioning ? 'opacity-0' : 'opacity-100'
                        }`}
                    >
                        <Image
                            src={images[currentImageIndex].src}
                            alt={images[currentImageIndex].alt}
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
