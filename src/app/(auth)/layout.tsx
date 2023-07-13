import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

type AuthLayoutProps = {
    children: React.ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const user = await currentUser();
    console.log(user);
    if (user !== null) {
        redirect('/');
    }
    return <div className="flex h-screen w-screen">{children}</div>;
}
