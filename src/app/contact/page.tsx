import { IoMdMail } from 'react-icons/io';
import { SiFacebook, SiDiscord } from 'react-icons/si';
import Footer from './Footer';
import StyledLink from '@/components/StyledLink';

const CONTACT_PLATFORMS = [
    { name: 'facebook', icon: SiFacebook, link: 'https://m.me/compsci.adl' },
    { name: 'discord', icon: SiDiscord, link: 'https://discord.gg/UjvVxHA' },
    { name: 'email', icon: IoMdMail, link: 'mailto:contact@csclub.org.au' },
];

export default function Contact() {
    const contacts = CONTACT_PLATFORMS.map(({ name, icon, link }) => {
        const Icon = icon;
        return (
            <a key={name} href={link} target="_blank" rel="noopener noreferrer" aria-label={name}>
                <Icon className="h-12 w-12 text-black hover:opacity-70 motion-safe:transition-opacity" />
            </a>
        );
    });

    return (
        <main className="relative z-10 flex h-auto w-responsive flex-col items-center justify-center">
            <section className="flex w-full flex-col items-center justify-start gap-6 pt-[10em] max-md:pb-12 md:pt-[16em]">
                <h1 className="text-center text-5xl font-bold md:text-6xl lg:text-primary-heading">
                    CONTACT
                </h1>
            </section>

            <section className="w-full content-center pt-12 text-center md:pt-16 lg:pt-20">
                <h2 className="text-xl md:text-3xl">
                    Contact us on the following platforms or by email
                </h2>
                <div className="flex w-full flex-row content-center justify-center gap-4 py-4">
                    {contacts}
                </div>
            </section>

            <section className="w-full content-center pt-12 text-center md:pt-16 lg:pt-20">
                <h2 className="text-xl md:text-3xl">
                    For sponsorships, please email{' '}
                    <StyledLink href="mailto:sponsorships@csclub.org.au">
                        sponsorships@csclub.org.au
                    </StyledLink>
                </h2>
            </section>

            <Footer />
        </main>
    );
}
