import type { TechStack } from '@/constants/tech-stack';

export interface Project {
    title: string;
    description: string;
    image: string;
    githubLink: string;
    techStacks: TechStack[];
}

export const PROJECTS: Project[] = [
    {
        title: 'CS Club Website',
        description: "The Computer Science Club's website.",
        image: 'website.png',
        githubLink: 'https://github.com/compsci-adl/website',
        techStacks: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    },
    {
        title: 'DuckBot',
        description: "A Discord bot for the CS Club's Discord Server.",
        image: 'duckbot.png',
        githubLink: 'https://github.com/compsci-adl/duckbot',
        techStacks: ['Python', 'Discord.py'],
    },
];
