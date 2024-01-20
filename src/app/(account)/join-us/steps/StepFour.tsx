import Button from '@/components/Button';
import Field from '@/components/Field';
import { useUser } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { useJoinUsStep, useJoinUsStudentInfo, useSetJoinUsHeading } from '../store';

export default function StepFour() {
    useSetJoinUsHeading({
        title: 'Payment',
        description: 'Complete membership payment',
    });

    const [agreement, setAgreement] = useState(false);
    const [agreementError, setAgreementError] = useState<string | null>(null);

    const { prevStep } = useJoinUsStep();
    const { studentInfo } = useJoinUsStudentInfo();

    const { user } = useUser();

    const handleSignUp = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        if (!agreement) {
            setAgreementError('Please agree to the terms');
            return;
        }
        // TODO: Payment & Database (use data below)
        console.log({
            studentInfo /* step 2 & 3 data */,
            user /* email, full name, id, etc. */,
        });
    };

    const toggleAgreement = () => setAgreement(!agreement);

    return (
        <div>
            <div className="mb-4 mt-8">
                <Field
                    label="By submitting this form, you agree to abide by the University Code of Conduct and Computer Science Club Code of Conduct. You acknowledge that failure to adhere to these rules may result in my membership being suspended or revoked following formal procedures outlined in the Code of Conduct. You acknowledge that services and events offered by the Club may change at any time upon our discretion without notice."
                    value={agreement ? 'Yes' : 'No'}
                    onChange={toggleAgreement}
                    error={agreementError}
                    type="checkbox"
                />
            </div>
            <div className="mt-8 flex justify-center space-x-4">
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
