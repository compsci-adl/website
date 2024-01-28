import Title from '@/components/Title';
import FancyRectangle from '@/components/FancyRectangle';
import Image from 'next/image';
import Paragraph from '@/components/Paragraph';

export default function AboutUs() {
    return (
        <div className="relative">
            <main className="mx-4 md:mx-10">
                <div className="h-full bg-[url('/images/rectangle-grid.svg')] bg-repeat-y md:bg-[length:90%_90%] md:bg-center md:bg-no-repeat">
                    <div className="mb-8 flex justify-center">
                        <Title colour="orange">About Us</Title>
                    </div>
                    <section className="flex flex-col gap-10 md:flex-row">
                        <div className="flex">
                            <FancyRectangle
                                colour={'purple'}
                                offset={'8'}
                                filled={true}
                                rounded={true}
                            >
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
                                    The University of Adelaide Computer Science Club is a
                                    student-run club for those with an interest in computer science
                                    or computing in general. Although we&apos;re a university club,
                                    we welcome anyone interested in computer science and/or
                                    socializing to join!
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
                            <FancyRectangle
                                colour={'purple'}
                                offset={'8'}
                                filled={true}
                                rounded={true}
                            >
                                <Paragraph>
                                    <ul className="ml-6 list-disc">
                                        <li>
                                            The{' '}
                                            <span className="font-bold text-yellow">
                                                Duck Lounge
                                            </span>{' '}
                                            (located at EM110)
                                        </li>
                                        <li>
                                            Frequent computer science talks on a diverse range of
                                            topics
                                        </li>
                                        <li>
                                            Educational{' '}
                                            <span className="font-bold text-purple">workshops</span>
                                        </li>
                                        <li>
                                            <span className="font-bold text-yellow">
                                                Social nights
                                            </span>
                                        </li>
                                        <li>
                                            A wide{' '}
                                            <span className="font-bold text-orange">network</span>{' '}
                                            of other computer science students and graduates
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
                                            , and{' '}
                                            <span className="font-bold text-yellow">BBQs</span>{' '}
                                            throughout the year
                                        </li>
                                        <li>
                                            Lest not forget, a{' '}
                                            <span className=" font-bold text-yellow">
                                                pub crawl
                                            </span>{' '}
                                            each semester to celebrate our studies
                                        </li>
                                    </ul>
                                </Paragraph>
                            </FancyRectangle>
                        </div>
                        <div>
                            <Image
                                src="/images/crosses.svg"
                                alt="Crosses"
                                height={80}
                                width={237}
                            />
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
                                The club runs various competitions throughout the year, offering
                                members a chance to have fun and win prizes. These have included
                                programming and video game competitions. The club also coordinates
                                projects among club members, allowing members to gain valuable
                                experience working on team projects — while also having fun.
                            </p>
                        </div>
                        <div className="mr-2 flex justify-center lg:justify-end">
                            <FancyRectangle
                                colour={'purple'}
                                offset={'8'}
                                filled={true}
                                rounded={true}
                            >
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
                                Founded in 2008 with a large and active group of members, we are
                                always willing to offer academic assistance or make new friends. All
                                are welcome to join us for an exciting year in a fun, open and
                                unique environment.
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
                </div>
            </main>
        </div>
    );
}
