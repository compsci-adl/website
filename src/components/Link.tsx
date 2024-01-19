import type { Colour } from '@/constants/colours';
import type { IconType } from 'react-icons';
import FancyRectangle from './FancyRectangle';

interface LinkProps {
    name: string;
    link: string;
    icon: IconType;
    colour: Colour;
    iconClassName?: string;
}

export default function Link({ name, link, icon: Icon, colour, iconClassName }: LinkProps) {
    return (
        <FancyRectangle colour={colour} offset="4" filled={true}>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit h-fit p-1.5 bg-white border-2 border-black transition-colors duration-300 hover:bg-orange hover:text-white"
                aria-label={name}
            >
                <Icon className={iconClassName} />
            </a>
        </FancyRectangle>
    );
}
