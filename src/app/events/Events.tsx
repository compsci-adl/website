import FancyRectangle from '@/components/FancyRectangle';
import { EVENTS, type Event } from '@/data/events';
import Image from 'next/image';
import { FiClock, FiMapPin } from 'react-icons/fi';

function Title() {
    return (
        <div className="flex justify-center">
            <FancyRectangle colour="yellow" offset="8">
                <div className="w-fit bg-yellow p-2">
                    <h2 className="text-center text-4xl font-bold text-grey md:text-6xl">
                        Upcoming Events
                    </h2>
                </div>
            </FancyRectangle>
        </div>
    );
}

function EventCard({ event, index }: { event: Event; index: number }) {
    return (
        <FancyRectangle colour="white" offset="8" rounded fullWidth>
            <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-4 text-black md:flex-row">
                <Image
                    src={`/images/events/${event.image}`}
                    alt={`${event.title}`}
                    width={450}
                    height={450}
                    className="w-full shrink-0 rounded-lg border-[3px] border-black bg-white object-contain md:w-[450px]"
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
                            className={`h-fit rounded-md border-[3px] border-black px-4 py-2 ${['bg-orange', 'bg-yellow', 'bg-purple'][index % 3]}`}
                        >
                            <div>{event.date.month}</div>
                            <div>{event.date.day}</div>
                        </div>
                    </div>
                    <div>{event.details}</div>
                    {event.url && (
                        <a
                            href={event.url.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold hover:underline"
                        >
                            Sign up here!
                        </a>
                    )}
                </div>
            </div>
        </FancyRectangle>
    );
}

export default function Events({ className }: { className?: string }) {
    return (
        <section className={`${className} space-y-8`}>
            <Title />
            {EVENTS.map((event, i) => (
                <EventCard key={i} index={i} event={event} />
            ))}
        </section>
    );
}
