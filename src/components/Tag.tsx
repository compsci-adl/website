import type { Colour } from '@/constants/colours';
import FancyRectangle from './FancyRectangle';

interface TagProps {
    name: string;
    borderColour: Colour;
}

export default function Tag({ name, borderColour }: TagProps) {
    return (
        <FancyRectangle colour={borderColour} offset="4" filled>
            <div className="h-fit w-fit border-2 border-black bg-white p-1.5 text-black transition-colors duration-300 hover:bg-orange hover:text-white">
                <span>{name}</span>
            </div>
        </FancyRectangle>
    );
}
