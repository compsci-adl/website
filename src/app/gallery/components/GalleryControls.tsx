import Button from '@/components/Button';

interface GalleryControlsProps {
    mode: 'overview' | 'gallery';
    setMode: (mode: 'overview' | 'gallery') => void;
    shufflePhotos: () => void;
    animateToggle: boolean;
    handleAnimateToggle: () => void;
}

export default function GalleryControls({
    mode,
    setMode,
    shufflePhotos,
    animateToggle,
    handleAnimateToggle,
}: GalleryControlsProps) {
    if (mode !== 'gallery') return null;

    return (
        <div className="relative flex h-full w-full flex-col items-start justify-center gap-8">
            <Button
                onClick={() => {
                    setMode('overview');
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
    );
}
