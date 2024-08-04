export const TECH_STACK = [
    "Python",
    "FastAPI",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Supabase",
    "Discord.py",
] as const;
export type TechStack = (typeof TECH_STACK)[number];
