import type { Image } from '@/components/ImageCarousel';
import { env } from '@/env.mjs';

type Month =
    | 'JAN'
    | 'FEB'
    | 'MAR'
    | 'APR'
    | 'MAY'
    | 'JUN'
    | 'JUL'
    | 'AUG'
    | 'SEP'
    | 'OCT'
    | 'NOV'
    | 'DEC';

export type Event = {
    title: string;
    date: { year: number; month: Month; day: number; endTime: string };
    time: string;
    location: string;
    details: string;
    url?: { href: URL; text?: string };
    image: string;
};

// API response format from PayloadCMS
export type PayloadEvent = {
    details: string;
    id: string;
    link?: { Link?: string; displayText?: string };
    location: string;
    time: { end: string; start: string };
    title: string;
    date: string;
    banner?: {
        id: string;
        alt?: string;
        filename: string;
        mimeType: string;
        filesize: number;
        width: number;
        height: number;
        focalX?: number;
        focalY?: number;
        createdAt: string;
        updatedAt: string;
        url: string;
        thumbnailURL?: string | null;
    };
};

// Payload URL
export const eventURL = env.NEXT_PUBLIC_PAYLOAD_URI + '/api/events?limit=10';

export async function fetchEvents(): Promise<Event[]> {
    try {
        const res = await fetch(eventURL, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to fetch sponsors: ${res.statusText}`);
        const data = await res.json();
        const payloadData = data.docs;
        let EVENTS: Event[] = [];
        for (let docNum in payloadData) {
            const newEvent = parseEvents(payloadData[docNum]);
            EVENTS.push(newEvent);
        }
        return EVENTS;
    } catch (error) {
        console.error('Error fetching sponsors:', error);
        return [];
    }
}

// Function to parse Payload data to Event type
export const parseEvents = (raw: PayloadEvent): Event => {
    const eventDate = new Date(raw.date);
    const monthNames: Month[] = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
    ];

    return {
        title: raw.title,
        date: {
            year: eventDate.getUTCFullYear(),
            month: monthNames[eventDate.getUTCMonth()],
            day: eventDate.getUTCDate(),
            endTime: eventDate.toString().split(' - ')[1] ?? '21:00', // if undefined 9:00pm required for Events.tsx logic
        },
        time: raw.time
            ? `${new Date(raw.time.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(raw.time.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
            : 'Unknown',
        location: raw.location,
        details: raw.details,
        url:
            raw.link && raw.link.Link
                ? { href: new URL(raw.link.Link), text: raw.link.displayText }
                : undefined,
        image: raw.banner ? `${env.NEXT_PUBLIC_PAYLOAD_URI}${raw.banner.url}` : '/placeholder.jpg', // Image is in the form of url (Needs a seperate API call)
        // TODO: add /placeholder.jpg for failed image calls
    };
};

export const CAROUSEL_IMAGES: Image[] = [
    {
        src: '/images/home/duck-ctf.jpg',
        alt: 'DuckCTF 2023',
    },
    {
        src: '/images/home/pizza.jpg',
        alt: 'Pizza at the 2023 Meet and Greet',
    },
    {
        src: '/images/home/cyber-panel.jpg',
        alt: 'Cyber Panel 2023',
    },
];
