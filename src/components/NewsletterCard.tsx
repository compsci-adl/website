'use client';

import FancyRectangle from '@/components/FancyRectangle';
import { formatDate } from '@/utils/format-date';
import React, { useEffect, useRef, useState } from 'react';

type CampaignProps = {
    id: number;
    subject?: string;
    name?: string;
    summary?: string;
    started_at?: string | null;
    firstImage?: string | null;
    onImageLoad?: () => void;
};

export default function NewsletterCard({
    id,
    subject,
    name,
    summary,
    started_at,
    firstImage,
    onImageLoad,
}: CampaignProps) {
    const [imageVisible, setImageVisible] = useState<boolean>(false);
    const [hasImageError, setHasImageError] = useState<boolean>(false);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const isSvg = Boolean(
        firstImage &&
        (/\.svg(\?.*)?$/i.test(firstImage) ||
            /^data:image\/svg\+xml/i.test(firstImage) ||
            /image\/svg\+xml/i.test(firstImage))
    );

    useEffect(() => {
        const img = imageRef.current;
        if (!img) return;
        // If already loaded (from cache), mark visible now
        if (img.complete && img.naturalWidth) {
            setImageVisible(true);
            onImageLoad?.();
            return;
        }
        function onLoad() {
            setImageVisible(true);
            onImageLoad?.();
        }
        function onError() {
            setHasImageError(true);
            onImageLoad?.();
        }
        img.addEventListener('load', onLoad);
        img.addEventListener('error', onError);
        return () => {
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
        };
    }, [onImageLoad]);
    return (
        <li key={id}>
            <FancyRectangle colour="purple" offset="8" filled fullWidth>
                <div className="z-0 w-full border-4 border-black bg-white p-8 text-black md:p-12">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h2 className="mb-2 text-lg font-bold md:text-2xl">
                                    {subject || name || 'Untitled'}
                                </h2>
                                {started_at ? (
                                    <time
                                        dateTime={started_at}
                                        className="text-muted text-sm font-bold"
                                    >
                                        {formatDate(started_at)}
                                    </time>
                                ) : null}
                            </div>
                            <p className="text-muted mt-1 text-sm">{summary || ''}</p>
                            {firstImage && !hasImageError && !isSvg && (
                                <div className="mt-2">
                                    <div
                                        className={`mx-auto flex h-64 max-w-md items-center justify-center overflow-hidden ${imageVisible ? 'w-full' : 'w-2/3 bg-gray-200'}`}
                                    >
                                        {/* Skeleton placeholder */}
                                        {!imageVisible && (
                                            <div className="h-full w-full animate-pulse" />
                                        )}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            ref={imageRef}
                                            src={firstImage as string}
                                            alt={`${subject || name || 'Newsletter'} preview`}
                                            className={`max-h-full max-w-full object-contain transition-opacity duration-500 ${imageVisible ? 'opacity-100' : 'opacity-0'}`}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="mt-2">
                                <a
                                    className="text-orange-600 underline"
                                    href={`/newsletters/${id}`}
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </FancyRectangle>
        </li>
    );
}
