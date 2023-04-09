import Navbar from '@/components/navigation/Navbar';

export default function AboutLayout({ children }: RootLayoutProps) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

export const metadata = {
    title: 'About - CS Club',
};
