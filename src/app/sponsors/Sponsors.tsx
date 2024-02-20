							import { SPONSOR_TYPES, getSponsors, type Sponsor, type SponsorType } from '@/data/sponsors';
							import Image from 'next/image';
							import { Fragment } from 'react';
							import FancyRectangle from '../../components/FancyRectangle';
							
							const SPONSOR_TYPE_COLORS = {
                        gold: '#FCC018',
                        silver: '#C3C3C3',
                        bronze: '#E8903F',
							} as const satisfies Record<SponsorType, string>;
							function SponsorTypeTitle({ type }: { type: SponsorType }) {
                        const color = SPONSOR_TYPE_COLORS[type];
                        return (
                    <h3 className="flex items-center gap-5">
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
                    </h3>
                        );
							}
							type SponsorCardProps = Sponsor & { reverse?: boolean };
							function SponsorCard({ image, name, description, website, type, reverse }: SponsorCardProps) {
                        return (
                    <FancyRectangle colour="white" offset="8" rounded>
                <div
            className={`flex flex-col items-stretch gap-5 rounded-xl bg-white p-4 text-black md:p-6 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                >
            <Image
        src={`/images/sponsors/${image}`}
        alt={`${name} logo`}
        width={250}
        height={250}
        className="w-full shrink-0 bg-white object-contain p-4 md:w-[250px]"
            />
            <div className="space-y-2">
        <div className="flex items-center gap-4">
    <a
className="grow rounded-lg border-[3px] border-black p-2 text-xl hover:underline md:text-2xl"
href={website}
target="_blank"
    >
{name}
    </a>
    <Image
src={`/images/sponsors/level-star/${type}.svg`}
alt="Level Star"
width={53}
height={53}
className="h-12 w-12 md:h-14 md:w-14"
    />
        </div>
        <div className="text-lg md:text-xl">{description}</div>
            </div>
                </div>
                    </FancyRectangle>
                        );
							}
							
							export default function Sponsors() {
                        let count = 0;
                        return (
                    <div className="space-y-9">
                {SPONSOR_TYPES.map((type) => {
            const sponsors = getSponsors(type);
            if (sponsors.length === 0) return;
            return (
        <Fragment key={type}>
    <SponsorTypeTitle type={type} />
    {sponsors.map((sponsor, i) => (
<SponsorCard {...sponsor} key={i} reverse={Boolean(count++ % 2)} />
    ))}
        </Fragment>
            );
                })}
                    </div>
                        );
							}
							