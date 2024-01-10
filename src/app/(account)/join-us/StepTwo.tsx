import Button from '@/components/Button';
import Field from '@/components/Field';
import validateFields from '@/util/validation';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import ProgressBar from './ProgressBar';

interface StepTwoProps {
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    studentStatus: string;
    setStudentStatus: React.Dispatch<React.SetStateAction<string>>;
    studentID: string;
    setStudentID: React.Dispatch<React.SetStateAction<string>>;
    nextStep: () => void;
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
const studentIdSchema = z
    .string()
    .min(1, { message: 'Please enter a student ID' })
    .regex(/^a\d{7}$/, {
        message: 'Please enter a valid student ID (format: aXXXXXXX)',
    });

export default function StepOne({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    studentStatus,
    setStudentStatus,
    studentID,
    setStudentID,
    nextStep,
}: StepTwoProps) {
    const [firstNameError, setFirstNameError] = useState<string | null>(null);
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const [studentIDError, setStudentIDError] = useState<string | null>(null);

    const { user } = useUser();

    const handleContinue = async () => {
        if (studentStatus == 'At The University of Adelaide') {
            const isValid = validateFields(
                [firstName, lastName, studentID],
                [firstNameSchema, lastNameSchema, studentIdSchema],
                [setFirstNameError, setLastNameError, setStudentIDError]
            );

            if (isValid) {
                await nextStep();
            }
        } else {
            const isValid = validateFields(
                [firstName, lastName],
                [firstNameSchema, lastNameSchema],
                [setFirstNameError, setLastNameError]
            );

            if (isValid) {
                await nextStep();
            }
        }
    };

    // Fetch user's profile information on component mount
    useEffect(() => {
        // Check if user profile data exists
        if (user && user.primaryEmailAddress && user.fullName) {
            // Split the full name into first and last names
            const [firstName, lastName] = user.fullName.split(' ');

            // Set the first and last names in the state
            setFirstName(firstName);
            setLastName(lastName);
        }
    }, [user, setFirstName, setLastName]);

    return (
        <div>
            {/* Heading */}
            <h3 className="font-bold text-3xl">Continue Signing Up</h3>
            <p className="text-xl">Let's get to know you!</p>
            {/* Progress Bar */}
            <ProgressBar ducksFilled={2}></ProgressBar>
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
                label="Are you an university student?"
                value={studentStatus}
                onChange={(value) => setStudentStatus(value)}
                options={['At The University of Adelaide', 'At another university', 'No']}
                type="select"
            />
            {studentStatus == 'At The University of Adelaide' && (
                <Field
                    label="Student ID"
                    value={studentID}
                    onChange={(value) => setStudentID(value)}
                    error={studentIDError}
                />
            )}
            {/* Button */}
            <div className="flex w-full mt-8 mb-4">
                <Button onClick={handleContinue} colour="orange" width="w-[25rem]">
                    Continue
                </Button>
            </div>
        </div>
    );
}
