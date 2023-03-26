import Navbar from '@/components/navigation/Navbar';

export default function HomeLayout({ children }: RootLayoutProps) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
