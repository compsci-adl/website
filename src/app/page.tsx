import Header from '../components/header';
import Footer from '../components/footer';

export default function Home() {
    return (
        <div className="bg-background min-h-screen">
            <div className="top-8 left-24 right-24 fixed font-archivo">
      <Header></Header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white">Computer Science Club</h2>
        </section>
      </main>
    </div>
   <Footer></Footer>
    </div>
  );
}
