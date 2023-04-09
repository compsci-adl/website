import Navbar from '@/components/navigation/Navbar';

export default function EventsLayout({ children }: RootLayoutProps) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

export const metadata = {
    title: 'Events - CS Club',
};
