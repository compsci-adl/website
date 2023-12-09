import FancyRectangle from '../components/fancyRectangle';
import Footer from '../components/footer';
import Grid from '../components/grid';
import Header from '../components/header';
import ImageCarousel from '../components/imageCarousel';

export default function Home() {
    return (
        <div className="relative z-10 bg-background h-fit">
            <img
                className="z-30 h-48 px-16 md:px-24 py-4 mt-4 fixed transition-all duration-500"
                src="/images/logo.png"
                alt="Computer Science Club Logo"
            />
            <Header></Header>
            <div className="top-8 font-archivo text-white">
                <div className="h-36"></div>
                <main className="mx-12 md:mx-20 px-4 py-8">
                    <section className="mb-8 font-archivo-black">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Left side */}
                            <div>
                                <Grid></Grid>
                                <div className="relative z-10">
                                    <h1 className="text-[10vw] md:text-[7vw]">LEARN,</h1>
                                    <h1 className="text-[10vw] md:text-[7vw]">SOCIALISE,</h1>

                                    <FancyRectangle colour="yellow" offset="16" filled={false}>
                                        <div className="bg-yellow w-fit px-2">
                                            <h1 className="text-[10vw] md:text-[7vw] text-background">
                                                CODE.
                                            </h1>
                                        </div>
                                    </FancyRectangle>
                                    <div className="h-12"></div>
                                    <FancyRectangle colour="orange" offset="16" filled={false}>
                                        <div className="bg-orange w-fit px-2">
                                            <h2 className="text-[5vw] md:text-[3vw] text-background">
                                                Computer Science Club
                                            </h2>
                                        </div>
                                    </FancyRectangle>
                                </div>
                            </div>

                            {/* Right side */}
                            <div className="mt-8 lg:mt-10 lg:ml-32 transition-all duration-500">
                                <ImageCarousel></ImageCarousel>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <Footer></Footer>
        </div>
    );
}
