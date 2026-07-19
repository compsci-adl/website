import { env } from '@/env.mjs';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const searchParams = new URL(request.url).search;
    const cmsPath = slug.join('/');
    let baseUrl = env.NEXT_PUBLIC_PAYLOAD_URI || 'http://127.0.0.1:4000';

    if (process.env.NODE_ENV === 'development') {
        baseUrl = baseUrl.replace('localhost', '127.0.0.1');
    } else {
        baseUrl = baseUrl.replace('localhost', 'payload').replace('127.0.0.1', 'payload');
    }

    const targetURL = `${baseUrl}/api/${cmsPath}${searchParams}`;

    try {
        const res = await fetch(targetURL, {
            next: { revalidate: 300 },
        });
        if (!res.ok) {
            return NextResponse.json(
                { error: `Failed to fetch ${cmsPath} from CMS` },
                { status: res.status }
            );
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(`Error in CMS proxy for ${cmsPath}:`, error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
