import type { ReactNode } from 'react';

type CardProps = {
    className?: string;
    heading?: ReactNode;
    children: ReactNode;
};

export default function Card({ className, heading, children }: CardProps) {
    return (
        <div className="flex flex-col">
            {heading !== undefined && (
                <div
                    className={`border-primary border-b-0 border-black p-4 shadow-solid ${
                        className ?? ''
                    }`}
                >
                    <h1 className=" text-4xl font-bold">{heading}</h1>
                </div>
            )}
            <div className="flex-grow border-primary border-black bg-primary-fg p-4 shadow-solid shadow-black">
                {children}
            </div>
        </div>
    );
}
