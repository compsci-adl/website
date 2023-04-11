import { Archivo } from 'next/font/google';
import '@/styles/globals.css';

const ARCHIVO = Archivo({
    subsets: ['latin'],
    display: 'swap',
});

// TODO: Add canonical URLs
// TODO: Sitemap
// TODO: Meta tags

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" className={`${ARCHIVO.className} w-full overflow-x-hidden`}>
            <body className="flex h-full w-full justify-center overflow-x-hidden bg-primary-bg">
                {children}
            </body>
        </html>
    );
}

export const metadata = {
    title: "CS Club",
    description: "Official website of the University of Adelaide Computer Science Club"
};
