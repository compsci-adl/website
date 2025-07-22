'use client';

import { fetchGalleries } from '@/data/gallery';
import { randomPosition } from '@/utils/random-position';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import GalleryControls from './GalleryControls';
import GalleryOverview from './GalleryOverview';
import GalleryView from './GalleryView';
import './tailwind-overrides.css';
import type { Photo } from './types';

export default function Gallery() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [positions, setPositions] = useState<{
        [key: number]: { x: number; y: number; rotate: number };
    }>({});
    const [folders, setFolders] = useState<string[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<string>('');
    const [numImages] = useState<number>(10);
    const [animateToggle, setAnimateToggle] = useState<boolean>(false);
    const [mode, setMode] = useState<'overview' | 'gallery'>('overview');
    const [loading, setLoading] = useState(true);

    const isDragging = useRef(false);
    const galleryRef = useRef<HTMLDivElement>(null);
    const animationInterval = useRef<NodeJS.Timeout | null>(null);
    const folderChangeInterval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        async function loadGalleries() {
            try {
                const galleries = await fetchGalleries();
                const allPhotos: Photo[] = [];

                for (const gallery of galleries) {
                    const folderName = gallery.eventName.toLowerCase().replace(/\s+/g, '-');
                    for (const image of gallery.images) {
                        allPhotos.push({
                            url: image.url,
                            orientation: image.width >= image.height ? 'landscape' : 'portrait',
                            folder: folderName,
                            eventDate: gallery.eventDate,
                        });
                    }
                }

                const uniqueFolders = [...new Set(allPhotos.map((p) => p.folder))];

                setPhotos(allPhotos);
                setFolders(uniqueFolders);
                setSelectedFolder(uniqueFolders[0]);
                setLoading(false);
            } catch (error) {
                console.error('Error loading galleries:', error);
                setLoading(false);
            }
        }

        loadGalleries();
    }, []);

    const galleriesByFolder = useMemo(() => {
        const grouped: { [folder: string]: Photo[] } = {};
        photos.forEach((photo) => {
            if (!grouped[photo.folder]) grouped[photo.folder] = [];
            grouped[photo.folder].push(photo);
        });
        return grouped;
    }, [photos]);

    useEffect(() => {
        if (mode === 'gallery' && selectedFolder && galleriesByFolder[selectedFolder]) {
            const shuffled = [...galleriesByFolder[selectedFolder]].sort(() => 0.5 - Math.random());
            const newPositions: { [key: number]: { x: number; y: number; rotate: number } } = {};
            shuffled.forEach((_, index) => {
                newPositions[index] = randomPosition();
            });
            setPositions(newPositions);
        }
    }, [mode, selectedFolder, galleriesByFolder]);

    const shufflePhotos = () => {
        const allShuffledPhotos = [...photos.filter((p) => p.folder === selectedFolder)]
            .sort(() => 0.5 - Math.random())
            .slice(0, numImages);

        setPhotos((prevPhotos) => [
            ...prevPhotos.filter((p) => p.folder !== selectedFolder),
            ...allShuffledPhotos,
        ]);

        const shuffledPositions: { [key: number]: { x: number; y: number; rotate: number } } = {};
        allShuffledPhotos.forEach((_, index) => {
            shuffledPositions[index] = randomPosition();
        });

        setPositions(shuffledPositions);
    };

    const handleOutsideClick = useCallback((event: MouseEvent) => {
        if (
            !galleryRef.current?.contains(event.target as Node) &&
            !document.querySelector('.animate-toggle-button')?.contains(event.target as Node)
        ) {
            setActiveIndex(null);
            stopAnimation();
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [handleOutsideClick]);

    const handleAnimateToggle = () => {
        setAnimateToggle((prev) => !prev);
        if (!animateToggle) {
            animationInterval.current = setInterval(() => {
                let randomIndex;
                do {
                    randomIndex = Math.floor(
                        Math.random() * (galleriesByFolder[selectedFolder]?.length || 1)
                    );
                } while (randomIndex === activeIndex);
                setActiveIndex(randomIndex);
            }, 3000);

            folderChangeInterval.current = setInterval(() => {
                setSelectedFolder((prevFolder) => {
                    const currentIndex = folders.indexOf(prevFolder);
                    return folders[(currentIndex + 1) % folders.length];
                });
            }, 60000);
        } else {
            stopAnimation();
        }
    };

    const stopAnimation = () => {
        setAnimateToggle(false);
        if (animationInterval.current) clearInterval(animationInterval.current);
        if (folderChangeInterval.current) clearInterval(folderChangeInterval.current);
    };

    if (loading) {
        return <div className="p-10 text-center">Loading galleries...</div>;
    }

    return (
        <div className="relative" ref={galleryRef}>
            <GalleryControls
                mode={mode}
                setMode={setMode}
                shufflePhotos={shufflePhotos}
                animateToggle={animateToggle}
                handleAnimateToggle={handleAnimateToggle}
            />

            <div className="relative box-border flex flex-wrap items-center justify-center p-5">
                {mode === 'overview' ? (
                    <GalleryOverview
                        galleriesByFolder={galleriesByFolder}
                        onSelectFolder={(folder) => {
                            setSelectedFolder(folder);
                            setMode('gallery');
                        }}
                    />
                ) : (
                    <GalleryView
                        photos={galleriesByFolder[selectedFolder] || []}
                        positions={positions}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        stopAnimation={stopAnimation}
                    />
                )}
            </div>
        </div>
    );
}
