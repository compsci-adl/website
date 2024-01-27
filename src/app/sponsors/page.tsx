import Sponsors from '@/app/sponsors/Sponsors';
import Paragraph from '@/components/Paragraph';
import Title from '@/components/Title';
import { YEAR } from '@/data/sponsors';
import Image from 'next/image';

export default function SponsorsPage() {
    return (
        <main className="flex flex-col items-center gap-10">
            <div className="flex gap-8">
                <Image
                    src="/images/yellow-duck.svg"
                    alt="Duck"
                    width={500}
                    height={500}
                    className="hidden w-20 md:block"
                />
                <Title colour="yellow">{`${YEAR} Sponsors`}</Title>
                <Image
                    src="/images/yellow-duck.svg"
                    alt="Duck"
                    width={500}
                    height={500}
                    className="hidden w-20 md:block"
                />
            </div>
            <div className="max-w-3xl border-x-4 border-white p-2 text-center text-lg md:p-5 md:text-2xl">
                The <b>University of Adelaide Computer Science Club</b> are proudly supported by our{' '}
                <b>generous sponsors</b>. Their unwavering support make events and workshops
                possible, fostering an environment for aspiring tech enthusiastic to excel within
                our community.
            </div>
            <Sponsors />
            <Paragraph>
                If you&apos;d like to partner with us, please enquire at:{' '}
                <a href="mailto:sponsorships@csclub.org.au" className="underline">
                    sponsorships@csclub.org.au
                </a>
            </Paragraph>
        </main>
    );
}
