import type { ReactNode } from 'react';

type ArticleProps = {
    title?: ReactNode;
    children: ReactNode;
};

export default function Article({ title, children }: ArticleProps) {
    return (
        <article className="flex flex-row gap-2">
            {title !== undefined && <h1 className="font-bold">{title}</h1>}
            {children}
        </article>
    );
}
