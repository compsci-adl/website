import Details from '@/components/Details';
import StyledLink from '@/components/StyledLink';
import Footer from './Footer';
import ProfileCards from './ProfileCards';

export default function About() {
    return (
        <main className="relative z-10 flex h-auto w-responsive flex-col items-center justify-center">
            <section className="flex w-full flex-col items-center justify-start gap-6 pt-[10em] max-md:pb-12 md:pt-[16em]">
                <h1 className="text-center text-5xl font-bold md:text-6xl lg:text-primary-heading">
                    ABOUT US
                </h1>
            </section>

            <section className="w-full pt-12 md:pt-16 lg:pt-20">
                <h2 className="text-left text-5xl font-bold md:text-6xl lg:text-secondary-heading">
                    About the club
                </h2>
                <p className="py-4">
                    The University of Adelaide Computer Science Club is a student-run club for those
                    with an interest in computer science or computing in general. Although
                    we&apos;re a university club, we welcome anyone interested in computer science
                    and/or socialising to join!
                </p>

                <p className="pb-2">Members will have access to:</p>
                <ul className="list-inside list-disc">
                    <li>The Duck Lounge</li>
                    <li>Frequent computer science talks on a diverse range of topics</li>
                    <li>Educational workshops</li>
                    <li>Social nights</li>
                    <li>A wide network of other computer science students and graduates</li>
                    <li>
                        We also run cooperative food and drink ventures and hold pub crawls and BBQs
                        throughout the year, and hold a pub crawl each semester
                    </li>
                </ul>

                <p className="py-4">
                    The club runs various competitions throughout the year, offering members a
                    chance to have fun and win prizes. These have included programming and video
                    game competitions. The club also coordinates projects among club members,
                    allowing members to gain valuable experience working on team projects — while
                    also having fun.
                </p>

                <p className="pb-4">
                    Founded in 2008 with a large and active group of members, we are always willing
                    to offer academic assistance or make new friends. All are welcome to join us for
                    an exciting year in a fun, open and unique environment.
                </p>
            </section>

            <section className="w-full pt-12 md:pt-16 lg:pt-20">
                <h2 className="text-left text-5xl font-bold md:text-6xl lg:text-secondary-heading">
                    Committee Members
                </h2>
                <p className="py-4">
                    The Computer Science Club committee is made up of a group of students providing
                    their service to the club either in an executive position or part of the general
                    committee. They work together to manage the club&apos;s events, actions, and
                    direction. The committee consists of the following members:
                </p>
                {/* Have image of committee here */}
                <ProfileCards />
            </section>

            <section className="w-full pt-12 md:pt-16 lg:pt-20">
                <h2 className="text-left text-5xl font-bold md:text-6xl lg:text-secondary-heading">
                    FAQ
                </h2>
                <Details summary="How do I become a member?">
                    <p>
                        You can register as a club member <StyledLink href="/join">here</StyledLink>
                        . Fill out and submit the form.
                    </p>
                </Details>
                <Details summary="How much does membership cost?">
                    <p>
                        <b>Club membership costs $10.</b> You can pay for membership at a club event
                        or contact one of the committee members.
                    </p>
                </Details>
                <Details summary="Does the club have a Facebook page?">
                    <p>
                        Yes! We have a{' '}
                        <StyledLink href="https://www.facebook.com/compsci.adl">
                            Facebook page
                        </StyledLink>{' '}
                        where we post all club events and general discussions. We also have a
                        Discord server that has discussions and announcements for all club events.
                    </p>
                </Details>
                <Details summary="How can I contact the CS Club?">
                    <p>
                        If you have any questions or just want to get in touch with us, then all
                        available avenues for communication are listed on our{' '}
                        <StyledLink href="/contact">contact page</StyledLink>.
                    </p>
                </Details>
            </section>

            <Footer />
        </main>
    );
}
