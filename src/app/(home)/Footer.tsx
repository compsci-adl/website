import Link from 'next/link';
import Article from '@/components/Article';
import LinkButton from '@/components/LinkButton';
import FooterComponent from '@/components/Footer';

export default function Footer() {
    return (
        <section className="mg:gap-16 relative flex w-full flex-col items-start justify-center gap-10 pt-36 lg:pt-36">
            <h1 className="text-4xl font-bold md:w-3/4 md:text-5xl lg:text-primary-heading">
                A Community that <i>Really</i> <span className="text-accent-blue">Cares</span>
            </h1>
            <div className="flex w-full flex-col items-start justify-between max-lg:gap-16 max-md:gap-10 lg:flex-row lg:items-center">
                <div className="z-20 flex flex-row gap-5 text-xl font-bold md:gap-12 lg:gap-16 lg:text-3xl">
                    <LinkButton
                        className="bg-accent-highlight px-7 py-3 lg:py-5 lg:px-9"
                        href="/join"
                    >
                        Join Us
                    </LinkButton>
                    <LinkButton className="bg-primary-bg px-7 py-3 lg:py-5 lg:px-9" href="/about">
                        About
                    </LinkButton>
                </div>
                <Article className="lg:w-2/5">
                    <p className="text-xl md:text-2xl lg:text-3xl">
                        The Club operates during the entire academic year. For any queries you may
                        have, please feel free to{' '}
                        <Link className="text-accent-blue" href="/contact">
                            reach out
                        </Link>{' '}
                        to us.
                    </p>
                </Article>
            </div>
            <FooterComponent className="pt-20 md:pt-32 lg:pt-40" />
        </section>
    );
}
