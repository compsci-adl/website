// the list below is sorted in alphabetical order by tech stack name
export const TECH_STACK = [
    'Discord.py',
    'FastAPI',
    'Next.js',
    'NextUI',
    'Pragmatic Drag & Drop',
    'Python',
    'React',
    'Requests',
    'Supabase',
    'Tailwind CSS',
    'TypeScript',
    'Vite',
] as const;
export type TechStack = (typeof TECH_STACK)[number];
