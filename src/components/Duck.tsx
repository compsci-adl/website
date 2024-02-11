import Image from 'next/image';

interface DuckProps {
    colour: 'white' | 'yellow' | 'grey';
    outline?: boolean;
    size?: number;
    className?: string;
}

export default function Duck({ colour, outline, size = 60, className }: DuckProps) {
    return (
        <div>
            <Image
                src={`/images/ducks/${colour}${outline ? '-outline' : ''}.svg`}
                alt={`${colour} duck${outline ? ' outline' : ''}`}
                width={size}
                height={size}
                className={`${className} cursor-pointer transition-transform duration-200 active:translate-y-2 active:scale-y-75`}
            />
        </div>
    );
}
