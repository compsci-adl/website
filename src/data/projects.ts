import { env } from '@/env.mjs';
import { fetcher } from '@/lib/fetcher';

export interface TechStack {
    tech_name: string;
    color: string;
}

export interface Project {
    title: string;
    description: string;
    image: string;
    githubLink: string;
    websiteLink?: string;
    techStacks: TechStack[];
    active: boolean;
}

const projectURL = env.NEXT_PUBLIC_PAYLOAD_URI + '/api/projects?limit=20';

/*
    Fetches projects and techstack from Payload CMS and transforms them into the required format.
*/
export async function fetchProjectsData(): Promise<Project[]> {
    try {
        // Fetching project data from payload with fetcher
        const data = await fetcher.get.query([projectURL, { cache: 'no-store', prefixUrl: '' }]);

        // Process the data to match the Project interface
        const projects: Project[] = data.docs
            .map((project: any) => ({
                title: project.title,
                description: project.description,
                image: project.image?.filename || '',
                githubLink: project.githubLink || '',
                websiteLink: project.websiteLink || null,
                techStacks: (project.techStack || []).map((tech: any) => ({
                    tech_name: tech['tech-name'],
                    color: tech.color,
                })),
                active: project.isCurrent === 'true',
            }))
            .reverse();

        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}
