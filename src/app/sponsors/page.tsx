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

export default function Sponsors() {
    return (
        <main className="relative z-10 flex h-auto w-responsive flex-col items-center justify-center">

            <section
                className="flex w-full flex-col items-center justify-start gap-6 pt-[10em] max-md:pb-12 md:pt-[16em]"
            >
                <h1 className="text-center font-bold text-5xl md:text-6xl lg:text-primary-heading">
                    SPONSORS
                </h1>
            </section>

            <section className="w-full pt-12 md:pt-16 lg:pt-20 text-center">
                <h2 className="text-xl md:text-3xl">
                    The University of Adelaide Computer Science Club are proudly supported by our generous sponsors.
                </h2>
            </section>

            <Footer />
        </main>
    );
}
