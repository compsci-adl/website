import Image from 'next/image';
import Article from '@/components/Article';
import Card from '@/components/Card';
import Caterpillar from '@/svg/Caterpillar';
import Diagonals from '@/svg/Diagonals';
import Dots from '@/svg/Dots';
import Button from '@/components/Button';
import Footer from './Footer';
import Duck from '@/svg/Duck';

const LOGO_SIZE = 150;

export default function Events() {
    return (
        <main className="relative z-10 flex h-auto w-responsive flex-col items-center justify-center">

            <section
                className="flex w-full flex-col items-center justify-start gap-6 pt-[10em] max-md:pb-12 md:pt-[16em]"
            >
                <h1 className="text-center font-bold text-5xl md:text-6xl lg:text-primary-heading">
                    EVENTS
                </h1>
            </section>

            <Footer />
        </main>
    );
}
