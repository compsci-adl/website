import { type Event } from '@/data/events';
import { DateTime } from 'luxon';

// Function to format the date to DD/MM/YY format
export const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
};

// Returns a JS Date for an event's end time in Australia/Adelaide timezone
export const getEventDate = (event: Event): Date => {
    const dateStr = `${event.date.year}-${event.date.month}-${event.date.day}T${event.endTime}`;
    return DateTime.fromFormat(dateStr, "yyyy-MMM-d'T'HH:mm", {
        zone: 'Australia/Adelaide',
    }).toJSDate();
};
