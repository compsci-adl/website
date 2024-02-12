import FancyRectangle from '@/components/FancyRectangle';
import { BG_COLOURS, type Colour } from '@/constants/colours';

interface TitleProps {
    children: string;
    colour: Colour;
}

export default function Title({ children, colour }: TitleProps) {
    return (
        <FancyRectangle colour={colour} offset="8">
            <div className={`w-fit p-2 ${BG_COLOURS[colour]}`}>
                <h1 className="text-center text-5xl font-bold text-grey md:text-8xl">{children}</h1>
            </div>
        </FancyRectangle>
    );
}
