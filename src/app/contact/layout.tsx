import Navbar from '@/components/navigation/Navbar';

export default function ContactLayout({ children }: RootLayoutProps) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

export const metadata = {
    title: 'Contact - CS Club',
};
