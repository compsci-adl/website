import Image from 'next/image';

interface ProgressBarProps {
    ducksFilled: number;
}

function ProgressBar({ ducksFilled }: ProgressBarProps) {
    const renderDucks = () => {
        const ducks = [];
        for (let i = 1; i <= 4; i++) {
            const duckColor = i <= ducksFilled ? 'yellowDuck.svg' : 'greyDuckOutline.svg';
            ducks.push(
                <div key={i} className="flex items-center justify-center">
                    <Image
                        src={`/images/${duckColor}`}
                        alt={i <= ducksFilled ? 'Yellow Duck' : 'Grey Duck Outline'}
                        className="h-10 md:h-12 scale-x-[-1]"
                        height={100}
                        width={100}
                    />
                    <div className="absolute mt-20 text-bla ck font-bold">{i}</div>
                </div>
            );
        }
        return ducks;
    };

    return <div className="flex items-end justify-center mt-4 mb-12">{renderDucks()}</div>;
}

export default ProgressBar;
