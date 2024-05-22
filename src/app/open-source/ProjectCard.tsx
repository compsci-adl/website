import Button from '@/components/Button';
import FancyRectangle from '@/components/FancyRectangle';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';

interface Project {
    title: string;
    description: string;
    image: string;
    githubLink: string;
}

export default function ProjectCard({ project }: { project: Project; index: number }) {
    return (
        <FancyRectangle colour="white" offset="8" rounded fullWidth>
            <div className="w-full gap-6 rounded-xl bg-white p-4 text-black">
                <Image
                    src={`/images/projects/${project.image}`}
                    alt={`${project.title}`}
                    width={450}
                    height={450}
                    className="w-full shrink-0 rounded-lg border-[3px] border-black bg-white object-contain"
                />
                <div className="mt-4 space-y-2 md:space-y-4">
                    <div className="gap-6">
                        <div className="space-y-2">
                            <h4 className="text-2xl font-bold md:pb-1 md:text-3xl">
                                {project.title}
                            </h4>
                            <p>{project.description}</p>
                        </div>
                    </div>
                    <Button
                        colour="orange"
                        href={project.githubLink}
                        width="w-full"
                        size="small"
                        targetBlank={true}
                    >
                        <FaGithub className="mr-2 inline-block text-xl md:text-2xl" />
                        View on GitHub
                    </Button>
                </div>
            </div>
        </FancyRectangle>
    );
}