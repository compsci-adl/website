// import SignIn from './SignIn';
import { auth, signIn } from '@/auth';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Sign In',
};

export default async function SignIn() {
    const session = await auth();
    console.log(session);
    if (session) redirect('/settings');
    return (
        <form
            action={async () => {
                'use server';
                await signIn('keycloak');
            }}
        >
            <button className="mt-32" type="submit">
                Signin with Keycloak
            </button>
        </form>
    );
}
