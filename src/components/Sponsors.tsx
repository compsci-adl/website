import { SPONSORS, type Sponsor, type SponsorType } from '@/data/sponsors';
import Image from 'next/image';
import FancyRectangle from './FancyRectangle';

type SponsorCardProps = Sponsor & { reverse?: boolean };
function SponsorCard({ image, name, description, website, type, reverse }: SponsorCardProps) {
    return (
        <div
            className={`flex flex-col items-stretch gap-5 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}
        >
            <div className="flex h-64 shrink-0 items-center justify-center bg-white md:h-auto md:w-64">
                <Image
                    src={`/images/sponsors/${image}`}
                    alt={`${name} Logo`}
                    width={200}
                    height={200}
                />
            </div>
            <div>
                <FancyRectangle colour="white" offset="8" rounded>
                    <div className="space-y-2 rounded-xl bg-white p-4 text-black md:p-6">
                        <div className="flex items-center gap-4">
                            <a
                                className="grow rounded-lg border-[3px] border-black p-2 text-xl hover:underline md:text-2xl"
                                href={website}
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
                </FancyRectangle>
            </div>
        </div>
    );
}

const GOLD_SPONSORS = SPONSORS.filter(({ type }) => type === 'gold');
const SILVER_SPONSORS = SPONSORS.filter(({ type }) => type === 'silver');
const BRONZE_SPONSORS = SPONSORS.filter(({ type }) => type === 'bronze');

interface SponsorsProps {
    typeTitle: (type: SponsorType) => React.ReactNode;
    className?: string;
}
export default function Sponsors({ typeTitle, className }: SponsorsProps) {
    return (
        <div className={`${className} space-y-9`}>
            {GOLD_SPONSORS.length > 0 && (
                <>
                    {typeTitle('gold')}
                    {GOLD_SPONSORS.map((sponsor, i) => (
                        <SponsorCard {...sponsor} key={i} reverse={Boolean(i % 2)} />
                    ))}
                </>
            )}
            {SILVER_SPONSORS.length > 0 && (
                <>
                    {typeTitle('silver')}
                    {SILVER_SPONSORS.map((sponsor, i) => (
                        <SponsorCard
                            {...sponsor}
                            key={i}
                            reverse={Boolean((GOLD_SPONSORS.length + i) % 2)}
                        />
                    ))}
                </>
            )}
            {BRONZE_SPONSORS.length > 0 && (
                <>
                    {typeTitle('bronze')}
                    {BRONZE_SPONSORS.map((sponsor, i) => (
                        <SponsorCard
                            {...sponsor}
                            key={i}
                            reverse={Boolean(
                                (GOLD_SPONSORS.length + SILVER_SPONSORS.length + i) % 2
                            )}
                        />
                    ))}
                </>
            )}
        </div>
    );
}
