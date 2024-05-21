export interface Project {
    title: string;
    description: string;
    languages: string[];
    frameworks: string[];
    image: string;
    githubLink: string;
}

export const PROJECTS: Project[] = [
    {
        title: 'CS Club Website',
        description: "The Computer Science Club's website.",
        languages: ['HTML', 'TypeScript', 'CSS'],
        frameworks: ['React', 'Next.js', 'Tailwind CSS'],
        image: 'website.png',
        githubLink: 'https://github.com/compsci-adl/website',
    },
    {
        title: 'DuckBot',
        description:
            "DuckBot is a Discord bot written in Python using the discord.py library for the CS Club's Discord Server. It provides various commands and functionality to enhance your Discord server experience.",
        languages: ['Python'],
        frameworks: ['Discord.py'],
        image: 'duckbot.png',
        githubLink: 'https://github.com/compsci-adl/duckbot',
    },
];
