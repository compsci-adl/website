import { env } from '@/env.mjs';

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

const projectURL = env.NEXT_PUBLIC_PAYLOAD_URI + "/api/projects?limit=100";

export async function fetchProjectsData(): Promise<Project[]> {
  try {
    // Fetch data from the API
    const res = await fetch(projectURL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch sponsors: ${res.statusText}`);
    const data = await res.json();
    console.log(data.docs[0]);

    // Process the data to match the Project interface
    const projects: Project[] = data.docs.map((project: any) => ({
      title: project.title,
      description: project.description,
      image: project.image.filename,
      githubLink: project['githubLink'],
      websiteLink: project.websiteLink || null,
      techStacks: project['techStack'].map((tech: any) => ({
        tech_name: tech['tech-name'],
        color: tech.color,
      })),
      active: project.active === 'true',
    }));
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}