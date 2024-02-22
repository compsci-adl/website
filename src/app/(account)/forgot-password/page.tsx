'use client';

import Button from '@/components/Button';
import ControlledField from '@/components/ControlledField';
import FancyRectangle from '@/components/FancyRectangle';
import { useSignIn } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { handleClerkErrors } from '../helpers';
import { codeSchema, emailSchema, passwordSchema } from '../schemas';

const sendCodeSchema = z.object({
    email: emailSchema,
});
const resetPasswordSchema = z
    .object({
        code: codeSchema,
        password: passwordSchema,
        confirmPassword: z.string().min(1, { message: 'Please confirm password' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

const STEP_INSTRUCTIONS = [
    '', // Step start from 1
    'Enter your email to receive a reset code.',
    'Enter your new password and the code received in your email.',
    'Password reset complete!',
] as const;

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1);
    const { isLoaded, signIn, setActive } = useSignIn();

    const sendCodeForm = useForm<z.infer<typeof sendCodeSchema>>({
        defaultValues: { email: '' },
        resolver: zodResolver(sendCodeSchema),
    });
    const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
        defaultValues: { code: '', password: '' },
        resolver: zodResolver(resetPasswordSchema),
    });

    const handleSendCode = sendCodeForm.handleSubmit(async ({ email }) => {
        if (!isLoaded) return;
        try {
            const result = await signIn.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            });
            if (result) {
                setStep(2);
            }
        } catch (error) {
            handleClerkErrors(error, sendCodeForm, [
                {
                    code: 'form_identifier_not_found',
                    field: 'email',
                    message:
                        "Couldn't find account with given email. Please create an account first.",
                },
                {
                    code: 'form_conditional_param_value_disallowed',
                    field: 'email',
                    message: 'Account was created through Google. Please sign in using Google.',
                },
            ]);
        }
    });

    const handleResetPassword = resetPasswordForm.handleSubmit(async ({ code, password }) => {
        if (!isLoaded) return;
        try {
            const resetResult = await signIn.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            });
            if (resetResult.status === 'complete') {
                setActive({ session: resetResult.createdSessionId });
                setStep(3);
            }
        } catch (error) {
            handleClerkErrors(error, resetPasswordForm, [
                {
                    code: 'form_password_not_strong_enough',
                    field: 'password',
                    message:
                        'Given password is not strong enough. For account safety, please use a different password.',
                },
                {
                    code: 'form_password_not_strong_enough',
                    field: 'password',
                    message:
                        'Password has been found in an online data breach. For account safety, please use a different password.',
                },
                {
                    code: 'form_code_incorrect',
                    field: 'code',
                    message: 'Incorrect Code. Please enter the code from your email.',
                },
            ]);
        }
    });

    return (
        <section className="w-full max-w-lg">
            <FancyRectangle colour="purple" offset="8" filled={true} fullWidth={true}>
                <div className="z-0 w-full border-4 border-black bg-white p-8 text-black md:p-12">
                    <h3 className="text-3xl font-bold">Forgot Your Password?</h3>
                    <p className="mb-8 text-xl">{STEP_INSTRUCTIONS[step]}</p>
                    {step === 1 && (
                        <form onSubmit={handleSendCode}>
                            <ControlledField
                                label="Email"
                                control={sendCodeForm.control}
                                name="email"
                            />
                            <Button colour="orange" width="w-[19rem] md:w-[25rem]" type="submit">
                                Send Code
                            </Button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleResetPassword}>
                            <ControlledField
                                label="New password"
                                type="password"
                                control={resetPasswordForm.control}
                                name="password"
                            />
                            <ControlledField
                                label="Confirm password"
                                type="password"
                                control={resetPasswordForm.control}
                                name="confirmPassword"
                            />
                            <ControlledField
                                label="Reset code"
                                control={resetPasswordForm.control}
                                name="code"
                            />
                            <Button colour="orange" width="w-[19rem] md:w-[25rem]" type="submit">
                                Reset Password
                            </Button>
                        </form>
                    )}

                    {step === 3 && (
                        <Button href="/" colour="orange" width="w-[19rem] md:w-[25rem]">
                            Return to Home Page
                        </Button>
                    )}
                </div>
            </FancyRectangle>
        </section>
    );
}
