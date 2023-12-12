import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Computer Science Club',
    description:
        'The University of Adelaide Computer Science Club is a student-run club for those with an interest in computer science or computing in general.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&family=Archivo+Black&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
