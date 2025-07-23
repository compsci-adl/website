'use client';

import Button from '@/components/Button';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { Photo } from './types';

interface GalleryViewProps {
    photos: Photo[];
    positions: { [key: number]: { x: number; y: number; rotate: number } };
    activeIndex: number | null;
    setActiveIndex: (index: number | null) => void;
    stopAnimation: () => void;
    viewMode: 'pile' | 'standard';
}

export default function GalleryView({
    photos,
    positions,
    activeIndex,
    setActiveIndex,
    stopAnimation,
    viewMode,
}: GalleryViewProps) {
    const isDragging = useRef(false);
    const [standardIndex, setStandardIndex] = useState(0);
    const thumbnailRefs = useRef<(HTMLImageElement | null)[]>([]);

    const handlePrev = () => {
        setStandardIndex((prev) => (prev - 1 + photos.length) % photos.length);
        setActiveIndex(null);
    };

    const handleNext = () => {
        setStandardIndex((prev) => (prev + 1) % photos.length);
        setActiveIndex(null);
    };

    const handleDragStart = () => (isDragging.current = true);
    const handleDragEnd = () => (isDragging.current = false);

    // Auto-scroll selected thumbnail into center
    useEffect(() => {
        const activeThumb = thumbnailRefs.current[standardIndex];
        if (activeThumb) {
            activeThumb.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [standardIndex]);

    // Standard View
    if (viewMode === 'standard') {
        const photo = photos[standardIndex];

        return (
            <div className="relative flex w-full max-w-5xl flex-col items-center justify-center gap-4">
                <div className="relative flex w-full items-center justify-center">
                    <Button onClick={handlePrev} type="button" colour="purple" className="z-10">
                        <FaChevronLeft />
                    </Button>

                    <img
                        src={photo.url}
                        className="mx-4 max-h-[70vh] w-full object-contain"
                        alt={`Photo ${standardIndex + 1}`}
                        draggable={false}
                    />

                    <Button onClick={handleNext} type="button" colour="purple" className="z-10">
                        <FaChevronRight />
                    </Button>
                </div>

                <div className="mt-4 w-full overflow-x-auto px-4 py-2">
                    <div className="flex flex-nowrap gap-2">
                        {photos.map((thumb, idx) => (
                            <img
                                key={idx}
                                ref={(el) => (thumbnailRefs.current[idx] = el)}
                                src={thumb.url}
                                onClick={() => setStandardIndex(idx)}
                                className={`h-16 w-24 flex-shrink-0 cursor-pointer rounded-sm border-2 object-cover transition-all duration-200 ${
                                    idx === standardIndex
                                        ? 'border-purple-500 opacity-100'
                                        : 'border-transparent opacity-70 hover:opacity-100'
                                }`}
                                alt={`Thumbnail ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Polaroid (pile) View
    return (
        <>
            {photos.map((photo, index) => {
                const variants = {
                    initial: { rotate: positions[index]?.rotate, scale: 0.5, opacity: 0 },
                    animate:
                        activeIndex === index
                            ? {
                                  zIndex: 100,
                                  scale: 1.2,
                                  rotate: positions[index]?.rotate,
                                  opacity: 1,
                                  transition: {
                                      scale: { type: 'spring', stiffness: 100, damping: 25 },
                                      opacity: { duration: 0.4 },
                                      rotate: { type: 'spring', stiffness: 100, damping: 25 },
                                  },
                              }
                            : {
                                  opacity: 1,
                                  scale: 0.5,
                                  rotate: positions[index]?.rotate,
                                  transition: {
                                      scale: { type: 'spring', stiffness: 100, damping: 25 },
                                      opacity: { duration: 0.4 },
                                      rotate: { type: 'spring', stiffness: 100, damping: 25 },
                                  },
                              },
                };

                return (
                    <motion.div
                        key={index}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        className={`polaroid absolute flex cursor-pointer items-center justify-center overflow-hidden border-[1em] bg-white bg-cover bg-center brightness-[1.2] contrast-[.9] saturate-[.9] sepia-[.2] will-change-transform ${
                            photo.orientation === 'portrait'
                                ? 'h-[24em] w-[18em] border-b-[5.5em] border-t-[2em]'
                                : 'h-[18em] w-[24em] border-l-[2em] border-r-[5.5em]'
                        }`}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation();
                            if (!isDragging.current) {
                                setActiveIndex(activeIndex === index ? null : index);
                                stopAnimation();
                            }
                        }}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        style={{
                            left: `${positions[index]?.x + (photo.orientation === 'landscape' ? -4.3 : -1.25)}rem`,
                            top: `${positions[index]?.y}rem`,
                        }}
                        drag
                        dragMomentum={false}
                        dragElastic={0.2}
                    >
                        <img
                            src={photo.url}
                            className="h-full w-full object-cover"
                            draggable={false}
                            loading="lazy"
                        />
                    </motion.div>
                );
            })}
        </>
    );
}
