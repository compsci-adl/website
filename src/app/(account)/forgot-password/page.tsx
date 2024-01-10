'use client';

import Button from '@/components/Button';
import FancyRectangle from '@/components/FancyRectangle';
import Field from '@/components/Field';
import validateFields from '@/util/validation';
import { useSignIn } from '@clerk/nextjs';
import React, { SyntheticEvent, useState } from 'react';
import { z } from 'zod';

const emailSchema = z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Please enter a valid email' });

const codeSchema = z
    .string()
    .min(1, { message: 'Please enter the code' })
    .min(6, { message: 'Code must be 6 digits' })
    .regex(/^\d+$/, {
        message: 'Code must be numeric',
    });

const passwordSchema = z
    .string()
    .min(1, { message: 'Please enter a password' })
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/^(?=.*[a-zA-Z]).+$/, { message: 'Password must include a letter' })
    .regex(/^(?=.*[0-9]).+$/, { message: 'Password must include a number' });

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { signIn, setActive } = useSignIn();

    const [emailError, setEmailError] = React.useState<string | null>(null);
    const [passwordError, setPasswordError] = React.useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = React.useState<string | null>(null);
    const [codeError, setCodeError] = React.useState<string | null>(null);

    const handleSendCode = async (e: SyntheticEvent) => {
        const isValid = validateFields([email], [emailSchema], [setEmailError]);

        if (isValid) {
            try {
                const result = await signIn?.create({
                    strategy: 'reset_password_email_code',
                    identifier: email,
                });

                if (result) {
                    setStep(2);
                }
            } catch (err: any) {
                if (err.errors && err.errors[0]?.code === 'form_identifier_not_found') {
                    setEmailError(
                        "Couldn't find account with given email. Please create an account first."
                    );
                } else if (
                    err.errors &&
                    err.errors[0]?.code === 'form_conditional_param_value_disallowed'
                ) {
                    setEmailError(
                        'Account was created through Google. Please sign in using Google.'
                    );
                } else {
                    console.error(err);
                }
            }
        }
    };

    const handleResetPassword = async (e: SyntheticEvent) => {
        const isCodeValid = validateFields([code], [codeSchema], [setCodeError]);
        const isPasswordValid = validateFields([password], [passwordSchema], [setPasswordError]);

        const doPasswordsMatch = password === confirmPassword;
        setConfirmPasswordError(doPasswordsMatch ? null : 'Passwords do not match');

        if (isCodeValid && isPasswordValid && doPasswordsMatch) {
            try {
                const resetResult = await signIn?.attemptFirstFactor({
                    strategy: 'reset_password_email_code',
                    code,
                    password,
                });

                if (resetResult?.status === 'complete') {
                    if (setActive) {
                        setActive({ session: resetResult.createdSessionId });
                    }
                    setStep(3);
                }
            } catch (err: any) {
                if (err.errors[0].code === 'form_password_not_strong_enough') {
                    setPasswordError(
                        'Given password is not strong enough. For account safety, please use a different password.'
                    );
                } else if (err.errors[0].code === 'form_password_pwned') {
                    setPasswordError(
                        'Password has been found in an online data breach. For account safety, please use a different password.'
                    );
                } else if (err.errors[0].code === 'form_code_incorrect') {
                    setCodeError('Incorrect Code. Please enter the code from your email.');
                } else {
                    console.error(err);
                }
            }
        }
    };

    return (
        <section className="mt-64 mb-16 w-[25rem]">
            <FancyRectangle colour="purple" offset="8" filled={true}>
                <div className="bg-white border-black border-4 text-black w-fit px-12 py-12 z-0">
                    <h3 className="font-bold text-3xl">Forgot Your Password?</h3>
                    <p className="text-xl mb-8">
                        {step === 1 && 'Enter your email to receive a reset code.'}
                        {step === 2 &&
                            'Enter your new password and the code received in your email.'}
                        {step === 3 && 'Password reset complete!'}
                    </p>
                    <form>
                        {step === 1 && (
                            <>
                                <Field
                                    label="Email"
                                    value={email}
                                    onChange={(value) => setEmail(value)}
                                    error={emailError}
                                />
                                <Button onClick={handleSendCode} colour="orange" width="w-[25rem]">
                                    Send Code
                                </Button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <Field
                                    label="New password"
                                    value={password}
                                    onChange={(value) => setPassword(value)}
                                    error={passwordError}
                                    type="password"
                                />
                                <Field
                                    label="Confirm password"
                                    value={confirmPassword}
                                    onChange={(value) => setConfirmPassword(value)}
                                    error={confirmPasswordError}
                                    type="password"
                                />
                                <Field
                                    label="Reset code"
                                    value={code}
                                    onChange={(value) => setCode(value)}
                                    error={codeError}
                                />
                                <Button
                                    onClick={handleResetPassword}
                                    colour="orange"
                                    width="w-[25rem]"
                                >
                                    Reset Password
                                </Button>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <Button href="/" colour="orange" width="w-[25rem]">
                                    Return to Home Page
                                </Button>
                            </>
                        )}
                    </form>
                </div>
            </FancyRectangle>
        </section>
    );
}
