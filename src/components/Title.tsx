import FancyRectangle from '@/components/FancyRectangle';
import { BG_COLOURS, type Colour } from '@/constants/colours';

interface TitleProps {
    className?: string;
    children: string;
    colour: Colour;
}

export default function Title({ className, children, colour }: TitleProps) {
    return (
        <div className={className}>
            <FancyRectangle colour={colour} offset="8" filled={false}>
                <div className={`w-fit px-2 ${BG_COLOURS[colour]}`}>
                    <h1 className="text-grey font-bold">{children}</h1>
                </div>
            </FancyRectangle>
        </div>
    );
}
