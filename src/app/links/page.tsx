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
    // Get links from payload
    const links: CustomLink[] = await fetchLinks();

    return (
        <main className="flex flex-col items-center gap-10">
            <div className="flex items-center gap-8">
                <Title colour="yellow">Links</Title>
            </div>
            <div className="flex max-w-3xl flex-col items-center gap-4 border-x-4 border-white p-2 text-center text-lg md:p-5 md:text-2xl">
                <div>Check out these important external links recommended by</div>
                <Duck colour="yellow" size={80} className="hidden md:block" />
            </div>
            <Links links={links} />
        </main>
    );
}
