import Navbar from '@/components/navigation/Navbar';

export default function SponsorsLayout({ children }: RootLayoutProps) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

export const metadata = {
    title: 'Sponsors - CS Club',
};
