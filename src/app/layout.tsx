import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
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
        <ClerkProvider
            appearance={{
                variables: {
                    colorPrimary: '#E1652B',
                    colorBackground: '#F3F3EB',
                    borderRadius: '0',
                    fontFamily: 'var(--font-archivo)',
                },
                elements: {
                    formButtonPrimary: 'hover:bg-yellow shadow-button',
                    card: 'shadow-card border-4 border-black',
                    formFieldInput: 'shadow-button border-2 border-black',
                },
            }}
        >
            <html lang="en" className={archivo.className}>
                <body className="overflow-x-hidden bg-grey text-white">
                    <Header />
                    <div className="mx-auto min-h-screen w-responsive pb-6 pt-32 md:pt-40">
                        {children}
                    </div>
                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    );
}
