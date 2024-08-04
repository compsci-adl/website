export const TECH_STACK = [
    'Python',
    'FastAPI',
    'TypeScript',
    'React',
    'Next.js',
    'Tailwind CSS',
    'Supabase',
    'Discord.py',
    'Requests',
    'Pragmatic Drag & Drop',
    'Vite',
    'NextUI'
] as const;
export type TechStack = (typeof TECH_STACK)[number];
