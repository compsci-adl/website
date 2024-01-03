import Button from '@/components/Button';
import Field from '@/components/Field';
import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

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
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleSignUp = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        if (!agreement) {
            setValidationError('Please agree to the terms');
        } else {
            setValidationError(null);
            await handleSubmit(e);
        }
    };

    const toggleAgreement = () => {
        setAgreement(!agreement);
        setValidationError(null);
    };

    return (
        <div>
            {/* Heading */}
            <h3 className="font-bold text-3xl">Background</h3>
            <p className="text-xl">Tell us about your background</p>
            {/* Progress Bar */}
            <ProgressBar ducksFilled={4}></ProgressBar>
            {/* Form field */}
            <div className="mt-8 mb-4">
                <Field
                    label="By submitting this form, you agree to abide by the University Code of Conduct and Computer Science Club Code of Conduct. You acknowledge that failure to adhere to these rules may result in my membership being suspended or revoked following formal procedures outlined in the Code of Conduct. You acknowledge that services and events offered by the Club may change at any time upon our discretion without notice."
                    value={agreement ? 'Yes' : 'No'}
                    onChange={() => toggleAgreement()}
                    error={validationError}
                    type="checkbox"
                />
            </div>
            {/* Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
                <Button onClick={prevStep} colour="orange">
                    Back
                </Button>
                <Button onClick={handleSignUp} colour="purple">
                    Sign up
                </Button>
            </div>
        </div>
    );
}
