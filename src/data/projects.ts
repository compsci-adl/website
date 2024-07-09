export interface Project {
    title: string;
    description: string;
    image: string;
    githubLink: string;
}

export const PROJECTS: Project[] = [
    {
        title: 'CS Club Website',
        description: "The Computer Science Club's website.",
        image: 'website.png',
        githubLink: 'https://github.com/compsci-adl/website',
    },
    {
        title: 'DuckBot',
        description: "A Discord bot for the CS Club's Discord Server.",
        image: 'duckbot.png',
        githubLink: 'https://github.com/compsci-adl/duckbot',
    },
];
