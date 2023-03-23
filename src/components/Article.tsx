import type { ReactNode } from 'react';

type ArticleProps = {
    title?: ReactNode;
    children: ReactNode;
};

// TODO remove, just use h1 tags in children for now
export default function Article({ title, children }: ArticleProps) {
    return (
        <article className="flex flex-row gap-2 text-2xl leading-10">
            {title !== undefined && <h2 className="font-bold">{title}</h2>}
            {children}
        </article>
    );
}
