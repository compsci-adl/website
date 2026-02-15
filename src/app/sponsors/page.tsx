import Sponsors from '@/app/sponsors/Sponsors';
import Duck from '@/components/Duck';
import Paragraph from '@/components/Paragraph';
import Title from '@/components/Title';
import type { Sponsor } from '@/data/sponsors';
import { YEAR, fetchSponsors } from '@/data/sponsors';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sponsors',
};

export default async function SponsorsPage() {
    // Get sponsors from payload
    const sponsors: Sponsor[] = await fetchSponsors();

    return (
        <main className="flex flex-col items-center gap-10">
            <div className="flex items-center gap-8">
                <Duck colour="yellow" size={80} className="hidden md:block" />
                <Title colour="yellow">{`${YEAR} Sponsors`}</Title>
                <Duck colour="yellow" size={80} className="hidden md:block" />
            </div>
            <div className="max-w-3xl border-x-4 border-white p-2 text-center text-lg md:p-5 md:text-2xl">
                The <b>Adelaide University Computer Science Club</b> is proudly supported by our{' '}
                <b>generous sponsors</b>. Their unwavering support make events and workshops
                possible, fostering an environment for aspiring tech enthusiasts to excel within our
                community.
            </div>
            <Sponsors sponsors={sponsors} />
            <Paragraph>
                If you&apos;d like to partner with us, please enquire at:{' '}
                <a href="mailto:sponsorships@csclub.org.au" className="underline">
                    sponsorships@csclub.org.au
                </a>
            </Paragraph>
        </main>
    );
}
