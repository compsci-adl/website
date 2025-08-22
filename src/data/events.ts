import type { Image } from '@/components/ImageCarousel';
import { env } from '@/env.mjs';
import { fetcher } from '@/lib/fetcher';

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
    date: { year: number; month: Month; day: number };
    time: string;
    location: string;
    details: string;
    url?: { href: URL; text?: string };
    image: string;
    startTime: string;
    endTime: string;
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
export const eventURL = env.NEXT_PUBLIC_PAYLOAD_URI + '/api/events?limit=100';

/*
    Fetches events from Payload CMS and transforms them into the required format.
*/
export async function fetchEvents(): Promise<Event[]> {
    try {
        // Fetching event data from payload with fetcher
        const data = await fetcher.get.query([eventURL, { cache: 'no-store', prefixUrl: '' }]);

        const payloadData = data.docs;
        const EVENTS: Event[] = [];

        // Process and parse events
        for (const docNum in payloadData) {
            const newEvent = parseEvents(payloadData[docNum]);
            EVENTS.push(newEvent);
        }

        // Sort events by date (ascending)
        EVENTS.sort((a, b) => {
            const dateA = new Date(`${a.date.year}-${a.date.month}-${a.date.day}`);
            const dateB = new Date(`${b.date.year}-${b.date.month}-${b.date.day}`);
            return dateA.getTime() - dateB.getTime();
        });

        return EVENTS;
    } catch (error) {
        console.error('Error fetching events:', error);
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
        },
        time: raw.time
            ? `${new Date(raw.time.start).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} - 
            ${new Date(raw.time.end).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
            : 'Unknown',
        // endTime & startTime are in "HH:mm" 24-hour format (e.g., "21:00")
        endTime: raw.time
            ? new Date(raw.time.end).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
            : '21:00',
        startTime: raw.time
            ? new Date(raw.time.start).toLocaleTimeString([], {
                  hour: 'numeric',
                  minute: '2-digit',
              })
            : '00:00',
        location: raw.location,
        details: raw.details,
        url:
            raw.link && raw.link.Link
                ? { href: new URL(raw.link.Link), text: raw.link.displayText }
                : undefined,
        image: raw.banner
            ? `${env.NEXT_PUBLIC_PAYLOAD_URI}${raw.banner.url}`
            : 'public/images/events/upcoming-event.jpg', // Image is in the form of url (Needs a seperate API call)
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
