import Footer from './Footer';

export default function Events() {
    return (
        <main className="relative z-10 flex h-auto w-responsive flex-col items-center justify-center">
            <section className="flex w-full flex-col items-center justify-start gap-6 pt-[10em] max-md:pb-12 md:pt-[16em]">
                <h1 className="text-center text-5xl font-bold md:text-6xl lg:text-primary-heading">
                    EVENTS
                </h1>
            </section>

            <Footer />
        </main>
    );
}
