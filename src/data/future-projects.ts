import type { TechStack } from '@/constants/tech-stack';

export interface FutureProject {
    title: string;
    description: string;
    techStacks: TechStack[];
}

export const FUTURE_PROJECTS: FutureProject[] = [
    {
        title: 'Courses API',
        description:
            'Scrapes course info from the UofA website and provides course data for other projects through an API endpoint.',
        techStacks: ['Python', 'FastAPI', 'Requests'],
    },
    {
        title: 'MyTimetable',
        description:
            'An interactive drag-and-drop timetable scheduler to help UofA students optimise their weekly timetable.',
        techStacks: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
    },
    {
        title: 'MyStudyPlan',
        description:
            'A UofA degree planner that allows you to explore and validate your degree structure.',
        techStacks: ['TypeScript', 'React', 'Vite', 'Tailwind CSS'],
    },
    {
        title: 'MyCourseReviews',
        description: 'Allows students to share reviews and rate UofA courses.',
        techStacks: ['TypeScript', 'React', 'Vite', 'Pragmatic Drag & Drop', 'NextUI', 'Tailwind CSS'],
    },
];
