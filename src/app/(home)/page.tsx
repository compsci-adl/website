import FancyRectangle from '@/components/FancyRectangle';
import Title from '@/components/Title';
import Image from 'next/image';
import ImageCarousel from './ImageCarousel';

export default function HomePage() {
    return (
        <div className="relative">
            <main className="mx-4 md:mx-10">
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
                                <h1 className="text-5xl md:text-8xl">LEARN,</h1>
                                <div className="h-2"></div>
                                <h1 className="text-5xl md:text-8xl">SOCIALISE,</h1>
                                <div className="h-2"></div>

                                <Title colour="yellow">Code.</Title>
                                <div className="h-4 md:h-8"></div>
                                <FancyRectangle
                                    colour="orange"
                                    offset="8 md:offset-16"
                                    filled={false}
                                >
                                    <div className="w-fit bg-orange px-2 py-2">
                                        <h2 className="text-xl md:text-3xl">
                                            Computer Science Club
                                        </h2>
                                    </div>
                                </FancyRectangle>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="mt-12 w-full transition-all duration-500 md:w-auto lg:ml-20 lg:mt-0">
                            <ImageCarousel />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section>
                    <div className="relative z-10 mt-12 flex flex-col text-2xl font-black md:flex-row lg:mt-24 lg:text-3xl">
                        <h3>New Members are</h3>
                        <div className="mt-2 w-fit bg-purple px-2 md:ml-2 md:mt-0">
                            <h3 className=" text-grey">Always Welcome</h3>
                        </div>
                    </div>
                    <div className="relative z-10 mt-4 border-2 border-white bg-grey px-4 py-4 md:px-6 md:py-6">
                        <p className="text-lg md:text-xl">
                            As a member, some of the perks you&apos;ll have access to include
                            computer science talks and workshops, catered social events, and a wide
                            network of other computer science students and graduates to learn from
                            and make friends with.
                        </p>
                    </div>
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
                            Are you a first year student? The Club runs activities at the start of
                            the year specifically for you, giving you a chance to meet other
                            students, and helping you ease into uni life.
                        </p>
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

                    <div className="mr-2 grid grid-cols-1 gap-8 text-xl lg:grid-cols-3">
                        <FancyRectangle colour="white" offset="8" filled={true}>
                            <div className="flex flex-col">
                                <div className="w-full border-4 border-black bg-purple px-4 py-4 md:px-6 md:py-6">
                                    <h3 className="text-2xl font-black text-grey lg:text-3xl">
                                        Learn
                                    </h3>
                                </div>
                                <div className="-mt-2 w-fit border-4 border-black bg-white px-4 py-4 md:px-6 md:py-6">
                                    <div className="relative text-lg text-black md:text-xl">
                                        <p>
                                            The club has a major focus on{' '}
                                            <span className="relative inline-block">
                                                education
                                                <span className="absolute left-0 top-0 h-full w-full bg-purple opacity-30"></span>
                                            </span>{' '}
                                            and learning. We run workshops to assist students with
                                            their studies and host other educational events such as
                                            talks and guest lectures.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FancyRectangle>
                        <FancyRectangle colour="white" offset="8" filled={true}>
                            <div className="flex flex-col">
                                <div className="w-full border-4 border-black bg-yellow px-4 py-4 md:px-6 md:py-6">
                                    <h3 className="text-2xl font-black text-grey lg:text-3xl">
                                        Socialise
                                    </h3>
                                </div>
                                <div className="-mt-2 w-fit border-4 border-black bg-white px-4 py-4 md:px-6 md:py-6">
                                    <div className="relative text-lg text-black md:text-xl">
                                        <p>
                                            We are primarily a{' '}
                                            <span className="relative inline-block">
                                                social club.
                                                <span className="absolute left-0 top-0 h-full w-full bg-yellow opacity-30"></span>
                                            </span>{' '}
                                            Events such as meet & greets, games / movies nights,
                                            BBQs, and pub crawls are just some of the social events
                                            the club runs each year.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FancyRectangle>
                        <FancyRectangle colour="white" offset="8" filled={true}>
                            <div className="flex flex-col">
                                <div className="w-full border-4 border-black bg-orange px-4 py-4 md:px-6 md:py-6">
                                    <h3 className="text-2xl font-black text-grey lg:text-3xl">
                                        Code
                                    </h3>
                                </div>
                                <div className="-mt-2 w-fit border-4 border-black bg-white px-4 py-4 md:px-6 md:py-6">
                                    <div className="relative text-lg text-black md:text-xl">
                                        <p>
                                            <span className="relative inline-block">
                                                Coding
                                                <span className="absolute left-0 top-0 h-full w-full bg-orange opacity-30"></span>
                                            </span>{' '}
                                            is what we do and love. Whether you&apos;re looking for
                                            some feedback on a project or have technical questions,
                                            the club is a great way to meet and learn from others.
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
                            <div className="flex flex-col md:flex-row">
                                <h3 className="mb-2 mr-2 md:mb-0">Industry&apos;s </h3>
                                <FancyRectangle colour="orange" offset="6" filled={false}>
                                    <div className="w-fit bg-orange px-2">
                                        <h2>Greatest</h2>
                                    </div>
                                </FancyRectangle>
                            </div>
                        </div>
                    </div>
                    <h3 className="relative z-10 mt-16 flex flex-row text-2xl font-black lg:text-3xl">
                        Gold Sponsors
                    </h3>
                    <div className="h-48"></div>
                    <h3 className="relative z-10 mt-4 flex flex-row text-2xl font-black lg:text-3xl">
                        Silver Sponsors
                    </h3>
                    <div className="h-48"></div>
                    <h3 className="relative z-10 mt-4 flex flex-row text-2xl font-black lg:text-3xl">
                        Bronze Sponsors
                    </h3>
                    <div className="h-48"></div>
                </section>

                {/* CTA part 2 */}
                <section>
                    <div className="h-24"></div>
                    <div className="mb-[3em] md:mb-[8.75em] lg:md:mb-[11.3em]">
                        {/* <Grid /> */}
                        <Image
                            src="/images/rectangle-grid.svg"
                            alt="Rectangle Grid"
                            width={500}
                            height={500}
                            className="absolute -z-10 mt-12 w-[20em] md:w-[35em] lg:w-[35em]"
                        />
                    </div>

                    <div className="relative z-10 ml-[2.5em] flex w-fit flex-col md:ml-[4.4em]">
                        <div className="relative mb-2 flex flex-row justify-end">
                            <Image
                                src="/images/white-duck-outline.svg"
                                alt="White Duck Outline"
                                className="ml-4 h-8 md:h-10"
                                height={50}
                                width={50}
                            />

                            <Image
                                src="/images/white-duck-outline.svg"
                                alt="White Duck"
                                className="ml-4 h-8 md:h-10"
                                height={50}
                                width={50}
                            />

                            <Image
                                src="/images/white-duck.svg"
                                alt="White Duck"
                                className="ml-4 h-8 md:h-10"
                                height={50}
                                width={50}
                            />

                            <Image
                                src="/images/white-duck.svg"
                                alt="White Duck"
                                className="ml-4 h-8 md:h-10"
                                height={50}
                                width={50}
                            />
                            <Image
                                src="/images/white-duck.svg"
                                alt="White Duck"
                                className="ml-4 h-8 md:h-10"
                                height={50}
                                width={50}
                            />
                            <Image
                                src="/images/white-duck.svg"
                                alt="White Duck"
                                className="ml-4 h-8 md:h-10"
                                height={50}
                                width={50}
                            />
                        </div>
                        <div className="relative z-10 flex flex-row">
                            <div className="h-auto w-10 bg-orange"></div>
                            <div className="relative flex flex-col">
                                <span className="relative bg-white px-4 py-2 text-2xl font-black text-black lg:text-3xl">
                                    Thinking about <span className="text-orange"> Joining?</span>
                                </span>
                                <p className="border-2 border-white bg-grey px-4 py-2 text-lg lg:text-xl">
                                    New members are always welcome!
                                </p>
                            </div>
                        </div>{' '}
                    </div>

                    <div className="h-16 smr:h-24 md:h-32 lg:h-20"></div>
                </section>
            </main>
        </div>
    );
}
