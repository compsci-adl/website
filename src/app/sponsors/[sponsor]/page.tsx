import Image from 'next/image';
import { notFound } from 'next/navigation';
import { COMPANIES } from './companies';
import LinkButton from '@/components/LinkButton';
import Footer from './Footer';

// NOTE: Not supported in Nextjs 13
// export function getStaticPaths() {
//     const paths = COMPANIES.map((sponsor) => {
//         return {
//             params: { sponsor: sponsor.name },
//         };
//     });
//
//     return {
//         paths,
//         fallback: false,
//     };
// }

export default function Page({ params }: { params: { sponsor: string } }) {
    const res = COMPANIES.find((element) => element.name === params.sponsor);
    if (res === undefined) {
        notFound();
    }

    return (
        <main className="relative z-10 flex h-auto w-responsive flex-col items-center justify-center">
            <section className="flex w-full flex-col items-center justify-start gap-6 pt-[10em] max-md:pb-12 md:pt-[16em]">
                <div className="relative mx-auto my-4 h-60 w-full">
                    <Image
                        className="mx-auto"
                        src={res.logoPath}
                        alt={`${res.displayName} logo`}
                        fill
                    />
                </div>
                <h2 className="text-left text-5xl font-bold md:text-6xl lg:text-secondary-heading">
                    {res.displayName}
                </h2>
                <p>{res.desc}</p>
                <LinkButton
                    className="bg-accent-highlight px-5 py-2 text-xl font-bold lg:px-6 lg:py-3 lg:text-2xl"
                    href={res.link}
                    target="_blank"
                >
                    Website
                </LinkButton>
            </section>

            <Footer />
        </main>
    );
}
