import Link from '@/components/Link';
import Paragraph from '@/components/Paragraph';
import type { Colour } from '@/constants/colours';
import { LINKS } from '@/data/links';

const LINK_BORDER_COLOURS = {
    Email: 'yellow',
    GitHub: 'orange',
    Instagram: 'purple',
    TikTok: 'yellow',
    Facebook: 'orange',
    Discord: 'purple',
    LinkedIn: 'yellow',
    YouTube: 'orange',
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
            <div className="flex flex-wrap justify-center gap-4 text-3xl md:text-5xl">
                {LINKS.map((link, i) => (
                    <Link {...link} borderColour={LINK_BORDER_COLOURS[link.name]} key={i} />
                ))}
            </div>
        </div>
    );
}
