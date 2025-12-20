import Duck from '@/components/Duck';
import FancyRectangle from '@/components/FancyRectangle';
import Title from '@/components/Title';
import { fetchProjectsData } from '@/data/projects';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FutureProjectCard from './FutureProjectCard';
import ProjectCard from './ProjectCard';

export const metadata: Metadata = {
    title: 'Open Source',
};

export default async function OpenSourcePage() {
    const projects = await fetchProjectsData();

    // Split projects into active and inactive
    const currentProjects = (projects ?? []).filter((project) => project.active);
    const futureProjects = (projects ?? []).filter((project) => !project.active);

    return (
        <main className="relative">
            <div className="h-full">
                <div className="mb-8 flex justify-center">
                    <Title colour="purple">Open Source</Title>
                </div>
                <div className="container mx-auto px-4">
                    <section className="mb-8">
                        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                            <div className="relative z-10 flex flex-1 flex-col space-y-6">
                                <div className="max-w-[600px] xl:w-[500px]">
                                    <div className="relative flex flex-row justify-end space-x-4 *:h-8">
                                        <Duck colour="white" outline size={40} />
                                        <Duck colour="white" outline size={40} />
                                        <Duck colour="white" size={40} />
                                        <Duck colour="white" size={40} />
                                        <Duck colour="white" size={40} />
                                    </div>
                                    <div className="relative flex flex-row">
                                        <div className="w-12 bg-orange" />
                                        <div className="relative flex flex-1 flex-col">
                                            <span className="relative z-[2] bg-white py-4 pl-4 pr-16 text-2xl font-black text-black lg:pr-36 lg:text-3xl">
                                                Who is the
                                            </span>
                                            <span className="relative z-[2] whitespace-nowrap border-2 border-white py-6 pl-4 pr-16 text-2xl font-bold lg:pr-36 lg:text-3xl">
                                                Open Source Team?
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="max-w-[600px] rounded-xl border-2 border-white px-4 py-6 md:px-6 md:py-6 xl:w-[500px]">
                                    <p className="text-lg md:text-xl">
                                        The{' '}
                                        <span className="font-bold text-yellow">
                                            CS Club Open Source Team
                                        </span>{' '}
                                        is a place for creative and inventive students who want to
                                        build innovative open-source software together. We are have
                                        several exciting projects that you can contribute to!
                                    </p>
                                </div>
                                <div className="flex flex-row items-center">
                                    <Image
                                        src="/images/yellow-triangle.svg"
                                        alt="Yellow Triangle"
                                        className="mr-4"
                                        width={40}
                                        height={40}
                                    />
                                    <Link
                                        className="text-lg font-bold underline sm:text-2xl md:text-3xl"
                                        href="https://docs.google.com/forms/d/e/1FAIpQLSe2uvnn4qW95yJ7TzyDo7QMjzhkawvdERRDmeBLMwloi-nqjg/viewform"
                                    >
                                        Join the Open Source Team!
                                    </Link>
                                </div>
                            </div>
                            <div className="relative z-0 w-full xl:mt-8">
                                <FancyRectangle colour={'white'} offset={'20'} filled rounded>
                                    <Image
                                        src="/images/opensource/opensource.png"
                                        alt="Open source"
                                        width={500}
                                        height={500}
                                        className="rounded-xl border-2 border-white bg-grey md:w-full"
                                    ></Image>
                                </FancyRectangle>
                            </div>
                        </div>
                    </section>
                    <section className="mb-8">
                        <h2 className="mb-4 text-2xl font-bold">Our Projects</h2>
                        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
                            {currentProjects.map((project, i) => (
                                <ProjectCard key={i} project={project} />
                            ))}
                        </div>
                    </section>
                    <section className="mb-8">
                        <h2 className="mb-4 text-2xl font-bold">Future Projects</h2>
                        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
                            {futureProjects.map((project, i) => (
                                <FutureProjectCard key={i} project={project} />
                            ))}
                        </div>
                    </section>
                    <section className="mb-8">
                        <h2 className="mb-4 text-2xl font-bold">How to join?</h2>
                        <p className="text-lg md:text-xl">
                            Looking to join an active and welcoming student developer community?
                            We&apos;re always on the lookout for enthusiastic and creative students
                            to join us, learn, and contribute to making useful open-source projects.
                            Join our team by filling out{' '}
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSe2uvnn4qW95yJ7TzyDo7QMjzhkawvdERRDmeBLMwloi-nqjg/viewform?usp=sf_link"
                                className="underline"
                            >
                                this Google Form
                            </a>
                            .
                        </p>
                    </section>
                    <section className="mb-8">
                        <h2 className="mb-4 text-2xl font-bold">
                            Contributing Guidelines & Code of Conduct
                        </h2>
                        <p className="text-lg md:text-xl">
                            The CS Club Open Source Team follows our{' '}
                            <a
                                href="https://github.com/compsci-adl/.github/blob/main/CONTRIBUTING.md"
                                className="underline"
                            >
                                Contributing Guidelines
                            </a>{' '}
                            and{' '}
                            <a
                                href="https://github.com/compsci-adl/.github/blob/main/CODE_OF_CONDUCT.md"
                                className="underline"
                            >
                                Code of Conduct
                            </a>
                            .
                        </p>
                    </section>
                    <section className="mb-8">
                        <h2 className="mb-4 text-2xl font-bold">Contact Us</h2>
                        <p className="mt-2 text-lg md:text-xl">
                            Learn more about the Open Source Team and view our repositories on{' '}
                            <a href="https://github.com/compsci-adl" className="underline">
                                GitHub
                            </a>
                            .
                        </p>
                        <p className="mt-2 text-lg md:text-xl">
                            If you have any queries, please contact us via{' '}
                            <a className="underline" href="mailto:dev@csclub.org.au">
                                dev@csclub.org.au
                            </a>
                            .
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
