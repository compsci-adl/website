'use client';

import Button from '@/components/Button';
import FancyRectangle from '@/components/FancyRectangle';
import Field from '@/components/Field';
import validateFields from '@/util/validation';
import { useSignIn } from '@clerk/clerk-react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';

// Define validation schemas
const emailSchema = z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Please enter a valid email' });
const passwordSchema = z.string().min(1, { message: 'Please enter your password' });

export default function SignInForm() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleSignIn = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();

        const isValid = validateFields(
            [emailAddress, password],
            [emailSchema, passwordSchema],
            [setEmailError, setPasswordError]
        );

        if (!isValid) return;

        if (!isLoaded) return;

        try {
            const result = await signIn.create({
                identifier: emailAddress,
                password,
            });

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
            } else {
                console.log(result);
            }
        } catch (err: any) {
            // Handle any errors that might occur during the sign-in process
            if (err.errors[0].code === 'form_identifier_not_found') {
                setEmailError("Can't find your account");
            } else if (err.errors[0].code === 'form_password_incorrect') {
                setPasswordError('Password is incorrect. Try again, or use another method.');
            } else if (err.errors[0].code === 'strategy_for_user_invalid') {
                setPasswordError(
                    'Account is not set up for password sign-in. Please sign in with Google.'
                );
            } else {
                console.error(err);
            }
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            if (signIn) {
                await signIn.authenticateWithRedirect({
                    strategy: 'oauth_google',
                    redirectUrl: '/sso-callback',
                    redirectUrlComplete: '/',
                });
            }
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
                    <form>
                        <Field
                            label="Email"
                            value={emailAddress}
                            onChange={(value) => setEmailAddress(value)}
                            error={emailError}
                        />
                        <Field
                            label="Password"
                            value={password}
                            onChange={(value) => setPassword(value)}
                            type="password"
                            error={passwordError}
                        />
                        <a
                            href="/forgot-password"
                            className="text-orange flex mb-8 text-lg md:text-base"
                        >
                            Forgot password?
                        </a>
                        <Button
                            onClick={handleSignIn}
                            type="submit"
                            colour="orange"
                            width="w-[19rem] md:w-[25.5rem]"
                        >
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
