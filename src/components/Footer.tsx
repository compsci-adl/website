import { SiGithub, SiLinkedin, SiFacebook, SiInstagram, SiDiscord } from 'react-icons/si';
import { IoMdMail } from 'react-icons/io';
import { LINKS } from '@/util/links';

const ICONS = new Map([
    ['discord', SiDiscord],
    ['linkedin', SiLinkedin],
    ['github', SiGithub],
    ['facebook', SiFacebook],
    ['instagram', SiInstagram],
    ['email', IoMdMail],
]);

export default function Footer({ className, ...props }: JSX.IntrinsicElements['footer']) {
    const links = LINKS.map(({ name, link }) => {
        const Icon = ICONS.get(name);
        if (Icon === undefined) throw new Error(`Icon for link ${name} undefined`);
        return (
            <a
                key={name}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={`${name} link`}
            >
                <Icon className="h-7 w-7 text-black hover:opacity-70 motion-safe:transition-opacity" />
            </a>
        );
    });

    return (
        <footer className={`w-full pb-5 ${className ?? ''}`} {...props}>
            <hr className="mb-4 h-[0.2rem] w-full bg-black" />
            <div className="md flex flex-col content-center justify-between gap-4 md:flex-row">
                <p className="text-md lg:text-lg">
                    &copy; The University of Adelaide Computer Science Club.
                </p>
                <div className="flex flex-row gap-4">{links}</div>
            </div>
        </footer>
    );
}
