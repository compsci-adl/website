import Footer from '../components/footer';
import Grid from '../components/grid';
import Header from '../components/header';

export default function Home() {
    return (
        <div className="relative z-10 bg-background h-fit">
            <img
                className="z-20 h-48 px-16 md:px-24 py-4 mt-4 fixed transition-all duration-500"
                src="/logo.png"
                alt="Computer Science Club Logo"
            />
            <Header></Header>
            <div className="top-8 font-archivo text-white">
                <main className="container mx-12 md:mx-20 px-4 py-8">
                    <section className="mb-8 font-archivo-black">
                        <div className="h-48"></div>
                        <Grid></Grid>
                        <div className="relative z-10">
                            <h1 className="text-6xl md:text-8xl lg:text-9xl transition-all duration-500">
                                LEARN,
                            </h1>
                            <h1 className="text-6xl md:text-8xl lg:text-9xl transition-all duration-500">
                                SOCIALISE,
                            </h1>
                            <div className="bg-yellow w-fit px-2 mt-4">
                                <h1 className="text-6xl md:text-8xl lg:text-9xl transition-all duration-500 text-background">
                                    CODE.
                                </h1>
                            </div>
                            <div className="bg-orange w-fit px-2 py-2 md:py-4 mt-8">
                                <h2 className="text-3xl md:text-5xl lg:text-6xl transition-all duration-500 text-white">
                                    Computer Science Club
                                </h2>
                            </div>
                            <div className="h-48"></div>
                            <p></p>
                        </div>
                    </section>
                </main>
            </div>
            <Footer></Footer>
        </div>
    );
}
