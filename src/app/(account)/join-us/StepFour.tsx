import Button from '@/components/Button';
import FancyRectangle from '@/components/FancyRectangle';
import Image from 'next/image';
import React from 'react';

interface StepFourProps {
    agreement: boolean;
    setAgreement: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: (e: React.ChangeEvent<any>) => Promise<void>;
    prevStep: () => void;
}

export default function StepFour({
    agreement,
    setAgreement,
    handleSubmit,
    prevStep,
}: StepFourProps) {
    return (
        <div>
            {/* Heading */}
            <h3 className="font-bold text-3xl">Background</h3>
            <p className="text-xl">Tell us about your background</p>
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
                        src="/images/yellowDuck.svg"
                        alt="Yellow Duck"
                        className="h-10 md:h-12 scale-x-[-1]"
                        height={100}
                        width={100}
                    />
                    <div className="absolute mt-20 text-black font-bold">3</div>
                </div>

                <div className="flex items-center justify-center">
                    <Image
                        src="/images/yellowDuck.svg"
                        alt="Yellow Duck"
                        className="h-10 md:h-12 scale-x-[-1]"
                        height={100}
                        width={100}
                    />
                    <div className="absolute mt-20 text-black font-bold">4</div>
                </div>
            </div>
            {/* Form fields */}
            <div className="mt-8 mb-4">
                <label htmlFor="agreement" className="block">
                    By submitting this form, you agree to abide by the University Code of Conduct
                    and Computer Science Club Code of Conduct. You acknowledge that failure to
                    adhere to these rules may result in my membership being suspended or revoked
                    following formal procedures outlined in the Code of Conduct. You acknowledge
                    that services and events offered by the Club may change at any time upon our
                    discretion without notice.
                </label>
                <input
                    type="checkbox"
                    id="agreement"
                    name="agreement"
                    checked={agreement}
                    onChange={(e) => setAgreement(e.target.checked)}
                    className="ml-2"
                />
                <label htmlFor="agreement" className="ml-2">
                    Yes
                </label>
            </div>
            {/* Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
                {' '}
                <Button onClick={prevStep} colour="orange">
                    Back
                </Button>
                <Button onClick={handleSubmit} type="submit" colour="purple">
                    Sign up
                </Button>
            </div>
        </div>
    );
}
