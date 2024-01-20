import type { Colour } from '@/constants/colours';
import type { IconType } from 'react-icons';
import FancyRectangle from './FancyRectangle';

interface LinkProps {
    name: string;
    link: string;
    icon: IconType;
    borderColour: Colour;
}

export default function Link({ name, link, icon: Icon, borderColour }: LinkProps) {
    return (
        <FancyRectangle colour={borderColour} offset="4" filled={true}>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit h-fit p-1.5 bg-white border-2 border-black transition-colors duration-300 hover:bg-orange hover:text-white"
                aria-label={name}
            >
                <Icon />
            </a>
        </FancyRectangle>
    );
}
