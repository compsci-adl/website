import FancyRectangle from '@/components/FancyRectangle';
import { EVENTS, type Event } from '@/data/events';
import Image from 'next/image';
import { FiClock, FiMapPin } from 'react-icons/fi';

function Title({ title }: { title: string }) {
    return (
        <div className="flex justify-center">
            <FancyRectangle colour="yellow" offset="8">
                <div className="w-fit bg-yellow p-2">
                    <h2 className="text-center text-4xl font-bold text-grey md:text-6xl">
                        {title}
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
                </div>
            </div>
        </FancyRectangle>
    );
}

export default function Events({ className }: { className?: string }) {
    const currentDate = new Date(); // Current timestamp

    // Convert event date and check if upcoming event
    const upcomingEvents = EVENTS.filter((event) => {
        const eventDate = new Date(
            `${event.date.year} ${event.date.month} ${event.date.day} ${event.endTime}`
        );
        console.log('event: ' + eventDate);
        return eventDate >= currentDate;
    });

    // Convert event date, check if past event and reverse events
    const pastEvents = EVENTS.filter((event) => {
        const eventDate = new Date(
            `${event.date.year} ${event.date.month} ${event.date.day} ${event.endTime}`
        );
        return eventDate < currentDate;
    }).reverse();

    return (
        <section className={`${className} space-y-8`}>
            <Title title="Upcoming Events" />
            {upcomingEvents.map((event, i) => (
                <EventCard key={i} index={i} event={event} />
            ))}

            {pastEvents.length > 0 && (
                <>
                    <Title title="Past Events" />
                    {pastEvents.map((event, i) => (
                        <EventCard key={i} index={i} event={event} isPastEvent={true} />
                    ))}
                </>
            )}
        </section>
    );
}
