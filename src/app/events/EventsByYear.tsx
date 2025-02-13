import { type Event } from '@/data/events';
import Image from 'next/image';
import { useState } from 'react';
import EventCard from './EventCard';

export default function EventsByYear({
    year,
    events,
    isOpenDefault,
    isPastEvent,
}: {
    year: number;
    events: Event[];
    isOpenDefault: boolean;
    isPastEvent?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(isOpenDefault);

    return (
        <div>
            {isPastEvent && (
                <div
                    className="flex cursor-pointer items-center justify-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Image
                        src="/images/yellow-triangle.svg"
                        alt="Yellow Triangle"
                        className={`mr-4 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-90' : 'rotate-120'}`}
                        width={30}
                        height={30}
                    />
                    <h3 className="text-3xl font-bold md:text-4xl">{year.toString()}</h3>
                </div>
            )}
            {isOpen && (
                <div className="mt-6 space-y-8">
                    {events.map((event, i) => (
                        <EventCard key={i} index={i} event={event} isPastEvent={isPastEvent} />
                    ))}
                </div>
            )}
        </div>
    );
}
