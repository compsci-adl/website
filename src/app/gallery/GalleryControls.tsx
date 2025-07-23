import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import { useEffect } from 'react';
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

    if (mode !== 'gallery') return null;

    const isStandard = viewMode === 'standard';

    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 text-grey md:items-start">
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
                        options={[
                            { value: 10, label: '10 Images' },
                            { value: 20, label: '20 Images' },
                            { value: 30, label: '30 Images' },
                            { value: 40, label: '40 Images' },
                            { value: 50, label: '50 Images' },
                            { value: Number.MAX_SAFE_INTEGER, label: 'All Images' },
                        ]}
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
    );
}
