import Button from '@/components/Button';
import FancyRectangle from '@/components/FancyRectangle';
import Field from '@/components/Field';
import validateFields from '@/util/validation';
import Image from 'next/image';
import React from 'react';
import { z } from 'zod';
import ProgressBar from './ProgressBar';

interface StepTwoProps {
    emailAddress: string;
    setEmailAddress: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    prevStep: () => void;
    nextStep: () => void;
}

// Define validation schemas
const emailSchema = z.string().email({ message: 'Please enter a valid email' });
const passwordSchema = z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/^(?=.*[a-zA-Z]).+$/, { message: 'Password must include a letter' })
    .regex(/^(?=.*[0-9]).+$/, { message: 'Password must include a number' });

export default function StepTwo({
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    prevStep,
    nextStep,
}: StepTwoProps) {
    const [emailError, setEmailError] = React.useState<string | null>(null);
    const [passwordError, setPasswordError] = React.useState<string | null>(null);

    const fields = [emailAddress, password];
    const schemas = [emailSchema, passwordSchema];
    const setErrors = [setEmailError, setPasswordError];

    const handleContinue = async () => {
        validateFields(fields, schemas, setErrors, nextStep);
    };

    return (
        <div>
            {/* Heading */}
            <h3 className="font-bold text-3xl">Login Details</h3>
            <p className="text-xl">Create an account</p>
            {/* Progress Bar */}
            <ProgressBar ducksFilled={2}></ProgressBar>
            {/* Form fields */}
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
                <Button onClick={prevStep} colour="orange" width="w-[12.5rem]">
                    Back
                </Button>
                <Button onClick={handleContinue} colour="orange" width="w-[12.5rem]">
                    Continue
                </Button>
            </div>
        </div>
    );
}
