import { motion } from 'framer-motion';
import { useRef } from 'react';
import type { Photo } from './types';

interface GalleryViewProps {
    photos: Photo[];
    positions: { [key: number]: { x: number; y: number; rotate: number } };
    activeIndex: number | null;
    setActiveIndex: (index: number | null) => void;
    stopAnimation: () => void;
}

export default function GalleryView({
    photos,
    positions,
    activeIndex,
    setActiveIndex,
    stopAnimation,
}: GalleryViewProps) {
    const isDragging = useRef(false);

    const handleDragStart = () => (isDragging.current = true);
    const handleDragEnd = () => (isDragging.current = false);

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
