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
    {
        title: 'Voxel Game Engine + Game',
        description:
            'A voxel game engine made from scratch that will be used to make a rouge-like game.',
        image: 'voxel-engine.png',
        githubLink: 'https://github.com/compsci-adl/voxel-engine',
        techStacks: ['C++', 'OpenGL'],
    },
    {
        title: 'Courses API',
        description:
            'Scrapes course info from the UofA website and provides course data for other projects through an API endpoint.',
        image: 'courses-api.png',
        githubLink: 'https://github.com/compsci-adl/courses-api',
        techStacks: ['Python', 'FastAPI', 'Requests'],
    },
    {
        title: 'MyTimetable',
        description:
            'An interactive drag-and-drop timetable scheduler to help UofA students optimise their weekly timetable.',
        image: 'mytimetable.png',
        githubLink: 'https://github.com/compsci-adl/mytimetable',
        techStacks: [
            'TypeScript',
            'React',
            'Vite',
            'Pragmatic Drag & Drop',
            'NextUI',
            'Tailwind CSS',
        ],
    },
];
