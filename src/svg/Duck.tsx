import type { SVGProps } from 'react';

type DuckProps = SVGProps<SVGSVGElement> & {
    mono?: boolean;
};

const FILL_PRIMARY = '#FCC018';
const FILL_SECONDARY = '#E78F0C';

export default function Duck({ mono, ...svgProps }: DuckProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 516 488" {...svgProps}>
            <path
                fill="#FCC018"
                fillRule="evenodd"
                d="M411 173s-22 9-21 32 71 33 71 122c0 90-97 160-205 160C147 487 0 422 0 291c5-220 16-68 185-68 56 0 66-19 57-31-42-53-57-192 80-192 89 2 112 83 112 102-1 12-9 43-9 43l-14 28Z"
                clipRule="evenodd"
            />
            <path
                fill={mono === true ? FILL_PRIMARY : FILL_SECONDARY}
                d="M485 158c-30 12-74 19-74 14-4-6 6-58 23-74 7 11 37 9 79 9l2 1c3 13 0 37-30 50Z"
            />
            {mono !== true && (
                <ellipse
                    cx="10.3"
                    cy="14.4"
                    fill="#272624"
                    rx="10.3"
                    ry="14.4"
                    transform="matrix(-1 0 0 1 380 66)"
                />
            )}
        </svg>
    );
}
