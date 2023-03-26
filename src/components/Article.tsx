import type { ReactNode } from 'react';

type ArticleProps = JSX.IntrinsicElements['article'] & {
    title?: ReactNode;
    children: ReactNode;
};

export default function Article({ title, children, ...intrinsicProps }: ArticleProps) {
    return (
        <article
            {...intrinsicProps}
            className="flex flex-row gap-2 text-xl leading-9 md:text-2xl md:leading-10"
        >
            {title !== undefined && <h2 className="font-bold">{title}</h2>}
            {children}
        </article>
    );
}
