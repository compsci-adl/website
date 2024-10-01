import type { TechStack } from '@/constants/tech-stack';

export interface FutureProject {
    title: string;
    description: string;
    techStacks: TechStack[];
}

export const FUTURE_PROJECTS: FutureProject[] = [
    {
        title: 'MyStudyPlan',
        description:
            'A UofA degree planner that allows you to explore and validate your degree structure.',
        techStacks: ['TypeScript', 'React', 'Vite', 'Tailwind CSS'],
    },
    {
        title: 'MyCourseReviews',
        description: 'Allows students to share reviews and rate UofA courses.',
        techStacks: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Supabase'],
    },
];
