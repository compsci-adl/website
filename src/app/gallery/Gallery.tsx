import Button from '@/components/Button';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import photosData from './photos.json';
import './tailwind-overrides.css';

interface Photo {
    url: string;
    orientation: 'portrait' | 'landscape';
    folder: string;
}

export default function Gallery() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [positions, setPositions] = useState<{
        [key: number]: { x: number; y: number; rotate: number };
    }>({});
    const [folders, setFolders] = useState<string[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<string>('');
    const [numImages, setNumImages] = useState<number>(10);
    const [animateToggle, setAnimateToggle] = useState<boolean>(false);
    const isDragging = useRef(false);
    const galleryRef = useRef<HTMLDivElement>(null);
    const animationInterval = useRef<NodeJS.Timeout | null>(null);
    const folderChangeInterval = useRef<NodeJS.Timeout | null>(null);

    // Load photos data and set initial positions
    useEffect(() => {
        const uniqueFolders = [...new Set(photosData.map((photo) => photo.folder))];
        setFolders(uniqueFolders);
        setSelectedFolder(uniqueFolders[0]);
    }, []);

    const filteredPhotos = useMemo(() => {
        return photosData.filter((photo) => photo.folder === selectedFolder);
    }, [selectedFolder]);

    const shuffledPhotos = useMemo(() => {
        return [...filteredPhotos]
            .map((photo) => ({ ...photo, orientation: photo.orientation }))
            .sort(() => 0.5 - Math.random())
            .slice(0, numImages);
    }, [filteredPhotos, numImages]);

    useEffect(() => {
        if (selectedFolder) {
            setPhotos(shuffledPhotos);
            const initialPositions: { [key: number]: { x: number; y: number; rotate: number } } =
                {};
            shuffledPhotos.forEach((_, index) => {
                initialPositions[index] = randomPosition();
            });
            setPositions(initialPositions);
        }
    }, [selectedFolder, shuffledPhotos]);

    // Randomise x, y positions and rotation to spread them across the screen
    const randomPosition = () => {
        const minOffsetX = 8;
        const minOffsetY = -18;
        const maxOffsetX = window.innerWidth / 16 - 35;
        const maxOffsetY = window.innerHeight / 16 - 48;

        const x = Math.random() * (maxOffsetX - minOffsetX) + minOffsetX;
        const y = Math.random() * (maxOffsetY - minOffsetY) + minOffsetY;
        const rotate = Math.random() * 30 - 15;

        return { x, y, rotate };
    };

    // Shuffle function to randomise positions and rotations of the photos
    const shufflePhotos = () => {
        const allShuffledPhotos = [...photosData.filter((p) => p.folder === selectedFolder)]
            .map((photo) => ({ ...photo, orientation: photo.orientation }))
            .sort(() => 0.5 - Math.random())
            .slice(0, numImages);

        setPhotos(allShuffledPhotos);

        const shuffledPositions: { [key: number]: { x: number; y: number; rotate: number } } = {};
        allShuffledPhotos.forEach((_, index) => {
            shuffledPositions[index] = randomPosition();
        });

        setPositions(shuffledPositions);
    };

    // Handle click outside of the photo container to stop animation
    const handleOutsideClick = useCallback((event: MouseEvent) => {
        if (
            !galleryRef.current?.contains(event.target as Node) &&
            !document.querySelector('.animate-toggle-button')?.contains(event.target as Node)
        ) {
            setActiveIndex(null);
            stopAnimation();
        }
    }, []);

    // Register the event listener when the component mounts and cleanup on unmount
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [handleOutsideClick]);

    // Handle drag start and end events
    const handleDragStart = () => {
        isDragging.current = true;
    };

    const handleDragEnd = () => {
        isDragging.current = false;
    };

    // Handle animate toggle
    const handleAnimateToggle = () => {
        setAnimateToggle((prev) => !prev);
        if (!animateToggle) {
            // Change selected photo every 3 seconds
            animationInterval.current = setInterval(() => {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * photos.length);
                } while (randomIndex === activeIndex);
                setActiveIndex(randomIndex);
            }, 3000);

            // Change folder every 60 seconds
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

    // Stop animation
    const stopAnimation = () => {
        setAnimateToggle(false);
        if (animationInterval.current) clearInterval(animationInterval.current);
        if (folderChangeInterval.current) clearInterval(folderChangeInterval.current);
    };

    return (
        <div className="relative">
            {/* Folder Select */}
            {/* <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="absolute left-2.5 top-14 z-[1000] appearance-none rounded-xl bg-neutral-300 px-5 py-2.5 pr-10 text-base text-black"
            >
                {folders.map((folder) => (
                    <option key={folder} value={folder}>
                        {folder
                            .split('-')
                            .map((w) => w[0].toUpperCase() + w.slice(1))
                            .join(' ')}
                    </option>
                ))}
            </select> */}
            <svg
                className="absolute left-[13.75rem] top-[4.5rem] z-[2000] text-xl text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="16"
                height="16"
                viewBox="0 0 16 16"
            >
                <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
            </svg>

            {/* Num Images Select */}
            {/* <select
                value={numImages}
                onChange={(e) => setNumImages(Number(e.target.value))}
                className="absolute left-2.5 top-[6.9rem] z-[1000] appearance-none rounded-xl bg-neutral-300 px-5 py-2.5 pr-10 text-base text-black"
            >
                {[10, 20, 30, 40, 50].map((num) => (
                    <option key={num} value={num}>
                        {num} Images
                    </option>
                ))}
            </select> */}
            <svg
                className="absolute left-[7rem] top-[7.7rem] z-[2000] text-xl text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="16"
                height="16"
                viewBox="0 0 16 16"
            >
                <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
            </svg>

            {/* Buttons */}
            <div className="relative flex h-full w-full flex-col items-start justify-center gap-8">
                <Button onClick={shufflePhotos} type="button" colour="orange">
                    Shuffle
                </Button>
                <Button
                    onClick={handleAnimateToggle}
                    type="button"
                    colour="orange"
                    className="animate-toggle-button"
                >
                    {animateToggle ? 'Stop Animation' : 'Start Animation'}
                </Button>
            </div>

            <div
                ref={galleryRef}
                className="relative box-border flex flex-wrap items-center justify-center p-5"
            >
                {photos.map((photo, index) => {
                    const variants = {
                        initial: {
                            rotate: positions[index]?.rotate,
                            scale: 0.5,
                            opacity: 0,
                        },
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
                            className={`polaroid absolute flex cursor-pointer items-center justify-center overflow-hidden border-[1em] bg-white bg-cover bg-center shadow-[0_0.78125rem_6.25rem_-0.625rem_rgba(50,50,73,0.3),_0_0.625rem_0.625rem_-0.625rem_rgba(50,50,73,0.3)] brightness-[1.2] contrast-[.9] saturate-[.9] sepia-[.2] will-change-transform ${photo.orientation === 'portrait' ? 'h-[24em] w-[18em] border-b-[5.5em] border-t-[2em]' : 'h-[18em] w-[24em] border-l-[2em] border-r-[5.5em]'}`}
                            onClick={(e) => {
                                // Prevent triggering the outside click listener
                                e.stopPropagation();
                                // Only trigger onClick if not dragging
                                if (!isDragging.current) {
                                    setActiveIndex(activeIndex === index ? null : index);
                                    stopAnimation();
                                }
                            }}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            style={{
                                left: `${positions[index]?.x}rem`,
                                top: `${positions[index]?.y}rem`,
                            }}
                            drag
                            dragMomentum={false}
                            dragElastic={0.2}
                        >
                            <img
                                src={`/img/${selectedFolder}/${photo.url}`}
                                className="h-full w-full object-cover"
                                draggable={false}
                                loading="lazy"
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
