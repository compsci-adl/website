import Title from '@/components/Title';
import FancyRectangle from '@/components/FancyRectangle';
import Image from 'next/image';
import Paragraph from '@/components/Paragraph';
import Ducks from '@/components/Ducks';
import FAQ from './FAQ';

const committeeMembers = [
    {
        name: 'David Maslov',
        position: 'President',
        isExecComittee: true,
    },
    {
        name: 'Cubie',
        position: 'Vice-President',
        isExecComittee: true,
    },
    {
        name: 'Christian',
        position: 'Treasurer',
        isExecComittee: true,
    },
    {
        name: 'Ray Okamoto',
        position: 'Secretary',
        isExecComittee: true,
    },
    {
        name: 'Milan',
        position: 'Partnerships & Sponsorships Manager',
        isExecComittee: true,
    },
    {
        name: 'F. Umar',
        position: 'Partnerships & Sponsorships Officer',
        isExecComittee: false,
    },
    {
        name: 'Pouya',
        position: 'Partnerships & Sponsorships Officer',
        isExecComittee: false,
    },
    {
        name: 'Bowen Sun',
        position: 'Business Manager',
        isExecComittee: false,
    },
    {
        name: 'Willard Gorman',
        position: 'Duck Lounge Liaison',
        isExecComittee: false,
    },
    {
        name: 'Mischa Sarac',
        position: 'Equity Officer',
        isExecComittee: false,
    },
    {
        name: 'S. Bhatta',
        position: 'Artificial Intelligence Representative',
        isExecComittee: false,
    },
    {
        name: 'Will Johnston',
        position: 'Cybersecurity Representative',
        isExecComittee: false,
    },
    {
        name: 'Khanh',
        position: 'Data Science Representative',
        isExecComittee: false,
    },
    {
        name: 'Jonty Leslie',
        position: 'Distributed Systems & Networking Representative',
        isExecComittee: false,
    },
    {
        name: 'Joshua Goldsworthy Callaway',
        position: 'Information Technology Representative',
        isExecComittee: false,
    },
    {
        name: 'Dino Macri',
        position: 'Software Engineering Representative',
        isExecComittee: false,
    },
    {
        name: 'Yuhan Wang',
        position: 'Graphic Designer',
        isExecComittee: false,
    },
    {
        name: 'Darcy',
        position: 'Social Media Officer',
        isExecComittee: false,
    },
    {
        name: 'M. Klaric',
        position: 'Social Media Officer',
        isExecComittee: false,
    },
    {
        name: 'Phoenix Pereira',
        position: 'Open Source Officer',
        isExecComittee: false,
    },
    {
        name: 'Rishi Adhikari',
        position: 'Open Source Officer',
        isExecComittee: false,
    },
    {
        name: 'Cuinn Kemp',
        position: 'General Committee',
        isExecComittee: false,
    },
    {
        name: 'Timothy Choi',
        position: 'General Committee',
        isExecComittee: false,
    },
];

export default function AboutUs() {
    return (
        <main className="relative">
            <div className="h-full">
                <div className="mb-8 flex justify-center">
                    <Title colour="orange">About Us</Title>
                </div>
                <section className="flex flex-col gap-10 md:flex-row">
                    {/* Grid */}
                    <Image
                        src="/images/square-grid.svg"
                        alt="Square Grid"
                        width={500}
                        height={500}
                        className="absolute -z-10 ml-8 mt-8 w-[60vw] max-w-[800px] md:w-[70vw] lg:w-[50vw]"
                    />
                    <div className="flex">
                        <FancyRectangle colour={'purple'} offset={'8'} filled={true} rounded={true}>
                            <Image
                                src={'/images/about-us/meet-and-greet.jpg'}
                                alt={'Meet and Greet'}
                                width={1210}
                                height={800}
                                className="rounded-xl border-2 border-white"
                            ></Image>
                        </FancyRectangle>
                    </div>
                    <div className="mb-10 mt-8 flex flex-col lg:justify-center">
                        <div className="relative flex justify-end">
                            <Image
                                src="/images/white-star.svg"
                                alt="White Star"
                                className="absolute right-0 -translate-x-14 -translate-y-4"
                                width={30}
                                height={30}
                            />
                            <Image
                                src="/images/white-star.svg"
                                alt="White Star"
                                className="absolute right-0 -translate-y-8"
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className="flex h-fit flex-row self-center border-b-2 border-t-2 border-white bg-grey px-4">
                            <Image
                                src="/images/yellow-triangle.svg"
                                alt="Yellow Triangle"
                                className="mb-12 mr-4"
                                width={30}
                                height={30}
                            />
                            <p className="my-4 text-lg">
                                The University of Adelaide Computer Science Club is a student-run
                                club for those with an interest in computer science or computing in
                                general. Although we&apos;re a university club, we welcome anyone
                                interested in computer science and/or socializing to join!
                            </p>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col gap-10 md:flex-row">
                    <div>
                        <div className="mb-4 flex flex-row flex-wrap text-2xl font-black md:mt-6 lg:mt-12 lg:text-3xl">
                            <h3 className="mb-2 mr-2 md:mb-0">Members will have </h3>
                            <div className="flex items-center">
                                <div className="mb-2 w-fit bg-yellow px-2 md:mb-0">
                                    <h3 className="text-grey">access</h3>
                                </div>
                                <h3 className="ml-2">to</h3>
                            </div>
                        </div>
                        <FancyRectangle colour={'purple'} offset={'8'} filled={true} rounded={true}>
                            <Paragraph>
                                <ul className="ml-6 list-disc">
                                    <li>
                                        The{' '}
                                        <span className="font-bold text-yellow">Duck Lounge</span>{' '}
                                        (located at EM110)
                                    </li>
                                    <li>
                                        Frequent computer science talks on a diverse range of topics
                                    </li>
                                    <li>
                                        Educational{' '}
                                        <span className="font-bold text-purple">workshops</span>
                                    </li>
                                    <li>
                                        <span className="font-bold text-yellow">Social nights</span>
                                    </li>
                                    <li>
                                        A wide{' '}
                                        <span className="font-bold text-orange">network</span> of
                                        other computer science students and graduates
                                    </li>
                                    <li>
                                        And of course,{' '}
                                        <span className="font-bold text-orange">
                                            {' '}
                                            cooperative food
                                        </span>
                                        ,{' '}
                                        <span className="font-bold text-purple">
                                            drink ventures
                                        </span>
                                        , and <span className="font-bold text-yellow">BBQs</span>{' '}
                                        throughout the year
                                    </li>
                                    <li>
                                        Lest not forget, a{' '}
                                        <span className=" font-bold text-yellow">pub crawl</span>{' '}
                                        each semester to celebrate our studies
                                    </li>
                                </ul>
                            </Paragraph>
                        </FancyRectangle>
                    </div>
                    <div>
                        <Image src="/images/crosses.svg" alt="Crosses" height={80} width={237} />
                        <Image
                            src={'/images/about-us/duck-ctf.jpg'}
                            alt={'Duck CTF'}
                            width={500}
                            height={500}
                            className="rounded-xl border-2 border-white"
                        ></Image>
                    </div>
                </section>
                <section className="mt-10 flex flex-col gap-10 md:flex-row">
                    <div className="flex h-fit flex-row self-center border-b-2 border-t-2 border-white bg-grey px-4">
                        <Image
                            src="/images/yellow-triangle.svg"
                            alt="Yellow Triangle"
                            className="mb-12 mr-4"
                            width={30}
                            height={30}
                        />
                        <p className="my-4 text-lg">
                            The club runs various competitions throughout the year, offering members
                            a chance to have fun and win prizes. These have included programming and
                            video game competitions. The club also coordinates projects among club
                            members, allowing members to gain valuable experience working on team
                            projects — while also having fun.
                        </p>
                    </div>
                    <div className="mr-2 flex justify-center lg:justify-end">
                        <FancyRectangle colour={'purple'} offset={'8'} filled={true} rounded={true}>
                            <Image
                                src={'/images/about-us/quiz-night.jpg'}
                                alt={'Quiz Night'}
                                width={1317}
                                height={750}
                                className="rounded-xl border-2 border-white"
                            ></Image>
                        </FancyRectangle>
                    </div>
                </section>
                <section className="mt-10 grid flex-col gap-6 md:grid-cols-3">
                    <Image
                        src={'/images/about-us/cocktail-night.jpg'}
                        alt={'Cocktail Night'}
                        width={500}
                        height={500}
                        className="rounded-xl border-2 border-white"
                    ></Image>
                    <Image
                        src={'/images/about-us/duck-ctf-2.jpg'}
                        alt={'Duck CTF 2'}
                        width={500}
                        height={500}
                        className="rounded-xl border-2 border-white"
                    ></Image>
                    <Image
                        src={'/images/about-us/ai-panel.jpg'}
                        alt={'AI Panel'}
                        width={500}
                        height={500}
                        className="rounded-xl border-2 border-white"
                    ></Image>
                </section>
                <section className="relative mt-8">
                    <Image
                        src="/images/white-star-outline.svg"
                        alt="White Star Outline"
                        className="absolute z-10 -translate-x-4 -translate-y-4"
                        width={50}
                        height={50}
                    />
                    <div className="relative rounded-xl border-2 border-white bg-grey px-4 py-4 md:px-6 md:py-6">
                        <p className="text-lg md:text-xl">
                            Founded in 2008 with a large and active group of members, we are always
                            willing to offer academic assistance or make new friends. All are
                            welcome to join us for an exciting year in a fun, open and unique
                            environment.
                        </p>
                    </div>
                    <Image
                        src="/images/white-star-outline.svg"
                        alt="White Star Outline"
                        className="absolute right-0 z-10 -translate-y-8 translate-x-4"
                        width={50}
                        height={50}
                    />
                </section>
                <section className="mt-8">
                    {/* Grid */}
                    <Image
                        src="/images/rectangle-grid.svg"
                        alt="Rectangle Grid"
                        width={750}
                        height={750}
                        className="absolute -z-10 ml-20 mt-8 w-0 max-w-[1200px] lg:w-[80vw]"
                    />
                    <div className="flex w-fit bg-orange px-2 lg:mb-0">
                        <h2 className="text-5xl font-bold">Committee Members</h2>
                    </div>
                    <div className="mb-2 mr-2 mt-8 grid auto-rows-fr grid-cols-2 gap-10 lg:grid-cols-4">
                        {committeeMembers.map((member, index) => (
                            <FancyRectangle
                                key={index}
                                colour={member.isExecComittee ? 'yellow' : 'white'}
                                offset={'8'}
                                filled={true}
                                rounded={true}
                                fullWidth={true}
                                fullHeight={true}
                            >
                                <div
                                    className={`h-full w-full rounded-xl border-2 border-${member.isExecComittee ? 'yellow' : 'white'} flex flex-col justify-center bg-grey p-4`}
                                >
                                    <h3 className="text-2xl font-bold">{member.name}</h3>
                                    <p>{member.position}</p>
                                </div>
                            </FancyRectangle>
                        ))}
                    </div>
                    <Ducks size={'large'}></Ducks>
                </section>
                <section className="mt-8 md:mt-0">
                    <FancyRectangle colour="purple" offset="8 md:offset-16" filled={false}>
                        <div className="w-fit bg-purple px-2 py-2">
                            <h2 className="text-4xl font-bold text-grey md:text-5xl">FAQ</h2>
                        </div>
                    </FancyRectangle>
                    <div className="mt-8"></div>
                    <div className="flex flex-col gap-x-16 gap-y-8 lg:flex-row">
                        {/* FAQ */}
                        {/* TODO: Replace website links for prod */}
                        <div className="mb-8 mr-2 flex flex-col justify-items-center gap-12 lg:w-full">
                            {/* Grid */}
                            <Image
                                src="/images/rectangle-grid.svg"
                                alt="Rectangle Grid"
                                width={750}
                                height={750}
                                className="absolute -z-10 ml-20 mt-8 max-h-[600px] w-0 max-w-[1200px] lg:w-[70vw]"
                            />

                            <FAQ
                                question={'How do I become a club member?'}
                                answer={
                                    <p>
                                        You can register as a club member on our website{' '}
                                        <a href="http://localhost:3000/join" className="underline">
                                            here
                                        </a>
                                        . Create an account by filling in your information, then
                                        complete the payment to finalise your membership.
                                    </p>
                                }
                                colour={'orange'}
                            ></FAQ>
                            <FAQ
                                question={'What are the perks of being a member?'}
                                answer={
                                    <div>
                                        <p>
                                            Members will have access to the Duck Lounge, a diverse
                                            range of educational talks and workshops, social nights,
                                            and a wide network of other computer science students
                                            and graduates.
                                        </p>
                                    </div>
                                }
                                colour={'yellow'}
                            ></FAQ>
                            <FAQ
                                question={'How much does membership cost?'}
                                answer={
                                    <p>
                                        Club membership costs $10 for the full year. You can pay for
                                        membership either online on our website, or in person at a
                                        club event or the duck lounge.
                                    </p>
                                }
                                colour={'purple'}
                            ></FAQ>
                            <FAQ
                                question={'Where and what is the Duck Lounge?'}
                                answer={
                                    <p>
                                        The Duck Lounge is located at EM110 in the Engineering and
                                        Mathematics Building. It has a study space with power
                                        outlets and couches, along with a Nintendo Switch for games.
                                    </p>
                                }
                                colour={'orange'}
                            ></FAQ>
                            <FAQ
                                question={'Does the club have a Facebook page?'}
                                answer={
                                    <p>
                                        Yes! We have a{' '}
                                        <a
                                            href="https://www.facebook.com/compsci.adl/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline"
                                        >
                                            Facebook page
                                        </a>{' '}
                                        where we post all club events and general discussions.
                                    </p>
                                }
                                colour={'yellow'}
                            ></FAQ>
                            <FAQ
                                question={'How can I contact the CS Club?'}
                                answer={
                                    <p>
                                        If you have any questions or just want to get in touch with
                                        us, visit our{' '}
                                        <a
                                            href="http://localhost:3000/contact"
                                            className="underline"
                                        >
                                            contact page
                                        </a>{' '}
                                        or send a message in our{' '}
                                        <a
                                            href="https://discord.gg/UjvVxHA"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline"
                                        >
                                            Discord
                                        </a>
                                        .
                                    </p>
                                }
                                colour={'purple'}
                            ></FAQ>
                        </div>
                        <div className="flex flex-col gap-8">
                            <Image
                                src={'/images/about-us/o-week.jpg'}
                                alt={'O Week'}
                                width={1055.5}
                                height={500}
                                className="rounded-xl border-2 border-white"
                            ></Image>
                            <Image
                                src={'/images/about-us/women-in-cs.jpg'}
                                alt={'Women in CS'}
                                width={1342}
                                height={500}
                                className="rounded-xl border-2 border-white"
                            ></Image>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
