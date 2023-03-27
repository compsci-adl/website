import Image from 'next/image';
import Article from '@/components/Article';
import Card from '@/components/Card';
import Caterpillar from '@/svg/Caterpillar';
import Diagonals from '@/svg/Diagonals';
import Dots from '@/svg/Dots';
import Hero from './Hero';
import Button from '@/components/Button';
import Footer from './Footer';
import Duck from '@/svg/Duck';

const LOGO_SIZE = 150;

export default function Home() {
    return (
        <main className="relative z-10 flex h-auto w-responsive flex-col items-center justify-center">
            <Hero />
            {/* Summary cards */}
            <section className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                <Card
                    className="flex-grow py-3 px-5 pb-4 lg:py-5 lg:px-8"
                    headingClassName="bg-accent-blue"
                    heading="Learn"
                >
                    <Article>
                        The club has a major focus on education and learning. We run workshops to
                        assist students with their studies and host other educational events such as
                        talks and guest lectures.
                    </Article>
                </Card>
                <Card
                    className="flex-grow py-3 px-5 pb-4 lg:py-5 lg:px-8"
                    headingClassName="bg-accent-yellow"
                    heading="Socialise"
                >
                    <Article>
                        We are primarily a social club. Events such as meet & greets, games / movies
                        nights, BBQs, and pub crawls are just some of the social events the club
                        runs each year.
                    </Article>
                </Card>
                <Card
                    className="flex-grow py-3 px-5 pb-4 lg:py-5 lg:px-8"
                    headingClassName="bg-accent-red"
                    heading="Code"
                >
                    <Article>
                        Coding is what we do and love. Whether you&apos;re looking for some feedback
                        on a project or have technical questions, the club is a great way to meet
                        and learn from others.
                    </Article>
                </Card>
            </section>
            {/* New member information */}
            <section className="relative flex w-full flex-col items-start pt-16 md:pt-24 lg:pt-32">
                <h2 className="pb-12 text-4xl font-bold md:text-5xl lg:text-6xl">
                    New Members are <span className="text-accent-blue">Always</span> Welcome
                </h2>
                <Caterpillar className="absolute top-0 left-[-45%] -z-50 h-96 w-96 fill-accent-yellow opacity-30 max-lg:hidden" />
                <Card className="relative w-5/6 p-5 pb-10 max-md:pt-7 md:w-3/4 md:p-12 md:pb-16">
                    <Article heading="Member *Perks*">
                        As a member, some of the perks you&apos;ll have access to include computer
                        science talks and workshops, catered social events, and a wide network of
                        other computer science students and graduates to learn from and make friends
                        with.
                    </Article>
                    <Diagonals className="absolute bottom-[-50%] -z-50 h-60 w-60 fill-accent-red opacity-30 md:h-72 md:w-72 lg:bottom-[-60%]" />
                </Card>
                <div className="relative">
                    <Card className="w-5/6 -translate-y-8 self-end p-5 max-md:pb-8 max-md:pt-7 md:w-3/4 md:-translate-y-11 md:p-12">
                        <Article heading="First-Years' *Extras*">
                            Are you a first year student? The Club runs activities at the start of
                            the year specially for you, giving you a chance to meet other students,
                            and helping ease you into university life.
                        </Article>
                    </Card>
                    <Dots
                        className="absolute top-[-53%] right-[-16%] -z-50 h-56 w-56 fill-accent-blue opacity-30 max-md:top-[-80%] md:right-[-7%]
                        lg:top-[-85%] lg:h-72 lg:w-72"
                    />
                </div>
            </section>
            {/* Sponsors section */}
            <section className="pt-12 md:pt-16 lg:pt-20">
                <h2 className="pb-3 text-4xl font-bold md:pb-4 md:text-5xl lg:text-6xl">
                    Supported by the Industry&apos;s{' '}
                    <span className="text-accent-blue">Greatest</span>
                </h2>
                <h3 className="pb-3 text-xl md:pb-6 md:text-2xl lg:pb-12 lg:text-3xl">
                    We&apos;re proud to be sponsored by
                </h3>
                <div className="grid grid-cols-3 pb-3 md:gap-16 md:pb-6 lg:gap-24 lg:pb-12">
                    <Image
                        src="sponsor-logos/atlassian-compact.svg"
                        alt="Atlassian logo"
                        className="m-auto scale-75 lg:scale-100"
                        width={LOGO_SIZE}
                        height={LOGO_SIZE}
                    />
                    <Image
                        src="sponsor-logos/macquarie-compact.svg"
                        alt="Macquarie logo"
                        className="m-auto scale-75 lg:scale-100"
                        width={LOGO_SIZE}
                        height={LOGO_SIZE}
                    />
                    <Image
                        src="sponsor-logos/pwc-compact.svg"
                        alt="PwC logo"
                        className="m-auto md:scale-75 lg:scale-100"
                        width={LOGO_SIZE}
                        height={LOGO_SIZE}
                    />
                </div>
                <Card className="relative flex flex-col justify-between gap-7 p-5 max-md:py-7 md:gap-10 md:p-12 lg:flex-row lg:items-center lg:gap-0">
                    <Article className="lg:w-[70%]" heading="We'd *love* to work with you">
                        Thinking of supporting the Computer Science Club and reaching our extremely
                        active community of hundreds of computer science students?
                    </Article>
                    <Button
                        className="bg-accent-highlight px-7 py-3 text-2xl font-bold lg:px-9 lg:py-5 lg:text-3xl"
                        href="/contact"
                    >
                        Contact Us
                    </Button>
                    <Duck
                        className="absolute -bottom-36 right-[-8%] -z-50 h-52 w-52 -scale-y-100 -scale-x-100 fill-accent-yellow opacity-30 md:-bottom-52
                        md:right-[-5%] md:h-72 md:w-72 lg:bottom-[-17rem] lg:h-96 lg:w-96"
                        mono
                    />
                </Card>
            </section>
            <Footer />
        </main>
    );
}
