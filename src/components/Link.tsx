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
        <FancyRectangle colour={borderColour} offset="4" filled>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="h-fit w-fit border-2 border-black bg-white p-1.5 text-black transition-colors duration-300 hover:bg-orange hover:text-white"
                aria-label={name}
            >
                <Icon />
            </a>
        </FancyRectangle>
    );
}
