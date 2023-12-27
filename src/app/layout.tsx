import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';

export const metadata: Metadata = {
    icons: '/favicon.ico',
    title: 'Computer Science Club',
    description:
        'The University of Adelaide Computer Science Club is a student-run club for those with an interest in computer science or computing in general.',
};

// TODO: Add canonical URLs
// TODO: Sitemap
// TODO: Meta tags

export const viewport: Viewport = {
    themeColor: '#252020',
};

const archivo = Archivo({
    variable: '--font-archivo',
    subsets: ['latin'],
    display: 'swap',
});

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" className={archivo.className}>
            <body className="overflow-x-hidden bg-grey">
                <div id="root" className="flex flex-col items-center">
                    {children}
                </div>
            </body>
        </html>
    );
}
