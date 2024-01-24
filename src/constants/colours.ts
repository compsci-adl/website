export type Colour = 'black' | 'grey' | 'white' | 'yellow' | 'orange' | 'purple';

export const BG_COLOURS = {
    black: 'bg-black',
    grey: 'bg-grey',
    white: 'bg-white',
    yellow: 'bg-yellow',
    orange: 'bg-orange',
    purple: 'bg-purple',
} as const satisfies Record<Colour, string>;

export const BORDER_COLOURS = {
    black: 'border-black border-2',
    grey: 'border-grey border-2',
    white: 'border-white border-2',
    yellow: 'border-yellow border-2',
    orange: 'border-orange border-2',
    purple: 'border-purple border-2',
} as const satisfies Record<Colour, string>;
