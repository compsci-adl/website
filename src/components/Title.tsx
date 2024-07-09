import FancyRectangle from '@/components/FancyRectangle';
import { BG_COLOURS, type Colour } from '@/constants/colours';

interface TitleProps {
    children: string;
    colour: Colour;
    font?: string;
}

export default function Title({ children, colour, font }: TitleProps) {
    return (
        <FancyRectangle colour={colour} offset="8">
            <div className={`w-fit p-3 ${BG_COLOURS[colour]}`}>
                <h1 className={`text-center text-5xl text-grey md:text-7xl ${font ?? 'font-bold'}`}>
                    {children}
                </h1>
            </div>
        </FancyRectangle>
    );
}
