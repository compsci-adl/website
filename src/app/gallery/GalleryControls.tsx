import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
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
}: GalleryControlsProps) {
    if (mode !== 'gallery') return null;

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
        </div>
    );
}
