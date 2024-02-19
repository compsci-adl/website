import Button from '@/components/Button';
import Field from '@/components/Field';
import { fetcher } from '@/lib/fetcher';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { useJoinUsStep, useJoinUsStudentInfo, useSetJoinUsHeading } from '../store';

export default function StepFour() {
    useSetJoinUsHeading({
        title: 'Confirm Terms',
        description:
            'You must read and agree to the terms and proceed to complete the membership payment.',
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
            router.refresh();
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
                {/* TODO: Add links to codes of conduct */}
                <Field
                    label="By submitting this form, you agree to abide by the University Code of Conduct and Computer Science Club Code of Conduct. You acknowledge that failure to adhere to these rules may result in your membership being suspended or revoked following formal procedures outlined in the Code of Conduct. You also acknowledge that services and events offered by the Club may change at any time upon our discretion without notice."
                    value={agreement ? 'Yes' : 'No'}
                    onChange={toggleAgreement}
                    error={agreementError}
                    type="checkbox"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Button onClick={prevStep} colour="orange" width="w-full" size="small">
                    Back
                </Button>
                <Button
                    onClick={handleSignUp}
                    colour="purple"
                    width="w-full"
                    size="small"
                    loading={createMember.isMutating}
                >
                    Sign up
                </Button>
            </div>
        </div>
    );
}
