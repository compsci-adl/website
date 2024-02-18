'use client';

import { useMount } from '@/hooks/use-mount';
import Image from 'next/image';
import { useState } from 'react';

export type Image = { src: string; alt: string };
interface ImageCarouselProps {
    images: Image[];
    width: number;
    height: number;
}

export default function ImageCarousel({ images, width, height }: ImageCarouselProps) {
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
        <>
            {images.map((image, i) => (
                <Image
                    key={i}
                    src={image.src}
                    alt={image.alt}
                    width={width}
                    height={height}
                    className="hidden"
                    priority
                />
            ))}
            <div
                className={`transition-opacity duration-500 ease-in-out ${
                    isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
            >
                <Image
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    width={width}
                    height={height}
                    className="h-full w-full object-cover"
                />
            </div>
        </>
    );
}
