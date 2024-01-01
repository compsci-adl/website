import Button from '@/components/Button';
import Image from 'next/image';
import React from 'react';
import { z, ZodError } from 'zod';

interface StepOneProps {
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
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
    studentID,
    setStudentID,
    nextStep,
}: StepOneProps) {
    const [error, setError] = React.useState<string | null>(null);

    const handleContinue = async () => {
        setError(null);

        try {
            // Validate firstName, lastName, and studentID
            firstNameSchema.parse(firstName);
            lastNameSchema.parse(lastName);
            studentIdSchema.parse(studentID);

            // Proceed to the next step
            nextStep();
        } catch (error) {
            if (error instanceof ZodError) {
                // Get the first error message
                const firstErrorMessage = error.errors[0].message;
                setError(firstErrorMessage);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <div>
            {/* Heading */}
            <h3 className="font-bold text-3xl">Welcome</h3>
            <p className="text-xl">Let's get to know you!</p>
            {/* Progress Bar */}
            <div className="flex items-end justify-center mt-4">
                <div className="flex items-center justify-center">
                    <Image
                        src="/images/yellowDuck.svg"
                        alt="Yellow Duck"
                        className="h-10 md:h-12 scale-x-[-1]"
                        height={100}
                        width={100}
                    />
                    <div className="absolute mt-20 text-black font-bold">1</div>
                </div>

                <div className="flex items-center justify-center">
                    <Image
                        src="/images/greyDuckOutline.svg"
                        alt="Grey Duck Outline"
                        className="h-10 md:h-12 scale-x-[-1]"
                        height={100}
                        width={100}
                    />
                    <div className="absolute mt-20 text-black font-bold">2</div>
                </div>

                <div className="flex items-center justify-center">
                    <Image
                        src="/images/greyDuckOutline.svg"
                        alt="Grey Duck Outline"
                        className="h-10 md:h-12 scale-x-[-1]"
                        height={100}
                        width={100}
                    />
                    <div className="absolute mt-20 text-black font-bold">3</div>
                </div>

                <div className="flex items-center justify-center">
                    <Image
                        src="/images/greyDuckOutline.svg"
                        alt="Grey Duck Outline"
                        className="h-10 md:h-12 scale-x-[-1]"
                        height={100}
                        width={100}
                    />
                    <div className="absolute mt-20 text-black font-bold">4</div>
                </div>
            </div>
            {/* Form fields */}
            <div className="mt-8 mb-4">
                <label htmlFor="firstName" className="block">
                    First Name
                </label>
                <input
                    onChange={(e) => setFirstName(e.target.value)}
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    type="text"
                    className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="lastName" className="block">
                    Last Name
                </label>
                <input
                    onChange={(e) => setLastName(e.target.value)}
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    type="text"
                    className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                />
            </div>
            <div className="mb-4">
                {/* {' '}
                                                    <label htmlFor="isStudent" className="block">
                                                        Are you a student at the University of
                                                        Adelaide?
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        id="isStudent"
                                                        name="isStudent"
                                                        checked={isStudent}
                                                        onChange={(e) =>
                                                            setIsStudent(e.target.checked)
                                                        }
                                                        className="ml-2"
                                                    />
                                                    <label htmlFor="isStudent" className="ml-2">
                                                        Yes
                                                    </label> */}
                <label htmlFor="studentID" className="block">
                    Student ID (N/A if not at University of Adelaide)
                </label>
                <input
                    onChange={(e) => setStudentID(e.target.value)}
                    id="studentID"
                    name="studentID"
                    value={studentID}
                    type="text"
                    className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                />
                {/* Error visualisation */}
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                {/* Button */}
                <div className="flex justify-center space-x-4 mt-8">
                    {' '}
                    <div className="flex justify-center space-x-4 mt-8">
                        <Button onClick={handleContinue} colour="orange">
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
