import Footer from './Footer';
import SponsorProfile from './SponsorProfile';

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
                    generous sponsors
                </h2>
            </section>

            <section className="w-full pt-12 text-center md:pt-16 lg:pt-20">
                <div className="grid grid-flow-row grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* NOTE: If the logo width is not significantly larger than its height,
                    it should be padded at the width to ensure the logo isn't stretched */}
                    <SponsorProfile
                        name="Atlassian"
                        logo="/sponsor-logos/atlassian.svg"
                        link="/sponsors/atlassian"
                    />
                    <SponsorProfile
                        name="Macquarie"
                        logo="/sponsor-logos/macquarie.svg"
                        link="/sponsors/macquarie"
                    />
                    <SponsorProfile name="PwC" logo="/sponsor-logos/pwc.svg" link="/sponsors/pwc" />
                </div>
            </section>

            <Footer />
        </main>
    );
}
