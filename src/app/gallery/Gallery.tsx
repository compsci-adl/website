'use client';

import Button from '@/components/Button';
import { fetchGalleries } from '@/data/gallery';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import './tailwind-overrides.css';

interface Photo {
    url: string;
    orientation: 'portrait' | 'landscape';
    folder: string;
    eventDate: { year: number; month: number; day: number };
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
    const [mode, setMode] = useState<'overview' | 'gallery'>('overview');
    const [loading, setLoading] = useState(true);

    const isDragging = useRef(false);
    const galleryRef = useRef<HTMLDivElement>(null);
    const animationInterval = useRef<NodeJS.Timeout | null>(null);
    const folderChangeInterval = useRef<NodeJS.Timeout | null>(null);

    // Fetch galleries from CMS and transform to Photo[]
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

    const filteredPhotos = useMemo(() => {
        return photos.filter((photo) => photo.folder === selectedFolder);
    }, [photos, selectedFolder]);

    const shuffledPhotos = useMemo(() => {
        return [...filteredPhotos].sort(() => 0.5 - Math.random()).slice(0, numImages);
    }, [filteredPhotos, numImages]);

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

    const handleDragStart = () => {
        isDragging.current = true;
    };

    const handleDragEnd = () => {
        isDragging.current = false;
    };

    const handleAnimateToggle = () => {
        setAnimateToggle((prev) => !prev);
        if (!animateToggle) {
            animationInterval.current = setInterval(() => {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * shuffledPhotos.length);
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
        <div className="relative">
            {mode === 'gallery' && (
                <div className="relative flex h-full w-full flex-col items-start justify-center gap-8">
                    <Button
                        onClick={() => {
                            setMode('overview');
                            setActiveIndex(null);
                        }}
                        type="button"
                        colour="orange"
                    >
                        Back to All Galleries
                    </Button>
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
            )}

            <div
                ref={galleryRef}
                className="relative box-border flex flex-wrap items-center justify-center p-5"
            >
                {mode === 'overview'
                    ? Object.entries(galleriesByFolder).map(([folder, images]) => {
                          const pile = [...images]
                              .filter((photo) => photo.orientation === 'landscape')
                              .sort(() => 0.5 - Math.random())
                              .slice(0, 3);
                          return (
                              <div
                                  key={folder}
                                  className="flex cursor-pointer flex-col items-center"
                                  onClick={() => {
                                      setSelectedFolder(folder);
                                      setMode('gallery');
                                  }}
                              >
                                  <div className="relative h-[20em] w-[25em]">
                                      {pile.map((photo, i) => (
                                          <motion.div
                                              key={i}
                                              initial={{
                                                  opacity: 0,
                                                  scale: 0.8,
                                                  rotate: -10 + i * 10,
                                                  zIndex: i,
                                                  x: i * 6,
                                                  y: i * 6,
                                              }}
                                              animate={{
                                                  opacity: 1,
                                                  scale: 0.8,
                                                  rotate: -10 + i * 10,
                                                  x: i * 6,
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
                                  <div className="mb-8 text-center text-xl font-semibold text-white">
                                      <div>
                                          {folder
                                              .split('-')
                                              .filter(
                                                  (w) =>
                                                      !/^20\d{2}$/.test(w) && // remove years
                                                      !/^S[12]$/i.test(w) // remove semesters
                                              )
                                              .map((w) => w[0].toUpperCase() + w.slice(1))
                                              .join(' ')}
                                      </div>
                                      <div className="font-normal">
                                          {images[0]?.eventDate
                                              ? new Date(
                                                    images[0].eventDate.year,
                                                    images[0].eventDate.month - 1,
                                                    images[0].eventDate.day
                                                ).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })
                                              : ''}
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : galleriesByFolder[selectedFolder]?.map((photo, index) => {
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
                                      left: `${positions[index]?.x}rem`,
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
            </div>
        </div>
    );
}
