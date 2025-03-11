import FancyRectangle from '@/components/FancyRectangle';
import Tag from '@/components/Tag';
import type { Project } from '@/data/projects';

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <FancyRectangle colour="white" offset="8" rounded fullWidth>
            <div className="w-full gap-6 rounded-xl bg-white p-4 text-black">
                <div className="space-y-2 md:space-y-4">
                    <div className="gap-6">
                        <div className="space-y-2">
                            <h4 className="text-2xl font-bold md:pb-1 md:text-3xl">
                                {project.title}
                            </h4>
                            <p>{project.description}</p>
                        </div>
                    </div>
                    {project.techStacks.length !== 0 && (
                        <div className="flex flex-wrap gap-3">
                            {project.techStacks.map((tech, i) => (
                                <Tag key={i} name={tech.tech_name} backgroundColor={tech.color} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </FancyRectangle>
    );
}
