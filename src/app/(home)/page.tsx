import Article from '@/components/Article';
import Card from '@/components/Card';
import Hero from './Hero';

export default function Home() {
    return (
        <main className="relative z-10 flex h-auto w-responsive flex-col items-center justify-center">
            {/* TODO responsive width */}
            <Hero />
            <section className="grid grid-cols-3 gap-12">
                <Card className="bg-accent-blue" heading="Learn">
                    <Article>
                        The club has a major focus on education and learning. We run workshops to
                        assist students with their studies and host other educational events such as
                        talks and guest lectures.
                    </Article>
                </Card>
                <Card className="bg-accent-yellow" heading="Socialise">
                    <Article>
                        We are primarily a social club. Events such as meet & greets, games / movies
                        nights, BBQs, and pub crawls are just some of the social events the club
                        runs each year.
                    </Article>
                </Card>
                <Card className="bg-accent-red" heading="Code">
                    <Article>
                        Coding is what we do and love. Whether you&apos;re looking for some feedback
                        on a project or have technical questions, the club is a great way to meet
                        and learn from others.
                    </Article>
                </Card>
            </section>
        </main>
    );
}
