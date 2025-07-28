import React, { useMemo } from 'react';
import GalleryCard from './GalleryCard';
import type { Photo } from './types';

interface GalleryOverviewProps {
    galleriesByFolder: { [folder: string]: Photo[] };
    onSelectFolder: (folder: string) => void;
}

export default function GalleryOverview({
    galleriesByFolder,
    onSelectFolder,
}: GalleryOverviewProps) {
    const sortedEntries = useMemo(() => {
        return Object.entries(galleriesByFolder).sort(([, a], [, b]) => {
            const getDate = (photo: Photo) =>
                new Date(
                    photo.eventDate.year,
                    photo.eventDate.month - 1,
                    photo.eventDate.day
                ).getTime();
            return getDate(b[0]) - getDate(a[0]);
        });
    }, [galleriesByFolder]);

    return (
        <>
            {sortedEntries.map(([folder, images]) => (
                <GalleryCard
                    key={folder}
                    folder={folder}
                    images={images}
                    onSelectFolder={onSelectFolder}
                />
            ))}
        </>
    );
}
