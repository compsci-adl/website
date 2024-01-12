import Button from '@/components/Button';
import Field from '@/components/Field';
import validateFields from '@/util/validation';
import { useSignUp } from '@clerk/nextjs';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';

interface StepOneProps {
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    emailAddress: string;
    setEmailAddress: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setPendingVerification: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define validation schemas
const firstNameSchema = z
    .string()
    .min(1, { message: 'Please enter a first name' })
    .regex(/^[a-zA-Z]+$/, {
        message: 'Please enter a valid first name',
    });
const lastNameSchema = z
    .string()
    .min(1, { message: 'Please enter a last name' })
    .regex(/^[a-zA-Z]+$/, {
        message: 'Please enter a valid last name',
    });
const emailSchema = z.string().email({ message: 'Please enter a valid email' });
const passwordSchema = z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/^(?=.*[a-zA-Z]).+$/, { message: 'Password must include a letter' })
    .regex(/^(?=.*[0-9]).+$/, { message: 'Password must include a number' });

export default function StepTwo({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    setPendingVerification,
}: StepOneProps) {
    const [firstNameError, setFirstNameError] = React.useState<string | null>(null);
    const [lastNameError, setLastNameError] = React.useState<string | null>(null);
    const [emailError, setEmailError] = React.useState<string | null>(null);
    const [passwordError, setPasswordError] = React.useState<string | null>(null);

    const fields = [firstName, lastName, emailAddress, password];
    const schemas = [firstNameSchema, lastNameSchema, emailSchema, passwordSchema];
    const setErrors = [setFirstNameError, setLastNameError, setEmailError, setPasswordError];

    const { signUp } = useSignUp();

    const handleSignUp = async (e: React.ChangeEvent<any>) => {
        const isValid = validateFields(fields, schemas, setErrors);
        if (isValid) {
            await handleSubmit(e);
        }
    };

    const handleSubmit = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        try {
            if (signUp) {
                await signUp.create({
                    emailAddress,
                    password,
                    firstName,
                    lastName,
                });
            }

            // send the email.
            if (signUp) {
                await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            }

            // change the UI to our pending section.
            setPendingVerification(true);
        } catch (err: any) {
            // console.error(JSON.stringify(err, null, 2));
            console.log(err);

            if (err.errors[0].code === 'form_password_not_strong_enough') {
                // Handle weak password error
                console.log('not strong enough');
                setPasswordError(
                    'Given password is not strong enough. For account safety, please use a different password.'
                );
            } else if (err.errors[0].code === 'form_password_pwned') {
                // Handle breached password error
                console.log('pwned password');
                setPasswordError(
                    'Password has been found in an online data breach. For account safety, please use a different password.'
                );
            } else {
                console.error(err);
            }
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            if (signUp) {
                await signUp.authenticateWithRedirect({
                    strategy: 'oauth_google',
                    redirectUrl: '/sso-callback',
                    redirectUrlComplete: '/join-us',
                });
            }
        } catch (error) {
            // Handle any errors that might occur during the sign-up process
            console.error('Google Sign-Up Error:', error);
        }
    };

    return (
        <div>
            {/* Heading */}
            <h3 className="font-bold text-3xl">Join Us</h3>
            <p className="text-xl mb-8">Create your account</p>

            <Button onClick={handleGoogleSignUp} colour="white" width="w-[19rem] md:w-[25.5rem]">
                <FcGoogle className="text-xl inline-block mr-2" /> Continue with Google
            </Button>

            <div className="flex items-center justify-center mt-10 my-6">
                <div className="border-t border-grey w-full"></div>
                <p className="mx-4 text-grey">or</p>
                <div className="border-t border-grey w-full"></div>
            </div>

            {/* Form fields */}
            <Field
                label="First Name"
                value={firstName}
                onChange={(value) => setFirstName(value)}
                error={firstNameError}
            />
            <Field
                label="Last Name"
                value={lastName}
                onChange={(value) => setLastName(value)}
                error={lastNameError}
            />
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
            {/* Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
                <Button onClick={handleSignUp} colour="orange" width="w-[19rem] md:w-[25.5rem]">
                    Continue
                </Button>
            </div>

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
