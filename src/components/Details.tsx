import type { ReactNode } from 'react';

type DetailsProps = JSX.IntrinsicElements['details'] & {
    summary: string;
    children: ReactNode;
};

export default function Details({ summary, children }: DetailsProps) {
    return (
        <details className="mt-6 border-primary border-black bg-primary-fg p-4 shadow-solid">
            <summary className="">{summary}</summary>
            <hr className="my-2 h-1 w-full border-0 bg-black" />
            <div className="pt-2">{children}</div>
        </details>
    );
}
