import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import type { Photo } from './types';

interface GalleryCardProps {
    folder: string;
    images: Photo[];
    onSelectFolder: (folder: string) => void;
}

export default function GalleryCard({ folder, images, onSelectFolder }: GalleryCardProps) {
    const pile = useMemo(() => {
        return images
            .filter((photo) => photo.orientation === 'landscape')
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
    }, [images]);

    const displayName = useMemo(() => {
        return images[0]?.eventName
            ?.replace(/\bS[12]\b/g, '')
            ?.replace(/\b\d{4}\b/g, '')
            ?.trim();
    }, [images]);

    const displayDate = useMemo(() => {
        const d = images[0]?.eventDate;
        if (!d) return '';
        return new Date(d.year, d.month - 1, d.day).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }, [images]);

    return (
        <div
            className="flex cursor-pointer flex-col items-center"
            onClick={() => onSelectFolder(folder)}
        >
            <div className="relative h-[19em] w-[22em]">
                {pile.map((photo, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0.7,
                            rotate: -10 + i * 10,
                            zIndex: i,
                            x: i * 6 - 12,
                            y: i * 6,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 0.7,
                            rotate: -10 + i * 10,
                            x: i * 6 - 12,
                            y: i * 6,
                            zIndex: i,
                        }}
                        className={`polaroid absolute left-0 top-0 will-change-transform ${
                            photo.orientation === 'portrait'
                                ? 'h-[24em] w-[18em] border-b-[5.5em] border-t-[2em]'
                                : 'h-[18em] w-[24em] border-l-[2em] border-r-[5.5em]'
                        } border-[1em] bg-white bg-cover bg-center shadow-lg brightness-[1.2] contrast-[.9] saturate-[.9] sepia-[.2]`}
                    >
                        <img
                            src={photo.url}
                            className="h-full w-full object-cover"
                            draggable={false}
                            loading="lazy"
                        />
                    </motion.div>
                ))}
            </div>
            <div className="mb-4 text-center text-xl font-semibold text-white">
                <div>{displayName}</div>
                <div className="font-normal">{displayDate}</div>
            </div>
        </div>
    );
}
