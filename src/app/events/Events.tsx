import FancyRectangle from '@/components/FancyRectangle';
import { EVENTS, type Event } from '@/data/events';
import Image from 'next/image';
import { FiClock, FiMapPin } from 'react-icons/fi';

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

function EventCard({
    event,
    index,
    isPastEvent,
}: {
    event: Event;
    index: number;
    isPastEvent?: boolean;
}) {
    return (
        <FancyRectangle colour="white" offset="8" rounded fullWidth>
            <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-4 text-black md:flex-row">
                <Image
                    src={`/images/events/${event.image}`}
                    alt={`${event.title}`}
                    width={450}
                    height={450}
                    className={`w-full shrink-0 rounded-lg border-[3px] border-black bg-white object-contain md:w-[450px] ${isPastEvent ? 'grayscale' : ''}`}
                />
                <div className="grow space-y-2 md:space-y-4">
                    <div className="flex gap-6 font-bold">
                        <div className="grow space-y-2">
                            <h4 className="text-2xl md:border-b-[3px] md:border-black md:pb-1 md:text-3xl">
                                {event.title}
                            </h4>
                            <div className="flex gap-2">
                                <FiClock size={26} />
                                <span>{event.time}</span>
                            </div>
                            <div className="flex gap-2">
                                <FiMapPin size={26} />
                                <span>{event.location}</span>
                            </div>
                        </div>
                        <div
                            className={`h-fit rounded-md border-[3px] border-black px-4 py-2 ${['bg-orange', 'bg-yellow', 'bg-purple'][index % 3]} ${isPastEvent ? 'grayscale' : ''}`}
                        >
                            <div>{event.date.month}</div>
                            <div>{event.date.day}</div>
                        </div>
                    </div>
                    <div>{event.details}</div>
                    {event.url && (
                        <a
                            href={event.url.href.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold hover:underline"
                        >
                            {event.url.text ?? 'Click here!'}
                        </a>
                    )}
                </div>
            </div>
        </FancyRectangle>
    );
}

const getEventDate = (event: Event) => {
    return new Date(
        `${event.date.year} ${event.date.month} ${event.date.day} ${event.date.endTime}`
    );
};
const CURRENT_DATE = new Date();
const UPCOMING_EVENTS = EVENTS.filter((event) => getEventDate(event) >= CURRENT_DATE);
const PAST_EVENTS = EVENTS.filter((event) => getEventDate(event) < CURRENT_DATE).reverse(); // Most recent event first
export default function Events({ className }: { className?: string }) {
    return (
        <section className={`${className} space-y-8`}>
            {UPCOMING_EVENTS.length > 0 && (
                <>
                    <Title>Upcoming Events</Title>
                    {UPCOMING_EVENTS.map((event, i) => (
                        <EventCard key={i} index={i} event={event} />
                    ))}
                </>
            )}

            {PAST_EVENTS.length > 0 && (
                <>
                    <Title>Past Events</Title>
                    {PAST_EVENTS.map((event, i) => (
                        <EventCard key={i} index={i} event={event} isPastEvent />
                    ))}
                </>
            )}
        </section>
    );
}
