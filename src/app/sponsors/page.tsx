import Paragraph from '@/components/Paragraph';
import Sponsors from '@/components/Sponsors';
import Title from '@/components/Title';
import type { SponsorType } from '@/data/sponsors';
import Image from 'next/image';

const SPONSOR_TYPE_COLORS = {
    gold: '#FCC018',
    silver: '#C3C3C3',
    bronze: '#E8903F',
} as const satisfies Record<SponsorType, string>;

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
                <Title colour="yellow">{`${new Date().getFullYear()} Sponsors`}</Title>
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
            <Sponsors
                className="max-w-4xl"
                typeTitle={(type) => {
                    const color = SPONSOR_TYPE_COLORS[type];
                    return (
                        <div className="flex items-center gap-5">
                            <div className="text-3xl font-bold md:text-4xl">
                                Our{' '}
                                <span className="capitalize" style={{ color }}>
                                    {type}
                                </span>{' '}
                                Sponsors
                            </div>
                            <div
                                className="relative hidden h-[3px] grow md:block"
                                style={{ backgroundColor: color }}
                            >
                                <div
                                    className="absolute -top-[4.5px] h-[12px] w-[12px] rotate-45"
                                    style={{ backgroundColor: color }}
                                />
                                <div
                                    className="absolute -top-[4.5px] right-0 h-[12px] w-[12px] rotate-45"
                                    style={{ backgroundColor: color }}
                                />
                            </div>
                        </div>
                    );
                }}
            />
            <Paragraph>
                If you&apos;d like to partner with us, please enquire at:{' '}
                <a href="mailto:sponsorships@csclub.org.au" className="underline">
                    sponsorships@csclub.org.au
                </a>
            </Paragraph>
        </main>
    );
}
