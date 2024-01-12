import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';

export default function NotFound() {
    return (
        <>
            <Header />
            <main className="relative z-10 flex h-auto w-responsive flex-col items-center justify-center mt-32 mb-64 text-white">
                <section className="flex w-full flex-col items-center justify-start gap-6 pt-[10em] max-md:pb-12 md:pt-[16em]">
                    <h1 className="text-left text-5xl font-bold md:text-6xl lg:text-primary-heading">
                        404
                    </h1>
                    <h2 className="text-left text-5xl font-bold md:text-6xl lg:text-secondary-heading">
                        Not found
                    </h2>
                    <Link
                        className="px-5 py-2 text-xl font-bold lg:px-6 lg:py-3 lg:text-2x"
                        href="/"
                    >
                        Go home
                    </Link>
                </section>
            </main>
            <Footer />
        </>
    );
}
