import FooterComponent from '@/components/Footer';

export default function Footer() {
    return (
        <section className="mg:gap-16 relative flex w-full flex-col items-start justify-center gap-10 pt-36 lg:pt-36">
            <FooterComponent className="pt-24 md:pt-36 lg:pt-48" />
        </section>
    );
}
