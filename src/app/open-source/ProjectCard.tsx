import Button from '@/components/Button';
import FancyRectangle from '@/components/FancyRectangle';
import Tag from '@/components/Tag';
import { TECH_COLORS } from '@/constants/colours';
import type { Project } from '@/data/projects';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function ProjectCard({ project }: { project: Project }) {
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
                    <div className="flex flex-wrap gap-3">
                        {project.techStacks.map((tech, i) => (
                            <Tag key={i} name={tech} backgroundColor={TECH_COLORS[tech]} />
                        ))}
                    </div>
                    <div className="flex w-full flex-col gap-4 lg-xl:flex-row">
                        <div className="flex-1">
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

                        {project.websiteLink && (
                            <div className="flex-1">
                                <Button
                                    colour="purple"
                                    href={project.websiteLink}
                                    width="w-full"
                                    size="small"
                                    targetBlank={true}
                                >
                                    <FaExternalLinkAlt className="mr-2 inline-block text-xl md:text-2xl" />
                                    Visit now
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </FancyRectangle>
    );
}
