import Navbar from '@/components/navigation/Navbar';

export default function JoinLayout({ children }: RootLayoutProps) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

export const metadata = {
    title: 'Join the club - CS Club',
};
