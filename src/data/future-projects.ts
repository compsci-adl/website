export interface FutureProject {
    title: string;
    description: string;
    image: string;
    techStack?: string[];
    githubLink?: string;
}

export const FUTURE_PROJECTS: FutureProject[] = [
    {
        title: 'Coming Soon...',
        description:
            "We're always working on new projects, so stay tuned for more exciting projects in the future!",
        image: 'futureproject.png',
    },
];
