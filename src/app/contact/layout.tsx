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
    description:
        'Contact us on Facebook, Discord or by email. For sponsorships, please email sponsorships@csclub.org.au',
};
