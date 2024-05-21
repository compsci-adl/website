import FancyRectangle from '@/components/FancyRectangle';
import Image from 'next/image';

interface Project {
    title: string;
    description: string;
    languages: string[];
    frameworks: string[];
    image: string;
    githubLink: string;
}

function ProjectCard({ project }: { project: Project; index: number }) {
    return (
        <FancyRectangle colour="white" offset="8" rounded fullWidth>
            <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-4 text-black md:flex-row">
                <Image
                    src={`/images/projects/${project.image}`}
                    alt={`${project.title}`}
                    width={450}
                    height={450}
                    className="w-full shrink-0 rounded-lg border-[3px] border-black bg-white object-contain md:w-[450px]"
                />
                <div className="grow space-y-2 md:space-y-4">
                    <div className="flex gap-6 font-bold">
                        <div className="grow space-y-2">
                            <h4 className="text-2xl md:border-b-[3px] md:border-black md:pb-1 md:text-3xl">
                                {project.title}
                            </h4>
                            <p>{project.description}</p>
                            <div className="flex gap-2">
                                <span className="font-bold">Languages:</span>
                                <span>{project.languages.join(', ')}</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-bold">Frameworks:</span>
                                <span>{project.frameworks.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                    <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold hover:underline"
                    >
                        View on GitHub
                    </a>
                </div>
            </div>
        </FancyRectangle>
    );
}

export default ProjectCard;
