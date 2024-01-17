import Button from '@/components/Button';
import ControlledField from '@/components/ControlledField';
import { useSignUp } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';
import { handleClerkErrors } from '../../helpers';
import {
    codeSchema,
    emailSchema,
    firstNameSchema,
    lastNameSchema,
    passwordSchema,
} from '../../schema';
import { useSetJoinUsHeading } from '../store';

const verifyEmailSchema = z.object({ code: codeSchema });
function VerifyEmail() {
    useSetJoinUsHeading({
        title: 'Verify your email',
        description: 'Please enter the verification code that was sent to your email',
    });

    const form = useForm<z.infer<typeof verifyEmailSchema>>({
        defaultValues: { code: '' },
        resolver: zodResolver(verifyEmailSchema),
    });

    const { isLoaded, signUp, setActive } = useSignUp();

    const handleVerify = form.handleSubmit(async ({ code }) => {
        if (!isLoaded) return;
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });
            if (completeSignUp.status !== 'complete') {
                // investigate the response, to see if there was an error or if the user needs to complete more steps.
                console.log(JSON.stringify(completeSignUp, null, 2));
                return;
            }
            await setActive({ session: completeSignUp.createdSessionId });
        } catch (error: any) {
            handleClerkErrors(error, form, [
                { code: 'form_param_nil', field: 'code', message: 'Please enter the the code.' },
                {
                    code: 'form_code_incorrect',
                    field: 'code',
                    message: 'Incorrect Code. Please enter the code from your email.',
                },
            ]);
        }
    });

    return (
        <div className="mt-4">
            <form onSubmit={handleVerify}>
                <ControlledField label="Code" control={form.control} name="code" />
                <Button colour="orange" width="w-[19rem] md:w-[25.5rem]" type="submit">
                    Verify Email
                </Button>
            </form>
        </div>
    );
}

const stepOneSchema = z.object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    emailAddress: emailSchema,
    password: passwordSchema,
});

export default function StepOne() {
    useSetJoinUsHeading({
        title: 'Join Us',
        description: 'Create your account',
    });

    const form = useForm<z.infer<typeof stepOneSchema>>({
        defaultValues: { firstName: '', lastName: '', emailAddress: '', password: '' },
        resolver: zodResolver(stepOneSchema),
    });

    const { signUp, isLoaded } = useSignUp();
    const [pendingVerification, setPendingVerification] = useState(false);

    const handleSignUp = form.handleSubmit(async (formData) => {
        if (!isLoaded) return;
        try {
            await signUp.create(formData);
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            // change the UI to our pending section.
            setPendingVerification(true);
        } catch (error) {
            handleClerkErrors(error, form, [
                {
                    code: 'form_password_not_strong_enough',
                    field: 'password',
                    message:
                        'Given password is not strong enough. For account safety, please use a different password.',
                },
                {
                    code: 'form_password_pwned',
                    field: 'password',
                    message:
                        'Password has been found in an online data breach. For account safety, please use a different password.',
                },
            ]);
        }
    });

    const handleGoogleSignUp = async () => {
        if (!isLoaded) return;
        try {
            await signUp.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/join-us',
            });
        } catch (error) {
            // Handle any errors that might occur during the sign-up process
            console.error('Google Sign-Up Error:', error);
        }
    };

    if (pendingVerification) return <VerifyEmail />;

    return (
        <div>
            <Button onClick={handleGoogleSignUp} colour="white" width="w-[19rem] md:w-[25.5rem]">
                <FcGoogle className="text-xl inline-block mr-2" /> Continue with Google
            </Button>

            <div className="flex items-center justify-center mt-10 my-6">
                <div className="border-t border-grey w-full"></div>
                <p className="mx-4 text-grey">or</p>
                <div className="border-t border-grey w-full"></div>
            </div>

            <form onSubmit={handleSignUp}>
                <ControlledField label="First Name" control={form.control} name="firstName" />
                <ControlledField label="Last Name" control={form.control} name="lastName" />
                <ControlledField label="Email" control={form.control} name="emailAddress" />
                <ControlledField
                    label="Password"
                    type="password"
                    control={form.control}
                    name="password"
                />
                <div className="flex justify-center space-x-4 mt-8">
                    <Button colour="orange" width="w-[19rem] md:w-[25.5rem]" type="submit">
                        Continue
                    </Button>
                </div>
            </form>

            {/* Sign-in option */}
            <div className="flex mt-10">
                <p className="text-grey text-lg md:text-base">
                    Already have an account?{' '}
                    <a href="/sign-in" className="text-orange">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
