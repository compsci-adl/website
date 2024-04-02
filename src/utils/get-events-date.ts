import { Event } from '@/data/events';

// Convert event date and return upcoming events
export function getUpcomingEvents(EVENTS: Event[]): Event[] {
    const currentDate = new Date();
    return EVENTS.filter((event) => {
        const eventDate = new Date(
            `${event.date.year} ${event.date.month} ${event.date.day} ${event.date.endTime}`
        );
        return eventDate >= currentDate;
    });
}

// Convert event date and return past events in reversed order
export function getPastEvents(EVENTS: Event[]): Event[] {
    const currentDate = new Date();
    return EVENTS.filter((event) => {
        const eventDate = new Date(
            `${event.date.year} ${event.date.month} ${event.date.day} ${event.date.endTime}`
        );
        return eventDate < currentDate;
    }).reverse();
}
