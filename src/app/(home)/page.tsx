import Article from '@/components/Article';
import Card from '@/components/Card';
import Caterpillar from '@/svg/Caterpillar';
import Diagonals from '@/svg/Diagonals';
import Dots from '@/svg/Dots';
import Hero from './Hero';

export default function Home() {
    return (
        <main className="relative z-10 flex h-auto w-responsive flex-col items-center justify-center">
            <Hero />
            {/* Summary cards */}
            <section className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                <Card
                    className="py-3 px-5 pb-4 lg:py-5 lg:px-8"
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
                    className="py-3 px-5 pb-4 lg:py-5 lg:px-8"
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
                    className="py-3 px-5 pb-4 lg:py-5 lg:px-8"
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
            <section className="relative flex w-full flex-col items-start pt-16 pb-24 md:pt-24 lg:pt-32">
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
                    <Diagonals className="absolute -z-50 h-60 w-60 fill-accent-red opacity-30 max-md:bottom-[-50%] md:h-72 md:w-72" />
                </Card>
                <div className="relative">
                    <Card className="w-5/6 -translate-y-8 self-end p-5 max-md:pb-8 max-md:pt-7 md:w-3/4 md:-translate-y-11 md:p-12">
                        <Article heading="First-Years' *Extras*">
                            As a member, some of the perks you&apos;ll have access to include
                            computer science talks and workshops, catered social events, and a wide
                            network of other computer science students and graduates to learn from
                            and make friends with.
                        </Article>
                    </Card>
                    <Dots
                        className="absolute top-[-53%] right-[-16%] -z-50 h-56 w-56 fill-accent-blue opacity-30 max-md:top-[-80%] md:right-[-7%]
                        lg:top-[-85%] lg:h-72 lg:w-72"
                    />
                </div>
            </section>
        </main>
    );
}
