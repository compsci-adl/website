import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
    icons : '/favicon.ico',
    title: 'Computer Science Club',
    description:
        'The University of Adelaide Computer Science Club is a student-run club for those with an interest in computer science or computing in general.',
};

export const viewport: Viewport = {
    themeColor: '#252020',
};

const archivo = Archivo({
    subsets: ['latin'],
    display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={archivo.className}>
            <body>{children}</body>
        </html>
    );
}
