export interface FutureProject {
    title: string;
    description: string;
    techStack: string[];
}

export const FUTURE_PROJECTS: FutureProject[] = [
    {
        title: 'Courses API',
        description:
            'Scrapes course info from the UofA website and provides course data for other projects through an API endpoint.',
        techStack: ['Python', 'Beautiful Soup', 'Fast API'],
    },
    {
        title: 'MyScheduler',
        description:
            'An interactive drag-and-drop timetable scheduler to help UofA students optimise their weekly timetable.',
        techStack: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
    },
    {
        title: 'MyStudyPlan',
        description:
            'A UofA degree planner that allows you to explore and validate your degree structure.',
        techStack: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
    },
    {
        title: 'MyCourseReviews',
        description: 'Allows students to share reviews and rate UofA courses.',
        techStack: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Supabase'],
    },
];
