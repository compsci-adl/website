import FancyRectangle from '@/components/FancyRectangle';
import { LINKS } from '@/util/links';
import {
    FaEnvelope,
    FaGithub,
    FaInstagram,
    FaFacebook,
    FaDiscord,
    FaLinkedin,
} from 'react-icons/fa';
import type { IconType } from 'react-icons/lib';

const icons = new Map<(typeof LINKS)[number]['name'], IconType>([
    ['Email', FaEnvelope],
    ['GitHub', FaGithub],
    ['Instagram', FaInstagram],
    ['Facebook', FaFacebook],
    ['Discord', FaDiscord],
    ['LinkedIn', FaLinkedin],
]);

export default function Footer() {
    const links = LINKS.map(({ name, link }) => {
        const Icon = icons.get(name);
        if (Icon === undefined) throw new Error(`Icon for link ${name} is undefined`);
        return (
            <FancyRectangle key={name} colour="yellow" offset="4" filled={true}>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 p-1.5 bg-white border-2 border-black transition-colors duration-300 hover:bg-orange hover:text-white"
                    aria-label={name}
                >
                    <Icon className="text-2xl" />
                </a>
            </FancyRectangle>
        );
    });

    return (
        <footer className="relative z-20 pt-8 md:pt-12">
            <div className="relative bottom-4 border-t-2 border-white flex flex-col md:flex-row md:justify-between md:items-center transition-all duration-500 mx-8 md:mx-20 lg:mx-32 py-4 md:pb-8 w-responsive">
                <div className="order-2 md:order-1 text-center md:text-left mb-4 md:mb-0 text-white">
                    <p>&copy; 2024 The University of Adelaide Computer Science Club.</p>
                </div>
                {/* Social Media Links */}
                <div className="order-1 md:order-2 flex justify-center md:justify-end space-x-3 md:space-x-4 mb-4 md:mb-0 text-black">
                    {links}
                </div>
            </div>
        </footer>
    );
}
