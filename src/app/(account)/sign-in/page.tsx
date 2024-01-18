'use client';

import Button from '@/components/Button';
import ControlledField from '@/components/ControlledField';
import FancyRectangle from '@/components/FancyRectangle';
import { useSignIn } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';
import { handleClerkErrors } from '../helpers';
import { emailSchema } from '../schemas';

const signInSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, { message: 'Please enter your password' }),
});

export default function SignInForm() {
    const { isLoaded, signIn, setActive } = useSignIn();

    const form = useForm<z.infer<typeof signInSchema>>({
        defaultValues: { email: '', password: '' },
        resolver: zodResolver(signInSchema),
    });

    const handleSignIn = form.handleSubmit(async ({ email, password }) => {
        if (!isLoaded) return;
        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
            } else {
                console.log(result);
            }
        } catch (error) {
            handleClerkErrors(error, form, [
                {
                    code: 'form_identifier_not_found',
                    field: 'email',
                    message: "Can't find your account.",
                },
                {
                    code: 'form_password_incorrect',
                    field: 'password',
                    message: 'Password is incorrect. Try again, or use another method.',
                },
                {
                    code: 'strategy_for_user_invalid',
                    field: 'password',
                    message:
                        'Account is not set up for password sign-in. Please sign in with Google.',
                },
            ]);
        }
    });

    const handleGoogleSignIn = async () => {
        if (!isLoaded) return;
        try {
            await signIn.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/',
            });
        } catch (error) {
            // Handle any errors that might occur during the sign-in process
            console.error('Google Sign-In Error:', error);
        }
    };

    return (
        <section className="mt-40 mb-16 mr-2">
            <FancyRectangle colour="purple" offset="8" filled={true}>
                <div className="bg-white border-black border-4 text-black w-[24rem] md:w-[32rem] px-8 py-8 md:px-12 md:py-12 z-0">
                    {/* Heading */}
                    <h3 className="font-bold text-3xl">Sign In</h3>
                    <p className="text-xl mb-8">Sign into your account</p>

                    <Button
                        onClick={handleGoogleSignIn}
                        colour="white"
                        width="w-[19rem] md:w-[25.5rem]"
                    >
                        <FcGoogle className="text-xl inline-block mr-2" /> Continue with Google
                    </Button>

                    <div className="flex items-center justify-center mt-10 my-6">
                        <div className="border-t border-grey w-full"></div>
                        <p className="mx-4 text-grey">or</p>
                        <div className="border-t border-grey w-full"></div>
                    </div>
                    <form onSubmit={handleSignIn}>
                        <ControlledField label="Email" control={form.control} name="email" />
                        <ControlledField
                            label="Password"
                            control={form.control}
                            name="password"
                            type="password"
                        />
                        <a
                            href="/forgot-password"
                            className="text-orange flex mb-8 text-lg md:text-base"
                        >
                            Forgot password?
                        </a>
                        <Button type="submit" colour="orange" width="w-[19rem] md:w-[25.5rem]">
                            Sign In
                        </Button>
                    </form>

                    {/* Sign-up option */}
                    <div className="flex mt-10">
                        <p className="text-grey text-lg md:text-base">
                            Don&apos;t have an account yet?{' '}
                            <a href="/join-us" className="text-orange">
                                Join Us
                            </a>
                        </p>
                    </div>
                </div>
            </FancyRectangle>
        </section>
    );
}
