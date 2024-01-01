import Button from '@/components/Button';
import FancyRectangle from '@/components/FancyRectangle';
import Image from 'next/image';
import React from 'react';

interface StepTwoProps {
    emailAddress: string;
    setEmailAddress: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    prevStep: () => void;
    nextStep: () => void;
}

export default function StepTwo({
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    prevStep,
    nextStep,
}: StepTwoProps) {
    return (
        <div>
            {/* Heading */}
            <h3 className="font-bold text-3xl">Login Details</h3>
            <p className="text-xl">Create an account</p>
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
                        src="/images/yellowDuck.svg"
                        alt="Yellow Duck"
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
                <label htmlFor="email" className="block">
                    Email
                </label>
                <input
                    onChange={(e) => setEmailAddress(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block">
                    Password
                </label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                />
            </div>
            {/* Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
                {' '}
                <Button onClick={prevStep} colour="orange">
                    Back
                </Button>
                <Button onClick={nextStep} colour="orange">
                    Continue
                </Button>
            </div>
        </div>
    );
}
