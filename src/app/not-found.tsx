import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center">
            <section className="flex w-full flex-col items-center justify-start gap-6 pt-[10em] max-md:pb-12 md:pt-[16em]">
                <h1 className="lg:text-primary-heading text-left text-5xl font-bold md:text-6xl">
                    404
                </h1>
                <h2 className="lg:text-secondary-heading text-left text-5xl font-bold md:text-6xl">
                    Not found
                </h2>
                <Link
                    className="px-5 py-2 text-xl font-bold underline lg:px-6 lg:py-3 lg:text-2xl"
                    href="/"
                >
                    Go home
                </Link>
            </section>
        </main>
    );
}
