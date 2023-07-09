import { type Metadata } from 'next';
import SignInForm from '@/components/forms/SigninForm';
import ClubLogo from '@/svg/ClubLogo';

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Sign in to your account',
};

export default function SignInPage() {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <ClubLogo className="mx-auto h-[9rem] w-auto" />
                <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <SignInForm />
        </div>
    );
}
