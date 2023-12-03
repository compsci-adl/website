import Footer from '../components/footer';
import Header from '../components/header';

export default function Home() {
    return (
        <div className="bg-background min-h-screen">
            <img
                className="h-32 px-16 md:px-24 py-4 mt-4 fixed z-10 transition-all duration-500"
                src="/logo.png"
                alt="Computer Science Club Logo"
            />
            <Header></Header>
            <div className="top-8 font-archivo text-white">
                <main className="container mx-12 md:mx-20 px-4 py-8 transition-all duration-500">
                    <section className="mb-8">
                        <div className="h-32"></div>
                        <h2 className="text-2xl font-bold text-white">Computer Science Club</h2>
                        <div className="h-96"></div>
                        <p>Text</p>
                        <div className="h-96"></div>
                        <p>Text</p>
                        <div className="h-96"></div>
                        <p>Text</p>
                    </section>
                </main>
            </div>
            <Footer></Footer>
        </div>
    );
}
