import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomeLayout({ children }: RootLayoutProps) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
