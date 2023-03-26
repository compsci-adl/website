import Navbar from '@/components/Navbar';

export default function Layout({ children }: RootLayoutProps) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
