export interface Project {
    title: string;
    description: string;
    image: string;
    githubLink: string;
    techStack: string[];
}

export const TECH_COLORS: { [key: string]: string } = {
    'Next.js': '#B17CA6',
    React: '#ED8C9B',
    TypeScript: '#ACCB00',
    'Tailwind CSS': '#8876BE',
    Python: '#64B550',
    'Discord.py': '#5E74C7',
};

export const PROJECTS: Project[] = [
    {
        title: 'CS Club Website',
        description: "The Computer Science Club's website.",
        image: 'website.png',
        githubLink: 'https://github.com/compsci-adl/website',
        techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    },
    {
        title: 'DuckBot',
        description: "A Discord bot for the CS Club's Discord Server.",
        image: 'duckbot.png',
        githubLink: 'https://github.com/compsci-adl/duckbot',
        techStack: ['Python', 'Discord.py'],
    },
];
