import Links from '@/app/links/Links';
import Duck from '@/components/Duck';
import Title from '@/components/Title';
import type { CustomLink } from '@/data/custom-links';
import { fetchLinks } from '@/data/custom-links';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Links',
};

export default async function LinksPage() {
    const links: CustomLink[] = await fetchLinks();

    return (
        <main className="flex flex-col items-center gap-10 px-8 md:px-0">
            <div className="flex items-center gap-8">
                <Title colour="yellow">Links</Title>
            </div>
            <div className="flex max-w-3xl flex-col items-center gap-4 border-x-4 border-white p-4 text-center text-lg md:p-5 md:text-2xl">
                <div>Check out these important external links recommended by</div>
                <div className="flex max-w-3xl flex-col items-center gap-4 p-4 text-center text-lg md:p-5 md:text-2xl">
                    {/* Mobile */}
                    <div className="block text-base text-xl font-semibold md:hidden">
                        The CS Club
                    </div>

                    {/* Desktop */}
                    <Duck colour="yellow" size={80} className="hidden md:block" />
                </div>
            </div>
            <Links links={links} />
        </main>
    );
}
