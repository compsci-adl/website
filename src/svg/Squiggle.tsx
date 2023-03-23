import type { SVGProps } from 'react';

export default function Squiggle(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 278 188" {...props}>
            <path d="M6 49c0-3-3-6-6-6V0c27 0 49 22 49 49v90a6 6 0 1 0 12 0V49a49 49 0 1 1 98 0v90a6 6 0 1 0 13 0V49a49 49 0 1 1 98 0v90a6 6 0 1 0 12 0V49c0-27 22-49 49-49v43c-3 0-6 3-6 6v90a49 49 0 1 1-98 0V49a6 6 0 1 0-12 0v90a49 49 0 1 1-99 0V49a6 6 0 1 0-12 0v90a49 49 0 1 1-98 0V49Z" />
        </svg>
    );
}
