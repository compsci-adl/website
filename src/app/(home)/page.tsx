import Duck from '@/components/Duck';
import FancyRectangle from '@/components/FancyRectangle';
import ImageCarousel from '@/components/ImageCarousel';
import Title from '@/components/Title';
import { eventURL, parseEvents, EVENTS, type Event } from '@/data/events';
import { CAROUSEL_IMAGES } from '@/data/home';
import { SPONSOR_TYPES, getSponsors } from '@/data/sponsors';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import UpcomingEventCard from './UpcomingEventCard';

const getEventDate = (event: Event) => {
    return new Date(
        `${event.date.year} ${event.date.month} ${event.date.day} ${event.date.endTime}`
    );
};

export async function getEvents() {
    const res = await fetch(eventURL);
    const data = await res.json();
    const payloadData = data.docs;
    for (let docNum in payloadData) {
        const newEvent = parseEvents(payloadData[docNum]);
        EVENTS.push(newEvent);
        console.log(newEvent);
    }
}

await getEvents();
const CURRENT_DATE = new Date();
const UPCOMING_EVENTS = EVENTS.filter((event) => getEventDate(event) >= CURRENT_DATE);

export default function HomePage() {   
    return (
        <main className="relative">
            {/* Hero Section */}
            <section className="mb-8 flex font-black">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left side */}
                    <div>
                        {/* Grid */}
                        <Image
                            src="/images/square-grid.svg"
                            alt="Square Grid"
                            width={500}
                            height={500}
                            className="absolute -z-10 ml-8 mt-8 w-[60vw] max-w-[800px] md:w-[70vw] lg:w-[50vw]"
                        />

                        <div className="relative z-10">
                            <h1 className="text-5xl lg:text-7xl 2xl:text-8xl">LEARN,</h1>
                            <div className="h-2" />
                            <h1 className="text-5xl lg:text-7xl 2xl:text-8xl">SOCIALISE,</h1>
                            <div className="h-2" />

                            <Title colour="yellow" font="font-black">
                                CODE.
                            </Title>
                            <div className="h-4 md:h-8" />
                            <FancyRectangle colour="orange" offset="8" filled={false}>
                                <div className="w-fit bg-orange px-2 py-2">
                                    <h2 className="text-xl md:text-3xl">Computer Science Club</h2>
                                </div>
                            </FancyRectangle>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="mt-12 w-full transition-all duration-500 md:w-auto lg:ml-10 lg:mt-0">
                        <div className="relative z-10 mr-2">
                            <FancyRectangle colour="purple" offset="8" filled>
                                <div className="relative h-full w-full bg-white">
                                    <ImageCarousel
                                        images={CAROUSEL_IMAGES}
                                        width={2132}
                                        height={1600}
                                    />
                                </div>
                            </FancyRectangle>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div
                        className={`flex flex-col justify-around ${UPCOMING_EVENTS.length === 0 ? 'lg:col-span-2' : ''}`}
                    >
                        <div>
                            <div className="relative z-10 mt-12 flex flex-col text-2xl font-black lg:mt-12 lg:text-3xl">
                                <h3>New Members are</h3>
                                <div className="mt-2 w-fit bg-purple px-2">
                                    <h3 className="text-grey">Always Welcome</h3>
                                </div>
                            </div>
                            <div className="relative z-10 mt-4 border-2 border-white bg-grey px-4 py-4 md:px-6 md:py-6">
                                <p className="text-lg md:text-xl">
                                    As a member, some of the perks you&apos;ll have access to
                                    include computer science talks and workshops, catered social
                                    events, and a wide network of other computer science students
                                    and graduates to learn from and make friends with.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="relative z-10 mt-4 flex flex-row items-center text-2xl font-black lg:text-3xl">
                                <h3 className="">First-Year Perks</h3>
                                <Image
                                    src="/images/yellow-star.svg"
                                    alt="Yellow Star"
                                    className="ml-4 h-10"
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className="relative z-10 mt-4 border-2 border-white bg-grey px-4 py-4 md:px-6 md:py-6">
                                <p className="text-lg md:text-xl">
                                    Are you a first year student? The Club runs activities at the
                                    start of the year specifically for you, giving you a chance to
                                    meet other students, and helping you ease into uni life.
                                </p>
                            </div>
                        </div>
                    </div>

                    {UPCOMING_EVENTS.length > 0 && (
                        <div className="relative z-10 mt-12 text-2xl font-black md:flex-row lg:ml-10 lg:mt-12 lg:text-3xl">
                            <div className="flex lg:justify-end">
                                <h3>Upcoming Events</h3>
                            </div>

                            <div className="mt-4 space-y-6">
                                {UPCOMING_EVENTS.map((event, i) => (
                                    <UpcomingEventCard key={i} event={event} index={i} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <hr className="mb-10 mt-16 h-0.5 bg-white"></hr>

            {/* Club info cards */}
            <section>
                {/* <Grid /> */}
                <Image
                    src="/images/square-grid.svg"
                    alt="Square Grid"
                    width={500}
                    height={500}
                    className="absolute -z-10 mt-12 w-0 max-w-[800px] lg:ml-36 lg:w-[50vw]"
                />

                <div className="mr-2 grid auto-rows-fr grid-cols-1 gap-8 text-xl lg:grid-cols-3">
                    <FancyRectangle colour="white" offset="8" filled fullWidth fullHeight>
                        <div className="flex h-full flex-col">
                            <div className="w-full border-4 border-black bg-purple px-4 py-4 md:px-6 md:py-6">
                                <h3 className="text-2xl font-black text-grey lg:text-3xl">Learn</h3>
                            </div>
                            <div className="-mt-2 h-full w-fit border-4 border-black bg-white px-4 py-4 md:px-6 md:py-6">
                                <div className="relative text-lg text-black md:text-xl">
                                    <p>
                                        The club has a major focus on{' '}
                                        <span className="relative inline-block">
                                            education
                                            <span className="absolute left-0 top-0 h-full w-full bg-purple opacity-30"></span>
                                        </span>{' '}
                                        and learning. We run workshops to assist students with their
                                        studies and host other educational events such as talks and
                                        guest lectures.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FancyRectangle>
                    <FancyRectangle colour="white" offset="8" filled fullWidth fullHeight>
                        <div className="flex h-full flex-col">
                            <div className="w-full border-4 border-black bg-yellow px-4 py-4 md:px-6 md:py-6">
                                <h3 className="text-2xl font-black text-grey lg:text-3xl">
                                    Socialise
                                </h3>
                            </div>
                            <div className="-mt-2 h-full w-fit border-4 border-black bg-white px-4 py-4 md:px-6 md:py-6">
                                <div className="relative text-lg text-black md:text-xl">
                                    <p>
                                        We are primarily a{' '}
                                        <span className="relative inline-block">
                                            social club.
                                            <span className="absolute left-0 top-0 h-full w-full bg-yellow opacity-30"></span>
                                        </span>{' '}
                                        Events such as meet & greets, games / movies nights, BBQs,
                                        and pub crawls are just some of the social events the club
                                        runs each year.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FancyRectangle>
                    <FancyRectangle colour="white" offset="8" filled fullWidth fullHeight>
                        <div className="flex h-full flex-col">
                            <div className="w-full border-4 border-black bg-orange px-4 py-4 md:px-6 md:py-6">
                                <h3 className="text-2xl font-black text-grey lg:text-3xl">Code</h3>
                            </div>
                            <div className="-mt-2 h-full w-fit border-4 border-black bg-white px-4 py-4 md:px-6 md:py-6">
                                <div className="relative text-lg text-black md:text-xl">
                                    <p>
                                        <span className="relative inline-block">
                                            Coding
                                            <span className="absolute left-0 top-0 h-full w-full bg-orange opacity-30"></span>
                                        </span>{' '}
                                        is what we do and love. Whether you&apos;re looking for some
                                        feedback on a project or have technical questions, the club
                                        is a great way to meet and learn from others.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FancyRectangle>
                </div>
            </section>
            {/* **** */}

            {/* Sponsors Section */}
            <section>
                <div className="relative z-10 mt-12 flex flex-row items-center text-2xl font-black md:text-4xl lg:mt-20 lg:text-5xl">
                    <Image
                        src="/images/yellow-triangle.svg"
                        alt="Yellow Triangle"
                        className="mb-12 mr-4"
                        width={30}
                        height={30}
                    />

                    <div>
                        <h3>Supported By </h3>
                        <div className="flex flex-col smr:flex-row">
                            <h3 className="mb-2 mr-2 md:mb-0">Industry&apos;s </h3>
                            <FancyRectangle colour="orange" offset="6" filled={false}>
                                <div className="w-fit bg-orange px-2">
                                    <h2>Greatest</h2>
                                </div>
                            </FancyRectangle>
                        </div>
                    </div>
                </div>
                <div className="relative z-10 mt-16 space-y-4">
                    {SPONSOR_TYPES.map((type) => {
                        const sponsors = getSponsors(type);
                        if (sponsors.length === 0) return;
                        return (
                            <Fragment key={type}>
                                <h3 className="text-center text-2xl font-black capitalize smr:text-left lg:text-3xl">
                                    {type} Sponsors
                                </h3>
                                <div className="flex flex-wrap justify-center gap-6 pb-2 smr:justify-start">
                                    {sponsors.map(({ image, website, name }, i) => (
                                        <a href={website} key={i} className="block" target="_blank">
                                            <FancyRectangle colour="white" offset="10">
                                                <Image
                                                    src={`/images/sponsors/${image}`}
                                                    alt={`${name} Logo`}
                                                    width={250}
                                                    height={250}
                                                    className="h-[150px] w-[150px] bg-white object-contain p-2 md:h-[250px] md:w-[250px]"
                                                />
                                            </FancyRectangle>
                                        </a>
                                    ))}
                                </div>
                            </Fragment>
                        );
                    })}
                </div>
            </section>

            {/* CTA part 2 */}
            <section className="mb-[1em] lg:mb-[6em] xl:mb-[10em]">
                <div className="h-24" />
                <div className="mb-[3em] md:mb-[8em] lg:mb-[6em]">
                    {/* <Grid /> */}
                    <Image
                        src="/images/rectangle-grid.svg"
                        alt="Rectangle Grid"
                        width={500}
                        height={500}
                        className="absolute -z-10 mt-10 w-[25em] md:w-[40em] lg:w-[45em]"
                    />
                </div>

                <div className="z-10">
                    <div className="relative z-10 w-fit xl:ml-12">
                        <div className="relative mb-2 flex flex-row justify-end space-x-4 *:h-8 md:*:h-10">
                            <Duck colour="white" outline />
                            <Duck colour="white" outline />
                            <Duck colour="white" />
                            <Duck colour="white" />
                            <Duck colour="white" />
                        </div>
                        <div className="relative z-10 flex flex-row">
                            <div className="h-auto w-16 bg-orange" />
                            <div className="relative flex flex-col">
                                <span className="relative bg-white py-8 pl-4 pr-16 text-3xl font-black text-black lg:pr-32 lg:text-6xl">
                                    Thinking about <span className="text-orange">Joining?</span>
                                </span>
                                <p className="border-2 border-white bg-grey py-6 pl-4 pr-16 text-lg lg:pr-32 lg:text-2xl">
                                    New members are always welcome.{' '}
                                    <Link
                                        className="font-bold underline hover:text-yellow"
                                        href={'/join'}
                                    >
                                        Join us today!
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
)};
