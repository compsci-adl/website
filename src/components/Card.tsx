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
            className={`border-primary border-b-0 border-black px-6 py-3 leading-none shadow-solid lg:px-8 lg:py-5 ${
                headingClassName ?? ''
            }`}
        >
            <h2 className="text-3xl font-bold lg:text-4xl">{heading}</h2>
        </div>
    );

    return (
        <div {...intrinsicProps} className={`flex flex-col ${className ?? ''}`}>
            {headingComponent}
            <div className="flex-grow border-primary border-black bg-primary-fg py-3 px-5 pb-4 shadow-solid lg:py-5 lg:px-8">
                {children}
            </div>
        </div>
    );
}
