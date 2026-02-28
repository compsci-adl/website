import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import type { Photo } from './types';

interface GalleryCardProps {
    folder: string;
    images: Photo[];
    onSelectFolder: (folder: string) => void;
}

export default function GalleryCard({ folder, images, onSelectFolder }: GalleryCardProps) {
    // Deterministic seeded shuffle to avoid impure Math.random in render
    const seedFromString = (s: string) => {
        let h = 2166136261 >>> 0;
        for (let i = 0; i < s.length; i++) {
            h ^= s.charCodeAt(i);
            h = Math.imul(h, 16777619) >>> 0;
        }
        return h >>> 0;
    };

    const mulberry32 = (a: number) => () => {
        let t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    const pile = useMemo(() => {
        const landscape = images.filter((photo) => photo.orientation === 'landscape');
        if (!landscape.length) return [];
        const seed = seedFromString(images[0]?.url || '');
        const rand = mulberry32(seed);
        const shuffled = [...landscape];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, 3);
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
                        className={`polaroid absolute top-0 left-0 will-change-transform ${
                            photo.orientation === 'portrait'
                                ? 'h-[24em] w-[18em] border-t-[2em] border-b-[5.5em]'
                                : 'h-[18em] w-[24em] border-r-[5.5em] border-l-[2em]'
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
