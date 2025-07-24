import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface GalleryControlsProps {
    mode: 'overview' | 'gallery';
    setMode: (mode: 'overview' | 'gallery') => void;
    shufflePhotos: () => void;
    animateToggle: boolean;
    handleAnimateToggle: () => void;
    setCurrentTitle: (title: string) => void;
    numImages: number;
    setNumImages: (num: number) => void;
    viewMode: 'pile' | 'standard';
    setViewMode: (mode: 'pile' | 'standard') => void;
}

export default function GalleryControls({
    mode,
    setMode,
    shufflePhotos,
    animateToggle,
    handleAnimateToggle,
    setCurrentTitle,
    numImages,
    setNumImages,
    viewMode,
    setViewMode,
}: GalleryControlsProps) {
    // Automatically set "All Images" in standard mode
    useEffect(() => {
        if (viewMode === 'standard' && numImages !== Number.MAX_SAFE_INTEGER) {
            setNumImages(Number.MAX_SAFE_INTEGER);
        }
    }, [viewMode, numImages, setNumImages]);

    const isStandard = viewMode === 'standard';

    if (mode !== 'gallery') return null;

    const numOptions = [
        { value: 10, label: '10 Images' },
        { value: 25, label: '25 Images' },
        { value: 50, label: '50 Images' },
        { value: 75, label: '75 Images' },
        { value: 100, label: '100 Images' },
        { value: Number.MAX_SAFE_INTEGER, label: 'All Images' },
    ];

    return (
        <>
            {/* Desktop/Tablet */}
            <div className="relative hidden h-full w-full flex-col items-start justify-center gap-8 text-grey md:flex">
                <Button
                    onClick={() => {
                        setCurrentTitle('Photo Gallery');
                        setMode('overview');
                    }}
                    type="button"
                    colour="orange"
                    className="flex items-center gap-2"
                >
                    <FaArrowLeft />
                    Back to All Galleries
                </Button>

                <Button
                    onClick={() => setViewMode(isStandard ? 'pile' : 'standard')}
                    type="button"
                    colour="orange"
                >
                    Switch to {isStandard ? 'Polaroid View' : 'Standard View'}
                </Button>

                {!isStandard && (
                    <>
                        <Dropdown
                            options={numOptions}
                            value={numImages}
                            onChange={(val) => setNumImages(Number(val))}
                            colour="orange"
                            size="base"
                        />

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
                    </>
                )}
            </div>

            {/* Mobile */}
            <div className="fixed bottom-0 left-0 right-0 z-20 flex h-16 items-center justify-around border-t border-gray-300 bg-white px-2 text-grey shadow-inner md:hidden">
                <Button
                    onClick={() => {
                        setCurrentTitle('Photo Gallery');
                        setMode('overview');
                    }}
                    type="button"
                    size="small"
                    colour="orange"
                    className="flex h-10 w-20"
                >
                    Back
                </Button>

                <Button
                    onClick={() => setViewMode(isStandard ? 'pile' : 'standard')}
                    type="button"
                    size="small"
                    colour="orange"
                    className="flex h-10 w-20"
                >
                    {isStandard ? 'Polaroid' : 'Standard'}
                </Button>

                {!isStandard && (
                    <>
                        <Dropdown
                            options={numOptions}
                            value={numImages}
                            onChange={(val) => setNumImages(Number(val))}
                            colour="orange"
                            size="small"
                            className="flex h-10 w-24"
                        />

                        <Button
                            onClick={shufflePhotos}
                            type="button"
                            size="small"
                            colour="orange"
                            className="flex h-10 w-20"
                        >
                            Shuffle
                        </Button>
                    </>
                )}
            </div>
        </>
    );
}
