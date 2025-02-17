'use client';

import FancyRectangle from '@/components/FancyRectangle';
import { EVENTS, type Event, eventURL, parseEvents } from '@/data/events';
import { DateTime } from 'luxon';
import EventsByYear from './EventsByYear';
import { useState, useEffect } from "react";
import { SkeletonLoader } from './EventSkeleton';

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

const getEventDate = (event: Event) => {
    const dateStr = `${event.date.year}-${event.date.month}-${event.date.day}T${event.date.endTime}`;
    return DateTime.fromFormat(dateStr, "yyyy-MMM-d'T'HH:mm", {
        zone: 'Australia/Adelaide',
    }).toJSDate();
};

export default function Events({ className }: { className?: string }) {
    const [loading, setLoading] = useState(true);   

    // Await API call from payload for EVENTS
    useEffect(() => {
        fetch(eventURL, {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => {
            const payloadData = data.docs;
            for (let docNum in payloadData) {
                const newEvent = parseEvents(payloadData[docNum]);
                EVENTS.push(newEvent);
            }
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching events", error);
            setLoading(false);
        })
    })
    
    // API call successful return Events page
    if (!loading) {
        const CURRENT_DATE = new Date();
        const CURRENT_YEAR = CURRENT_DATE.getFullYear();

        // Create empty objects to hold upcoming and past events categorised by year
        const upcomingEvents: Record<number, Event[]> = {};
        const pastEvents: Record<number, Event[]> = {};

        // Categorise events by year and whether they are upcoming or past
        EVENTS.forEach((event) => {
            const eventDate = getEventDate(event);
            const year = event.date.year;

            console.log(event.image);

            if (eventDate >= CURRENT_DATE) {
                (upcomingEvents[year] ||= []).push(event);
            } else {
                (pastEvents[year] ||= []).push(event);
            }
        });

        // Reverse the order of events within each year (i.e., most recent event at the top)
        Object.values(upcomingEvents).forEach((events) => events.reverse());
        Object.values(pastEvents).forEach((events) => events.reverse());

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
