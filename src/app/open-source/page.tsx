import Title from '@/components/Title';
import { PROJECTS } from '@/data/projects';
import type { Metadata } from 'next';
import ProjectCard from './ProjectCard';

export const metadata: Metadata = {
    title: 'Open Source',
};

export default function OpenSourcePage() {
    return (
        <main className="relative">
            <div className="h-full">
                <div className="mb-8 flex justify-center">
                    <Title colour="orange">Open Source</Title>
                </div>
                <div className="container mx-auto px-4">
                    <section className="mb-8">
                        <h2 className="mb-4 text-2xl font-bold">Who is the Open Source Team?</h2>
                        <p className="text-lg md:text-xl">
                            The CS Club Open Source Team is a place for creative and inventive
                            students who want to build innovative open-source software together. We
                            are a new team currently working on a few projects, but we have many
                            more exciting projects planned for the future! Within our team,
                            you&apos;ll find various projects, ranging from various web apps to
                            Discord bots.
                        </p>
                        <p className="mt-2 text-lg md:text-xl">
                            The open-source managers are{' '}
                            <a href="https://github.com/phoenixpereira" className="underline">
                                Phoenix Pereira
                            </a>{' '}
                            and{' '}
                            <a href="https://github.com/jsun969" className="underline">
                                Justin Sun
                            </a>
                            .
                        </p>
                    </section>
                    <section className="mb-8">
                        <h2 className="mb-4 text-2xl font-bold">Our Projects</h2>
                        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
                            {PROJECTS.map((project, i) => (
                                <ProjectCard key={i} index={i} project={project} />
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
                </div>
            </div>
        </main>
    );
}
