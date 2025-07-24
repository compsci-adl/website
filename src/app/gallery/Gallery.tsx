'use client';

import FancyRectangle from '@/components/FancyRectangle';
import { fetchGalleries } from '@/data/gallery';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import GalleryControls from './GalleryControls';
import GalleryOverview from './GalleryOverview';
import GalleryView from './GalleryView';
import './tailwind-overrides.css';
import type { Photo } from './types';

interface GalleryProps {
    setCurrentTitle: (title: string) => void;
}

export default function Gallery({ setCurrentTitle }: GalleryProps) {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [positions, setPositions] = useState<{
        [key: number]: { x: number; y: number; rotate: number };
    }>({});
    const [folders, setFolders] = useState<string[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<string>('');
    const [numImages, setNumImages] = useState<number>(25);
    const [animateToggle, setAnimateToggle] = useState<boolean>(false);
    const [mode, setMode] = useState<'overview' | 'gallery'>('overview');
    const [viewMode, setViewMode] = useState<'pile' | 'standard'>(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 768 ? 'standard' : 'pile';
        }
        return 'pile';
    });
    const [loading, setLoading] = useState(true);

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
                            eventName: gallery.eventName,
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

            // Get size of the gallery box
            const galleryWidth = galleryRef.current?.offsetWidth || window.innerWidth;
            const galleryHeight = galleryRef.current?.offsetHeight || window.innerHeight;

            shuffled.forEach((_, index) => {
                // Spread images randomly within the gallery box
                const x = (Math.random() - 0.5) * 0.05 * galleryWidth - 7;
                const y = (Math.random() - 0.5) * 0.05 * galleryHeight;
                const rotate = Math.random() * 30 - 15; // -15 to +15 degrees
                newPositions[index] = { x, y, rotate };
            });
            setPositions(newPositions);

            if (selectedFolder && photos.length) {
                const images = galleriesByFolder[selectedFolder]?.slice(0, numImages) || [];
                const displayName = images[0]?.eventName
                    ?.replace(/\bS[12]\b/g, '') // Remove "S1" and "S2"
                    ?.trim();
                setCurrentTitle(displayName);
            }
        }
    }, [mode, selectedFolder, galleriesByFolder, numImages, photos.length, setCurrentTitle]);

    const shufflePhotos = () => {
        const allShuffledPhotos = [...photos.filter((p) => p.folder === selectedFolder)]
            .sort(() => 0.5 - Math.random())
            .slice(0, numImages);

        setPhotos((prevPhotos) => [
            ...prevPhotos.filter((p) => p.folder !== selectedFolder),
            ...allShuffledPhotos,
        ]);

        const shuffledPositions: { [key: number]: { x: number; y: number; rotate: number } } = {};
        const galleryWidth = galleryRef.current?.offsetWidth || window.innerWidth;
        const galleryHeight = galleryRef.current?.offsetHeight || window.innerHeight;

        allShuffledPhotos.forEach((_, index) => {
            // Spread images randomly within the gallery box
            const x = (Math.random() - 0.5) * 0.05 * galleryWidth - 7;
            const y = (Math.random() - 0.5) * 0.05 * galleryHeight;
            const rotate = Math.random() * 30 - 15; // -15 to +15 degrees
            shuffledPositions[index] = { x, y, rotate };
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
        return (
            <main className="flex flex-col items-center gap-8 md:gap-16">
                <section className="w-full">
                    <FancyRectangle colour="purple" offset="8" filled fullWidth>
                        <div className="flex w-full flex-col gap-4 border-4 border-black bg-white px-4 py-8 text-black md:flex-row md:gap-8 md:p-12">
                            <h2 className="text-xl">Loading...</h2>
                        </div>
                    </FancyRectangle>
                </section>
            </main>
        );
    }

    return (
        <>
            {mode === 'overview' ? (
                <div
                    className="relative flex h-full w-full items-start justify-center"
                    ref={galleryRef}
                >
                    <div className="relative my-8 box-border flex flex-wrap items-center justify-center p-5">
                        <GalleryOverview
                            galleriesByFolder={galleriesByFolder}
                            onSelectFolder={(folder) => {
                                setSelectedFolder(folder);
                                setMode('gallery');
                            }}
                        />
                    </div>
                </div>
            ) : (
                <div
                    className={`relative flex ${viewMode === 'pile' ? 'h-[100vh]' : 'h-[85vh]'} w-full items-start justify-center`}
                    ref={galleryRef}
                >
                    <div className="absolute top-0 z-10 md:left-0">
                        <GalleryControls
                            mode={mode}
                            setMode={setMode}
                            shufflePhotos={shufflePhotos}
                            animateToggle={animateToggle}
                            handleAnimateToggle={handleAnimateToggle}
                            setCurrentTitle={setCurrentTitle}
                            numImages={numImages}
                            setNumImages={setNumImages}
                            setViewMode={setViewMode}
                            viewMode={viewMode}
                        />
                    </div>
                    <div
                        className={`relative ${
                            viewMode === 'pile' ? 'mt-[30vh]' : ''
                        } box-border flex flex-wrap items-center justify-center p-5`}
                    >
                        <GalleryView
                            photos={galleriesByFolder[selectedFolder]?.slice(0, numImages) || []}
                            positions={positions}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                            stopAnimation={stopAnimation}
                            viewMode={viewMode}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
