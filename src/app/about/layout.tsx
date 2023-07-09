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
    description:
        "The University of Adelaide Computer Science Club is a student-run club for those with an interest in computer science or computing in general. Although we're a university club, we welcome anyone interested in computer science and/or socialising to join!",
};
