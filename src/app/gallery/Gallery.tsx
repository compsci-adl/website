import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import './App.css';
import photosData from './photos.json';

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
        setFolders([...new Set(photosData.map((photo) => photo.folder))]);
        setSelectedFolder([...new Set(photosData.map((photo) => photo.folder))][0]);
    }, []);

    const filteredPhotos = useMemo(() => {
        return photosData.filter((photo) => photo.folder === selectedFolder);
    }, [selectedFolder]);

    const shuffledPhotos = useMemo(() => {
        return [...filteredPhotos]
            .map((photo) => ({
                ...photo,
                orientation: photo.orientation as 'portrait' | 'landscape',
            }))
            .sort(() => 0.5 - Math.random())
            .slice(0, numImages);
    }, [filteredPhotos, numImages]);

    useEffect(() => {
        if (selectedFolder) {
            setPhotos(shuffledPhotos);
            const initialPositions: {
                [key: number]: { x: number; y: number; rotate: number };
            } = {};
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
        const filteredPhotos = photosData.filter((photo) => photo.folder === selectedFolder);
        const allShuffledPhotos = [...filteredPhotos]
            .map((photo) => ({
                ...photo,
                orientation: photo.orientation as 'portrait' | 'landscape',
            }))
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
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
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
                    const nextIndex = (currentIndex + 1) % folders.length;
                    return folders[nextIndex];
                });
            }, 60000);
        } else {
            if (animationInterval.current) {
                clearInterval(animationInterval.current);
            }
            if (folderChangeInterval.current) {
                clearInterval(folderChangeInterval.current);
            }
        }
    };

    // Stop animation
    const stopAnimation = () => {
        setAnimateToggle(false);
        if (animationInterval.current) {
            clearInterval(animationInterval.current);
        }
        if (folderChangeInterval.current) {
            clearInterval(folderChangeInterval.current);
        }
    };

    return (
        <div>
            <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="folder-select"
            >
                {folders.map((folder) => (
                    <option key={folder} value={folder}>
                        {folder
                            .split('-')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                    </option>
                ))}
            </select>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi-chevron-down-folder"
                viewBox="0 0 16 16"
            >
                <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
            </svg>

            <select
                value={numImages}
                onChange={(e) => setNumImages(Number(e.target.value))}
                className="num-images-select"
            >
                {[10, 20, 30, 40, 50].map((num) => (
                    <option key={num} value={num}>
                        {num} Images
                    </option>
                ))}
            </select>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi-chevron-down-images"
                viewBox="0 0 16 16"
            >
                <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
            </svg>
            <button onClick={shufflePhotos} className="shuffle-button">
                Shuffle
            </button>

            <button onClick={handleAnimateToggle} className="animate-toggle-button">
                {animateToggle ? 'Stop Animation' : 'Start Animation'}
            </button>

            <div className="gallery" ref={galleryRef}>
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
                                          scale: {
                                              type: 'spring',
                                              stiffness: 100,
                                              damping: 25,
                                          },
                                          opacity: { duration: 0.4 },
                                          rotate: {
                                              type: 'spring',
                                              stiffness: 100,
                                              damping: 25,
                                          },
                                      },
                                  }
                                : {
                                      opacity: 1,
                                      scale: 0.5,
                                      rotate: positions[index]?.rotate,
                                      transition: {
                                          scale: {
                                              type: 'spring',
                                              stiffness: 100,
                                              damping: 25,
                                          },
                                          opacity: { duration: 0.4 },
                                          rotate: {
                                              type: 'spring',
                                              stiffness: 100,
                                              damping: 25,
                                          },
                                      },
                                  },
                    };

                    return (
                        <motion.div
                            key={index}
                            variants={variants}
                            className={`polaroid ${photo.orientation}`}
                            initial="initial"
                            animate="animate"
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
