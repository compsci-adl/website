import Button from '@/components/Button';
import React, { useState } from 'react';

interface VerifyEmailProps {
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
    onPressVerify: (e: React.ChangeEvent<any>) => Promise<void>;
}

function VerifyEmail({ code, setCode, onPressVerify }: VerifyEmailProps) {
    const [error, setError] = useState<string | null>(null);

    const handleVerify = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        if (!code) {
            setError('Enter code.');
            return;
        }

        try {
            setError(null);
            await onPressVerify(e);
        } catch (err: any) {
            if (err.status === 422 && err.clerkError) {
                const errorCode = err.errors[0].code;

                if (errorCode === 'form_param_nil') {
                    setError('Enter code.');
                } else if (errorCode === 'form_code_incorrect') {
                    setError('Incorrect code');
                } else {
                    setError('An unknown error occurred');
                }
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <div className="mt-4">
            {/* Heading */}
            <h3 className="font-bold text-3xl">Verify your email</h3>
            <p className="text-xl mb-8 w-[25rem]">
                Please enter the verification code that was sent to your email
            </p>
            <form>
                <input
                    value={code}
                    placeholder="Code..."
                    onChange={(e) => setCode(e.target.value)}
                    className="border border-gray-300 px-3 py-2 w-full mt-1 mb-8"
                />
                {error && <p className="text-red-500 mb-8 relative -translate-y-4">{error}</p>}
                <Button onClick={handleVerify} colour="orange" width="w-[25rem]">
                    Verify Email
                </Button>
            </form>
        </div>
    );
}

export default VerifyEmail;
