import type { SVGProps } from 'react';

export default function Caterpillar(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 316 316" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M81.4 14a47.6 47.6 0 0 1 13.2 41.9 47.6 47.6 0 0 1 55.2 55.1 47.6 47.6 0 0 1 55.2 55.2 47.6 47.6 0 0 1 55.1 55.2 47.6 47.6 0 1 1-38.7 38.7 47.6 47.6 0 0 1-55.2-55.1 47.6 47.6 0 0 1-55.2-55.2 47.6 47.6 0 0 1-55-55.2A47.6 47.6 0 1 1 81.4 14Z"
            />
        </svg>
    );
}
