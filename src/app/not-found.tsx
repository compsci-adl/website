import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Navbar from '@/components/navigation/Navbar';

export default function NotFound() {
    return (
        <>
            <Navbar />
            <main className="relative z-10 flex h-auto w-responsive flex-col items-center justify-center">
                <section className="flex w-full flex-col items-center justify-start gap-6 pt-[10em] max-md:pb-12 md:pt-[16em]">
                    <h1 className="text-left text-5xl font-bold md:text-6xl lg:text-primary-heading">
                        404
                    </h1>
                    <h2 className="text-left text-5xl font-bold md:text-6xl lg:text-secondary-heading">
                        Not found
                    </h2>
                    <Button
                        className="bg-accent-highlight px-5 py-2 text-xl font-bold lg:px-6 lg:py-3 lg:text-2xl"
                        href="/"
                    >
                        Go to home
                    </Button>
                </section>
                <section className="mg:gap-16 relative flex w-full flex-col items-start justify-center gap-10 pt-36 lg:pt-36">
                    <Footer className="pt-24 md:pt-36 lg:pt-48" />
                </section>
            </main>
        </>
    );
}
