import Image from 'next/image';

function Duck({ filled, index }: { filled?: boolean; index: number }) {
    const duckImageName = filled ? 'yellowDuck.svg' : 'greyDuckOutline.svg';
    const duckImageAlt = filled ? 'Yellow Duck' : 'Grey Duck Outline';

    return (
        <div className="flex items-center justify-center">
            <Image
                src={`/images/${duckImageName}`}
                alt={duckImageAlt}
                className="h-10 md:h-12 scale-x-[-1]"
                height={100}
                width={100}
            />
            <div className="absolute mt-20 text-black font-bold">{index}</div>
        </div>
    );
}

export default function ProgressBar({ step }: { step: number }) {
    return (
        <div className="flex items-end justify-center mt-4 mb-12">
            {new Array(step).fill(null).map((_, i) => (
                <Duck filled index={i + 1} key={i} />
            ))}
            {new Array(4 - step).fill(null).map((_, i) => (
                <Duck index={step + i + 1} key={i} />
            ))}
        </div>
    );
}
