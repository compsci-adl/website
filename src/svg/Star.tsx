import type { SVGProps } from 'react';

export default function Star(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268 268" {...props}>
            <path d="M130.4 3.2c.5-4.3 6.7-4.3 7.2 0l4.2 35.5a100 100 0 0 0 87.5 87.5l35.5 4.2c4.3.5 4.3 6.7 0 7.2l-35.5 4.2a100 100 0 0 0-87.5 87.5l-4.2 35.5c-.5 4.3-6.7 4.3-7.2 0l-4.2-35.5a100 100 0 0 0-87.5-87.5l-35.5-4.2c-4.3-.5-4.3-6.7 0-7.2l35.5-4.2a100 100 0 0 0 87.5-87.5l4.2-35.5Z" />
        </svg>
    );
}
