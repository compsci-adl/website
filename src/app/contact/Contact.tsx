import Link from '@/components/Link';
import type { Colour } from '@/constants/colours';
import { LINKS } from '@/data/links';
import Paragraph from './Paragraph';

const LINK_BORDER_COLOURS = {
    Email: 'yellow',
    GitHub: 'orange',
    Instagram: 'purple',
    Facebook: 'yellow',
    Discord: 'orange',
    LinkedIn: 'purple',
} as const satisfies Record<(typeof LINKS)[number]['name'], Colour>;

export default function Contact({ className }: { className?: string }) {
    return (
        <div className={`${className} space-y-6`}>
            <Paragraph>
                Want to get in touch with us? Send us a message over on <b>Facebook</b>,{' '}
                <b>Discord</b> or{' '}
                <b>
                    email us at{' '}
                    <a href="mailto:contact@csclub.org.au" className="underline">
                        contact@csclub.org.au
                    </a>
                </b>
                .
                <br />
                <br />
                To keep up to date with our news and events, check out our Instagram!
            </Paragraph>
            <div className="flex space-x-4 text-3xl md:text-5xl justify-between">
                {LINKS.map((link, i) => (
                    <Link {...link} borderColour={LINK_BORDER_COLOURS[link.name]} key={i} />
                ))}
            </div>
        </div>
    );
}
