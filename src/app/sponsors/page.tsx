import Footer from './Footer';

export default function Sponsors() {
    return (
        <main className="relative z-10 flex h-auto w-responsive flex-col items-center justify-center">
            <section className="flex w-full flex-col items-center justify-start gap-6 pt-[10em] max-md:pb-12 md:pt-[16em]">
                <h1 className="text-center text-5xl font-bold md:text-6xl lg:text-primary-heading">
                    SPONSORS
                </h1>
            </section>

            <section className="w-full pt-12 text-center md:pt-16 lg:pt-20">
                <h2 className="text-xl md:text-3xl">
                    The University of Adelaide Computer Science Club are proudly supported by our
                    generous sponsors.
                </h2>
            </section>

            <Footer />
        </main>
    );
}
