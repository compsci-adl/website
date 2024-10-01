import type { TechStack } from '@/constants/tech-stack';

export type Colour = 'black' | 'grey' | 'lightGrey' | 'white' | 'yellow' | 'orange' | 'purple';

export const BG_COLOURS = {
    black: 'bg-black',
    grey: 'bg-grey',
    lightGrey: 'bg-gray-500',
    white: 'bg-white',
    yellow: 'bg-yellow',
    orange: 'bg-orange',
    purple: 'bg-purple',
} as const satisfies Record<Colour, string>;

export const BORDER_COLOURS = {
    black: 'border-black border-2',
    grey: 'border-grey border-2',
    lightGrey: 'border-gray-500 border-2',
    white: 'border-white border-2',
    yellow: 'border-yellow border-2',
    orange: 'border-orange border-2',
    purple: 'border-purple border-2',
} as const satisfies Record<Colour, string>;

// the list below is sorted in alphabetical order by tech stack name
export const TECH_COLORS = {
    'Discord.py': '#7387CE',
    FastAPI: '#F6BF00',
    NextUI: '#A8DADC',
    'Next.js': '#B17CA6',
    'Pragmatic Drag & Drop': '#FF6F61',
    Python: '#64B550',
    React: '#ED8C9B',
    Requests: '#017DFA',
    Supabase: '#5DBBB5',
    'Tailwind CSS': '#907FC3',
    TypeScript: '#ACCB00',
    Vite: '#FFA500',
    'C++': '#5E96D0',
    OpenGL: '#FFA500',
} as const satisfies Record<TechStack, string>;

/**
 * Based on code from matfin. Source: https://stackoverflow.com/a/44615197/24033621, licensed under
 * CC BY-SA 3.0.
 *
 * @param {string} backgroundColor - The hex color string to calculate contrast for.
 * @returns {string} - The contrast color, either '#000000' (black) or '#FFFFFF' (white).
 */
export const getContrastColor = (backgroundColor: string): string => {
    const hex = backgroundColor.replace(/^#/, '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const textColor = luminance > 0.5 ? '#000000' : '#FFFFFF';
    return textColor;
};
