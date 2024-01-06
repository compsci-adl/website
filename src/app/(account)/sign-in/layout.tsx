import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function SignInLayout({ children }: RootLayoutProps) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
