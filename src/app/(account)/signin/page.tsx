import { currentUser } from '@clerk/nextjs/server';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import SignIn from './SignIn';

export const metadata: Metadata = {
    title: 'Sign In',
};

export default async function SignInPage() {
    const user = await currentUser();
    if (user) redirect('/settings');
    return <SignIn />;
}
