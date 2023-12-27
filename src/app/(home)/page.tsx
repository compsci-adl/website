import FancyRectangle from '@/components/FancyRectangle';
import Image from 'next/image';
import ImageCarousel from './ImageCarousel';

export default function Home() {
    return (
        <div className="relative z-10 bg-background h-fit w-responsive top-8 text-white">
            <main className="mx-4 md:mx-10 px-4 py-8">
                {/* Hero Section */}
                <section className="mb-8 font-black flex pt-24 md:pt-32 lg:pt-48">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left side */}
                        <div>
                            {/* Grid */}
                            <Image
                                src="/images/squareGrid.svg"
                                alt="Square Grid"
                                width={500}
                                height={500}
                                className="absolute -z-10 ml-8 mt-8 w-[60vw] md:w-[70vw] lg:w-[50vw] max-w-[800px]"
                            />

                            <div className="relative z-10">
                                <h1 className="text-5xl md:text-8xl">LEARN,</h1>
                                <div className="h-2"></div>
                                <h1 className="text-5xl md:text-8xl">SOCIALISE,</h1>
                                <div className="h-2"></div>

                                <FancyRectangle
                                    colour="yellow"
                                    offset="8 md:offset-16"
                                    filled={false}
                                >
                                    <div className="bg-yellow w-fit px-2">
                                        <h1 className="text-5xl md:text-8xl text-background">
                                            CODE.
                                        </h1>
                                    </div>
                                </FancyRectangle>
                                <div className="h-4 md:h-8"></div>
                                <FancyRectangle
                                    colour="orange"
                                    offset="8 md:offset-16"
                                    filled={false}
                                >
                                    <div className="bg-orange w-fit px-2 py-2">
                                        <h2 className="text-xl md:text-3xl">
                                            Computer Science Club
                                        </h2>
                                    </div>
                                </FancyRectangle>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="mt-12 lg:mt-0 lg:ml-20 w-full md:w-auto transition-all duration-500">
                            <ImageCarousel />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section>
                    <div className="flex flex-col md:flex-row relative z-10 font-black text-2xl lg:text-3xl mt-12 lg:mt-24">
                        <h3>New Members are</h3>
                        <div className="bg-purple w-fit px-2 md:ml-2 mt-2 md:mt-0">
                            <h3 className=" text-background">Always Welcome</h3>
                        </div>
                    </div>
                    <div className="relative bg-background border-white border-2 px-4 py-4 md:px-6 md:py-6 mt-4 z-10">
                        <p className="text-base md:text-xl">
                            As a member, some of the perks you&apos;ll have access to include
                            computer science talks and workshops, catered social events, and a wide
                            network of other computer science students and graduates to learn from
                            and make friends with.
                        </p>
                    </div>
                    <div className="flex flex-row relative z-10 font-black text-2xl lg:text-3xl mt-4 items-center">
                        <h3 className="">First-Year Perks</h3>
                        <Image
                            src="/images/yellowStar.svg"
                            alt="Yellow Star"
                            className="ml-4 h-10"
                            width={50}
                            height={50}
                        />
                    </div>
                    <div className="relative bg-background border-white border-2 px-4 py-4 md:px-6 md:py-6 mt-4 z-10">
                        <p className="text-base md:text-xl">
                            Are you a first year student? The Club runs activities at the start of
                            the year specifically for you, giving you a chance to meet other
                            students, and helping you ease into uni life.
                        </p>
                    </div>
                </section>

                <hr className="mt-16 mb-10 h-0.5 bg-white"></hr>

                {/* Club info cards */}
                <section>
                    {/* <Grid /> */}
                    <Image
                        src="/images/squareGrid.svg"
                        alt="Square Grid"
                        width={500}
                        height={500}
                        className="absolute -z-10 w-0 lg:w-[50vw] max-w-[800px] mt-12 lg:ml-36"
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mr-2 text-xl">
                        <FancyRectangle colour="white" offset="8" filled={true}>
                            <div className="flex flex-col">
                                <div className="bg-purple w-full px-4 py-4 md:px-6 md:py-6 border-4 border-black">
                                    <h3 className="text-2xl lg:text-3xl text-background font-black">
                                        Learn
                                    </h3>
                                </div>
                                <div className="bg-white w-fit px-4 py-4 md:px-6 md:py-6 border-4 -mt-2 border-black">
                                    <div className="relative text-base md:text-xl text-black">
                                        <p>
                                            The club has a major focus on{' '}
                                            <span className="relative inline-block">
                                                education
                                                <span className="absolute top-0 left-0 bg-purple opacity-30 w-full h-full"></span>
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
                                <div className="bg-yellow w-full px-4 py-4 md:px-6 md:py-6 border-4 border-black">
                                    <h3 className="text-2xl lg:text-3xl text-background font-black">
                                        Socialise
                                    </h3>
                                </div>
                                <div className="bg-white w-fit px-4 py-4 md:px-6 md:py-6 border-4 -mt-2 border-black">
                                    <div className="relative text-base md:text-xl text-black">
                                        <p>
                                            We are primarily a{' '}
                                            <span className="relative inline-block">
                                                social club.
                                                <span className="absolute top-0 left-0 bg-yellow opacity-30 w-full h-full"></span>
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
                                <div className="bg-orange w-full px-4 py-4 md:px-6 md:py-6 border-4 border-black">
                                    <h3 className="text-2xl lg:text-3xl text-background font-black">
                                        Code
                                    </h3>
                                </div>
                                <div className="bg-white w-fit px-4 py-4 md:px-6 md:py-6 border-4 -mt-2 border-black">
                                    <div className="relative text-base md:text-xl text-black">
                                        <p>
                                            <span className="relative inline-block">
                                                Coding
                                                <span className="absolute top-0 left-0 bg-orange opacity-30 w-full h-full"></span>
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
                    <div className="flex flex-row relative z-10 font-black text-2xl md:text-4xl lg:text-5xl mt-12 lg:mt-20 items-center">
                        <Image
                            src="/images/yellowTriangle.svg"
                            alt="Yellow Triangle"
                            className="mr-4 mb-12"
                            width={30}
                            height={30}
                        />

                        <div>
                            <h3>Supported By </h3>
                            <div className="flex flex-col md:flex-row">
                                <h3 className="mr-2 mb-2 md:mb-0">Industry&apos;s </h3>
                                <FancyRectangle colour="orange" offset="6" filled={false}>
                                    <div className="bg-orange w-fit px-2">
                                        <h2>Greatest</h2>
                                    </div>
                                </FancyRectangle>
                            </div>
                        </div>
                    </div>
                    <h3 className="flex flex-row relative z-10 font-black text-2xl lg:text-3xl mt-16">
                        Gold Sponsors
                    </h3>
                    <div className="h-48"></div>
                    <h3 className="flex flex-row relative z-10 font-black text-2xl lg:text-3xl mt-4">
                        Silver Sponsors
                    </h3>
                    <div className="h-48"></div>
                    <h3 className="flex flex-row relative z-10 font-black text-2xl lg:text-3xl mt-4">
                        Bronze Sponsors
                    </h3>
                    <div className="h-48"></div>
                </section>

                {/* CTA part 2 */}
                <section>
                    <div className="h-24"></div>
                    <div className="mb-24 md:mb-32 lg:mb-44">
                        {/* <Grid /> */}
                        <Image
                            src="/images/rectanglegrid.svg"
                            alt="Rectangle Grid"
                            width={500}
                            height={500}
                            className="absolute -z-10 w-[20em] md:w-[35em] lg:w-[35em] mt-12"
                        />
                    </div>

                    <div className="flex flex-col relative z-10 w-fit ml-12">
                        <div className="flex flex-row relative mb-2 justify-end">
                            <Image
                                src="/images/whiteDuckOutline.svg"
                                alt="White Duck Outline"
                                className="ml-4 h-8 md:h-10"
                                height={50}
                                width={50}
                            />

                            <Image
                                src="/images/whiteDuckOutline.svg"
                                alt="White Duck"
                                className="ml-4 h-8 md:h-10"
                                height={50}
                                width={50}
                            />

                            <Image
                                src="/images/whiteDuck.svg"
                                alt="White Duck"
                                className="ml-4 h-8 md:h-10"
                                height={50}
                                width={50}
                            />

                            <Image
                                src="/images/whiteDuck.svg"
                                alt="White Duck"
                                className="ml-4 h-8 md:h-10"
                                height={50}
                                width={50}
                            />
                            <Image
                                src="/images/whiteDuck.svg"
                                alt="White Duck"
                                className="ml-4 h-8 md:h-10"
                                height={50}
                                width={50}
                            />
                            <Image
                                src="/images/whiteDuck.svg"
                                alt="White Duck"
                                className="ml-4 h-8 md:h-10"
                                height={50}
                                width={50}
                            />
                        </div>
                        <div className="flex flex-row relative z-10">
                            <div className="bg-orange w-10 h-auto"></div>
                            <div className="flex flex-col relative">
                                <span className="bg-white text-black text-2xl lg:text-3xl font-black relative px-4 py-2">
                                    Thinking about <span className="text-orange"> Joining?</span>
                                </span>
                                <p className="bg-background text-white text-base lg:text-xl border-2 border-white px-4 py-2">
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
