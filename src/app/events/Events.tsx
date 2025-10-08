'use client';

import FancyRectangle from '@/components/FancyRectangle';
import { type Event } from '@/data/events';
import { fetchEvents } from '@/data/events';
import useSWR from 'swr';
import { SkeletonLoader } from './EventSkeleton';
import EventsByYear from './EventsByYear';

function Title({ children }: { children: string }) {
    return (
        <div className="flex justify-center">
            <FancyRectangle colour="yellow" offset="8">
                <div className="w-fit bg-yellow p-2">
                    <h2 className="text-center text-4xl font-bold text-grey md:text-6xl">
                        {children}
                    </h2>
                </div>
            </FancyRectangle>
        </div>
    );
}

export default function Events({ className }: { className?: string }) {
    const { data: EVENTS, isLoading } = useSWR('events', fetchEvents);

    if (!isLoading && EVENTS) {
        const CURRENT_TIME = new Date();
        const CURRENT_YEAR = CURRENT_TIME.getFullYear();

        // Create empty objects to hold upcoming and past events categorised by year
        const upcomingEvents: Record<number, Event[]> = {};
        const pastEvents: Record<number, Event[]> = {};

        // Categorise events by year and whether they are upcoming or past
        EVENTS.forEach((event) => {
            const year = event.date.year;

            if (event.date.timestamp >= CURRENT_TIME) {
                (upcomingEvents[year] ||= []).push(event);
            } else {
                (pastEvents[year] ||= []).push(event);
            }
        });

        Object.values(upcomingEvents).forEach((events) =>
            events.sort((a, b) => a.date.timestamp.getTime() - b.date.timestamp.getTime())
        );
        Object.values(pastEvents).forEach((events) =>
            events.sort((a, b) => b.date.timestamp.getTime() - a.date.timestamp.getTime())
        );

        const getSortedYears = (events: Record<number, Event[]>) =>
            Object.keys(events).map(Number).reverse();

        const currentYear = getSortedYears(upcomingEvents);
        const pastYears = getSortedYears(pastEvents);

        return (
            <section className={`${className} space-y-8`}>
                {currentYear.length > 0 && (
                    <>
                        <Title>Upcoming Events</Title>
                        {currentYear.map((year) => (
                            <EventsByYear
                                key={year}
                                year={year}
                                events={upcomingEvents[year]}
                                isOpenDefault={year === CURRENT_YEAR}
                            />
                        ))}
                    </>
                )}

                {pastYears.length > 0 && (
                    <>
                        <div className="h-4"></div>
                        <Title>Past Events</Title>
                        {pastYears.map((year) => (
                            <EventsByYear
                                key={year}
                                year={year}
                                events={pastEvents[year]}
                                isOpenDefault={year === CURRENT_YEAR}
                                isPastEvent
                            />
                        ))}
                    </>
                )}
            </section>
        );
        // API call unsuccessful return loader
    } else {
        return (
            <section className={`${className} space-y-8`}>
                <Title>Upcoming Events</Title>
                <SkeletonLoader></SkeletonLoader>
            </section>
        );
    }
}
