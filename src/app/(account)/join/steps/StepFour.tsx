import Button from '@/components/Button';
import Field from '@/components/Field';
import { fetcher } from '@/lib/fetcher';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
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

    const router = useRouter();
    const createMember = useSWRMutation('member', fetcher.post.mutate, {
        onError: () => {
            setAgreementError('Server error.');
        },
        onSuccess: () => {
            router.push('/settings');
        },
    });

    const handleSignUp = async () => {
        setAgreementError(null);
        if (!agreement) {
            setAgreementError('Please agree to the terms');
            return;
        }
        createMember.trigger(studentInfo);
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
                <Button onClick={handleSignUp} colour="purple" loading={createMember.isMutating}>
                    Sign up
                </Button>
            </div>
        </div>
    );
}
