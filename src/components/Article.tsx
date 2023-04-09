import type { ReactNode } from 'react';

type ArticleProps = JSX.IntrinsicElements['article'] & {
    heading?: ReactNode;
};

export default function Article({ className, heading, children, ...props }: ArticleProps) {
    let headingComponent = heading;

    // Text shorthand heading - surround emphasised text with '*'
    if (typeof heading === 'string') {
        headingComponent = heading.split('*').map((part, i) =>
            i % 2 ? (
                <span key={part} className="text-accent-blue">
                    {part}
                </span>
            ) : (
                part
            )
        );
    }

    return (
        <article
            className={`flex flex-col gap-2 text-lg leading-7 md:text-xl md:leading-10 ${className ?? ''
                }`}
            {...props}
        >
            {heading !== undefined && (
                <h2 className="text-3xl font-bold lg:text-4xl">{headingComponent}</h2>
            )}
            {children}
        </article>
    );
}
