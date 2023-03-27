import type { SVGProps } from 'react';

export default function Diagonals(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225 225" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M186 0h-12l51 51V39L186 0Zm39 11L214 0h11v11Zm0 68L146 0h-12l91 91V79Zm0 40L106 0H94l131 131v-12Zm0 40L66 0H54l171 171v-12Zm0 40L26 0H14l211 211v-12Zm-14 26L0 14v12l199 199h12Zm-40 0L0 54v12l159 159h12Zm-40 0L0 94v12l119 119h12Zm-40 0L0 134v12l79 79h12Zm-40 0L0 174v12l39 39h12Zm-40 0L0 214v11h11Z"
            />
        </svg>
    );
}
