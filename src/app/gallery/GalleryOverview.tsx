import { motion } from 'framer-motion';
import type { Photo } from './types';

interface GalleryOverviewProps {
    galleriesByFolder: { [folder: string]: Photo[] };
    onSelectFolder: (folder: string) => void;
}

export default function GalleryOverview({
    galleriesByFolder,
    onSelectFolder,
}: GalleryOverviewProps) {
    const sortedEntries = Object.entries(galleriesByFolder).sort(([, a], [, b]) => {
        const getDate = (photo: Photo) =>
            new Date(
                photo.eventDate.year,
                photo.eventDate.month - 1,
                photo.eventDate.day
            ).getTime();
        return getDate(b[0]) - getDate(a[0]);
    });

    return (
        <>
            {sortedEntries.map(([folder, images]) => {
                const pile = images
                    .filter((photo) => photo.orientation === 'landscape')
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);

                const displayName = folder
                    .split('-')
                    .filter((w) => !/^20\d{2}$/.test(w) && !/^S[12]$/i.test(w))
                    .map((w) => w[0].toUpperCase() + w.slice(1))
                    .join(' ');

                return (
                    <div
                        key={folder}
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
            })}
        </>
    );
}
