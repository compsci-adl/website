import FancyRectangle from '@/components/FancyRectangle';
import { type Event } from '@/data/events';
import Link from 'next/link';
import { FiClock, FiMapPin } from 'react-icons/fi';

function UpcomingEventCard({ event, index }: { event: Event; index: number }) {
    const hyphenatedID = event.title.replaceAll(' ', '-');

    return (
        <FancyRectangle colour="white" offset="8" rounded fullWidth>
            <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-4 text-black lg:flex-row">
                <Link href={`/events#${hyphenatedID}-${event.date.year}`}>
                    <div className="grow space-y-2 md:space-y-4">
                        <div className="flex gap-6">
                            <div
                                className={`h-fit rounded-md border-[3px] border-black px-4 py-2 text-xl ${['bg-orange', 'bg-yellow', 'bg-purple'][index % 3]}`}
                            >
                                <div>{event.date.month}</div>
                                <div>{event.date.day}</div>
                            </div>
                            <div className="grow space-y-2 text-2xl">
                                <h4 className="md:border-b-[3px] md:border-black md:pb-1">
                                    {event.title}
                                </h4>
                                <div className="flex gap-2 text-lg font-normal">
                                    <span>
                                        <FiClock size={26} />
                                    </span>
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex gap-2 text-lg font-normal">
                                    <span>
                                        <FiMapPin size={26} />
                                    </span>
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </FancyRectangle>
    );
}

export default UpcomingEventCard;
