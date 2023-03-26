import type { ReactNode } from 'react';

type CardProps = JSX.IntrinsicElements['div'] & {
    className?: string;
    headingClassName?: string;
    heading?: ReactNode;
    children: ReactNode;
};

export default function Card({
    className,
    headingClassName,
    heading,
    children,
    ...intrinsicProps
}: CardProps) {
    const headingComponent = heading !== undefined && (
        <div
            className={`border-primary border-b-0 border-black px-7 py-4 shadow-solid md:px-8 md:py-5 ${
                headingClassName ?? ''
            }`}
        >
            <h2 className="text-3xl font-bold md:text-4xl">{heading}</h2>
        </div>
    );

    return (
        <div {...intrinsicProps} className={`flex flex-col ${className ?? ''}`}>
            {headingComponent}
            <div className="flex-grow border-primary border-black bg-primary-fg py-4 px-7 shadow-solid md:py-5 md:px-8">
                {children}
            </div>
        </div>
    );
}
