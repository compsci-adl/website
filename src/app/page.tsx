import FancyRectangle from '../components/fancyRectangle';
import Footer from '../components/footer';
import Grid from '../components/grid';
import Header from '../components/header';
import ImageCarousel from '../components/imageCarousel';

export default function Home() {
    return (
        <div className="relative z-10 bg-background h-fit">
            <img
                className="z-30 h-48 px-16 md:px-24 py-4 mt-4 fixed transition-all duration-500"
                src="/images/logo.png"
                alt="Computer Science Club Logo"
            />
            <Header></Header>
            <div className="top-8 font-archivo text-white">
                <div className="h-36"></div>
                <main className="mx-12 md:mx-20 px-4 py-8">
                    <section className="mb-8 font-archivo-black">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Left side */}
                            <div>
                                <Grid></Grid>
                                <div className="relative z-10">
                                    <h1 className="text-[10vw] md:text-[7vw]">LEARN,</h1>
                                    <h1 className="text-[10vw] md:text-[7vw]">SOCIALISE,</h1>

                                    <FancyRectangle colour="yellow" offset="16" filled={false}>
                                        <div className="bg-yellow w-fit px-2">
                                            <h1 className="text-[10vw] md:text-[7vw] text-background">
                                                CODE.
                                            </h1>
                                        </div>
                                    </FancyRectangle>
                                    <div className="h-12"></div>
                                    <FancyRectangle colour="orange" offset="16" filled={false}>
                                        <div className="bg-orange w-fit px-2">
                                            <h2 className="text-[5vw] md:text-[3vw]">
                                                Computer Science Club
                                            </h2>
                                        </div>
                                    </FancyRectangle>
                                </div>
                            </div>

                            {/* Right side */}
                            <div className="mt-8 lg:mt-10 lg:ml-32 transition-all duration-500">
                                <ImageCarousel></ImageCarousel>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="flex flex-row relative z-10 font-archivo-black text-[3.5vw] md:text-[3vw] lg:text-[2vw] mt-24">
                            <h3>New Members are</h3>
                            <div className="bg-purple w-fit px-2 ml-2">
                                <h3 className=" text-background">Always Welcome</h3>
                            </div>
                        </div>
                        <div className="relative bg-background border-white border-2 px-6 py-6 mt-4 z-10">
                            <p className="text-xl">
                                As a member, some of the perks you’ll have access to include
                                computer science talks and workshops, catered social events, and a
                                wide network of other computer science students and graduates to
                                learn from and make friends with.
                            </p>
                        </div>
                        <div className="flex flex-row relative z-10 font-archivo-black text-[3.5vw] md:text-[3vw] lg:text-[2vw] mt-4 items-center">
                            <h3 className="">First-Year Perks</h3>
                            <img
                                src={'/images/yellowStar.svg'}
                                alt="Yellow Star"
                                className="ml-4 h-10"
                            />
                        </div>
                        <div className="relative bg-background border-white border-2 px-6 py-6 mt-4 z-10">
                            <p className="text-xl">
                                Are you a first year student? The Club runs activities at the start
                                of the year specifically for you, giving you a chance to meet other
                                students, and helping you ease into uni life.
                            </p>
                        </div>
                    </section>
                    <hr className="mt-16 mb-16 h-0.5 bg-white"></hr>
                    <section>
                        <div className="ml-12 md:ml-20 lg:ml-44">
                            <Grid></Grid>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-xl">
                            {' '}
                            <FancyRectangle colour="white" offset="8" filled={true}>
                                <div className="flex flex-col">
                                    <div className="bg-purple w-full px-6 py-6 border-4 border-black">
                                        <h3 className="text-[6vw] md:text-[3vw] text-background font-archivo-black">
                                            Learn
                                        </h3>
                                    </div>
                                    <div className="bg-white w-fit px-6 py-6 border-4 -mt-2 border-black">
                                        <div className="relative text-black">
                                            <p>
                                                The club has a major focus on{' '}
                                                <span className="relative inline-block">
                                                    education
                                                    <div className="absolute top-0 left-0 bg-purple opacity-30 w-full h-full"></div>
                                                </span>{' '}
                                                and learning. We run workshops to assist students
                                                with their studies and host other educational events
                                                such as talks and guest lectures.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FancyRectangle>
                            <FancyRectangle colour="white" offset="8" filled={true}>
                                <div className="flex flex-col">
                                    <div className="bg-yellow w-full px-6 py-6 border-4 border-black">
                                        <h3 className="text-[6vw] md:text-[3vw] text-background font-archivo-black">
                                            Socialise
                                        </h3>
                                    </div>
                                    <div className="bg-white w-fit px-6 py-6 border-4 -mt-2 border-black">
                                        <div className="relative text-black">
                                            <p>
                                                We are primarily a{' '}
                                                <span className="relative inline-block">
                                                    social club.
                                                    <div className="absolute top-0 left-0 bg-yellow opacity-30 w-full h-full"></div>
                                                </span>{' '}
                                                Events such as meet & greets, games / movies nights,
                                                BBQs, and pub crawls are just some of the social
                                                events the club runs each year.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FancyRectangle>
                            <FancyRectangle colour="white" offset="8" filled={true}>
                                <div className="flex flex-col">
                                    <div className="bg-orange w-full px-6 py-6 border-4 border-black">
                                        <h3 className="text-[6vw] md:text-[3vw] text-background font-archivo-black">
                                            Code
                                        </h3>
                                    </div>
                                    <div className="bg-white w-fit px-6 py-6 border-4 -mt-2 border-black">
                                        <div className="relative text-black">
                                            <p>
                                                <span className="relative inline-block">
                                                    Coding
                                                    <div className="absolute top-0 left-0 bg-orange opacity-30 w-full h-full"></div>
                                                </span>{' '}
                                                is what we do and love. Whether you’re looking for
                                                some feedback on a project or have technical
                                                questions, the club is a great way to meet and learn
                                                from others.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FancyRectangle>
                        </div>
                    </section>
                    <section>
                        <div className="flex flex-row relative z-10 font-archivo-black text-[5vw] md:text-[5vw] lg:text-[3.5vw] mt-24 items-center">
                            <img
                                src={'/images/yellowTriangle.svg'}
                                alt="Yellow Triangle"
                                className="ml-0.5 mr-4"
                            />
                            <div>
                                <h3>Supported By </h3>
                                <div className="flex flex-row">
                                    <h3 className="mr-2">Industry’s </h3>
                                    <FancyRectangle colour="orange" offset="6" filled={false}>
                                        <div className="bg-orange w-fit px-2">
                                            <h2>Greatest</h2>
                                        </div>
                                    </FancyRectangle>
                                </div>
                            </div>
                        </div>
                        <h3 className="flex flex-row relative z-10 font-archivo-black text-[3.5vw] md:text-[3vw] lg:text-[2vw] mt-16">
                            Tier 1 Sponsors
                        </h3>
                        <div className="h-48"></div>
                        <h3 className="flex flex-row relative z-10 font-archivo-black text-[3.5vw] md:text-[3vw] lg:text-[2vw] mt-4">
                            Tier 2 Sponsors
                        </h3>
                        <div className="h-48"></div>
                        <h3 className="flex flex-row relative z-10 font-archivo-black text-[3.5vw] md:text-[3vw] lg:text-[2vw] mt-4">
                            Tier 3 Sponsors
                        </h3>
                        <div className="h-48"></div>
                    </section>
                    <section>
                        <div className="h-24"></div>
                        <div className="mb-24 md:mb-32 lg:mb-44">
                            <Grid></Grid>
                        </div>

                        <div className="flex flex-col relative z-10 w-fit">
                            <div className="flex flex-row relative mb-2 justify-end">
                                <img
                                    src={'/images/whiteDuckOutline.svg'}
                                    alt="White Duck Outline"
                                    className="ml-4 h-10"
                                />
                                <img
                                    src={'/images/whiteDuckOutline.svg'}
                                    alt="White Duck Outline"
                                    className="ml-4 h-10"
                                />
                                <img
                                    src={'/images/whiteDuck.svg'}
                                    alt="White Duck"
                                    className="ml-4 h-10"
                                />
                                <img
                                    src={'/images/whiteDuck.svg'}
                                    alt="White Duck"
                                    className="ml-4 h-10"
                                />
                                <img
                                    src={'/images/whiteDuck.svg'}
                                    alt="White Duck"
                                    className="ml-4 h-10"
                                />
                            </div>
                            <div className="flex flex-row relative z-10">
                                <div className="bg-orange w-10 h-auto"></div>
                                <div className="flex flex-col relative">
                                    <span className="bg-white text-black text-[4.5vw] lg:text-[3vw] font-archivo-black relative px-4 py-2">
                                        Thinking about{' '}
                                        <span className="text-orange"> Joining?</span>
                                    </span>
                                    <p className="bg-background text-white text-[3.5vw] lg:text-[2vw] border-2 border-white px-4 py-2">
                                        New members are always welcome!
                                    </p>
                                </div>
                            </div>{' '}
                        </div>

                        <div className="h-0 lg:h-96"></div>
                    </section>
                </main>
            </div>
            <Footer></Footer>
        </div>
    );
}
