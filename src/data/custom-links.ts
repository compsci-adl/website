import { env } from '@/env.mjs';
import { fetcher } from '@/lib/fetcher';
import { resolveCmsUrl } from '@/lib/payload';

export type CustomLink = {
    title: string;
    url: string;
    description?: string;
};

interface ApiCustomLink {
    id: string;
    title: string;
    url: string;
    description?: string;
}

export const customLinksURL = env.NEXT_PUBLIC_PAYLOAD_URI + '/api/links?limit=20';

export async function fetchLinks(): Promise<CustomLink[]> {
    try {
        const data = await fetcher.get.query([
            resolveCmsUrl(customLinksURL),
            { next: { revalidate: 300 }, prefixUrl: '' },
        ]);

        return (data.docs || []).map((link: ApiCustomLink) => ({
            title: link.title,
            url: link.url,
            description: link.description,
        }));
    } catch (error) {
        console.error('Error fetching links:', error);
        return [];
    }
}
