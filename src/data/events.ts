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
    date: { year: number; month: Month; day: number; timestamp: Date };
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

    // Get date part from eventDate in Adelaide timezone
    const adelaideDate = new Date(
        eventDate.toLocaleString('en-US', { timeZone: 'Australia/Adelaide' })
    );
    const isoDate = adelaideDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'

    // Get hour and minute from raw.time.end in Adelaide timezone
    let hourPart = '00:00';
    if (raw.time?.end) {
        const endTime = new Date(raw.time.end);
        const adelaideEndTime = new Date(
            endTime.toLocaleString('en-US', { timeZone: 'Australia/Adelaide' })
        );
        hourPart = `${String(adelaideEndTime.getHours()).padStart(2, '0')}:${String(adelaideEndTime.getMinutes()).padStart(2, '0')}`;
    }

    // Combine date and hour into one timestamp string using Adelaide timezone offset dynamically
    const adelaideOffsetMinutes = adelaideDate.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(adelaideOffsetMinutes) / 60)
        .toString()
        .padStart(2, '0');
    const offsetMinutes = (Math.abs(adelaideOffsetMinutes) % 60).toString().padStart(2, '0');
    const offsetSign = adelaideOffsetMinutes <= 0 ? '+' : '-';
    const combinedTimestampStr = `${isoDate}T${hourPart}:00.000${offsetSign}${offsetHours}:${offsetMinutes}`;

    // Convert to Date object
    const combinedTimestamp = new Date(combinedTimestampStr);

    return {
        title: raw.title,
        date: {
            year: adelaideDate.getFullYear(),
            month: monthNames[adelaideDate.getMonth()],
            day: adelaideDate.getDate(),
            timestamp: combinedTimestamp,
        },
        time: raw.time
            ? `${new Date(raw.time.start).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', timeZone: 'Australia/Adelaide' })} - 
            ${new Date(raw.time.end).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', timeZone: 'Australia/Adelaide' })}`
            : 'Unknown',
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
