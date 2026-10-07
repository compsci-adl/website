import type { CustomLink } from '@/data/custom-links';
import FancyRectangle from '../../components/FancyRectangle';

type LinkCardProps = CustomLink;
function LinkCard({ title, url, description }: LinkCardProps) {
    return (
        <FancyRectangle colour="white" offset="8" rounded>
            <div className="box-border flex w-[100vw] max-w-2xl flex-col items-stretch rounded-xl bg-white p-4 text-black md:p-6">
                <div className="w-full space-y-2">
                    <a
                        className="block w-full truncate rounded-lg border-[3px] border-black p-2 text-xl font-semibold hover:underline md:text-2xl"
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={title}
                    >
                        {title}
                    </a>

                    {description && (
                        <div
                            className="line-clamp-3 w-full overflow-hidden text-lg text-ellipsis md:text-xl"
                            title={description}
                        >
                            {description}
                        </div>
                    )}
                </div>
            </div>
        </FancyRectangle>
    );
}

interface LinksProps {
    links: CustomLink[];
}

export default function Links({ links = [] }: LinksProps) {
    return (
        <div className="flex w-full flex-col items-center gap-6 px-4">
            {links.length === 0 ? (
                <div className="text-center text-lg">No links available at the moment.</div>
            ) : (
                links.map((link, i) => <LinkCard {...link} key={i} />)
            )}
        </div>
    );
}
