import Button from '@/components/Button';
import ControlledField from '@/components/ControlledField';
import { AGE_BRACKETS, GENDERS, STUDENT_STATUSES, STUDENT_TYPES } from '@/constants/student-info';
import { fetcher } from '@/lib/fetcher';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const personalInfoSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    ageBracket: z.enum(AGE_BRACKETS),
    gender: z.enum(GENDERS),
    studentType: z.enum([...STUDENT_TYPES, ''] as [string, ...string[]]),
    studentStatus: z.enum(STUDENT_STATUSES),
    studentId: z
        .string()
        .regex(/^a\d{7}$/, {
            message: 'Please enter a valid student ID (format: aXXXXXXX)',
        })
        .or(z.literal('')),
});

export default function PersonalInfoSettings() {
    const session = useSession();
    type PersonalInfo = {
        firstName: string;
        lastName: string;
        ageBracket: string;
        gender: string;
        studentType: string | '';
        studentStatus: string;
        studentId: string;
    };

    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { handleSubmit, control, reset, watch, setValue } = useForm({
        defaultValues: {
            firstName: session.data?.user.firstName || '',
            lastName: session.data?.user.lastName || '',
            ageBracket: AGE_BRACKETS[0],
            gender: GENDERS[0],
            studentType: '',
            studentStatus: STUDENT_STATUSES[0],
            studentId: '',
        },
        resolver: zodResolver(personalInfoSchema),
    });

    useEffect(() => {
        const fetchPersonalInfo = async () => {
            setLoading(true);
            try {
                const data = await fetcher.get.query(['member/personal-info']);
                if (data && data[0]) {
                    const user = data[0];
                    reset({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        ageBracket: user.ageBracket,
                        gender: user.gender,
                        studentType: user.studentType,
                        studentStatus: user.studentStatus,
                        studentId: user.studentId,
                    });
                }
            } catch (error) {
                console.error('Error fetching personal info:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPersonalInfo();
    }, [reset]);

    // Hide student fields if not a student
    const studentStatus = watch('studentStatus');
    useEffect(() => {
        if (studentStatus !== 'At Adelaide University') {
            setValue('studentType', '');
            setValue('studentId', '');
        }
    }, [studentStatus, setValue]);

    const onSubmit = async (data: PersonalInfo) => {
        setStatus(null);
        // If not at UofA, set studentType and studentId to empty string before submit
        const submitData = { ...data };
        if (studentStatus !== 'At Adelaide University') {
            submitData.studentType = '';
            submitData.studentId = '';
        }
        try {
            await fetcher.post.mutate('member/personal-info', { arg: submitData });
            setStatus('Personal info updated successfully.');
        } catch {
            setStatus('Failed to update personal info.');
        }
        setTimeout(() => setStatus(null), 5000);
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Change Personal Info</h2>
                <div className="mb-2 border-b-2 border-black" />
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        <div className="relative mb-1 h-4 w-1/4 overflow-hidden bg-gray-200">
                            <span className="shimmer absolute inset-0" />
                        </div>
                        <div className="relative h-10 w-full overflow-hidden bg-gray-100">
                            <span className="shimmer absolute inset-0" />
                        </div>
                    </div>
                ))}
                <div className="relative mt-2 h-12 w-full overflow-hidden bg-orange">
                    <span className="shimmer absolute inset-0" />
                </div>
                <style jsx>{`
                    .shimmer {
                        background: linear-gradient(
                            90deg,
                            rgba(255, 255, 255, 0) 0%,
                            rgba(255, 255, 255, 0.3) 50%,
                            rgba(255, 255, 255, 0) 100%
                        );
                        animation: shimmer-move 1.2s infinite linear;
                    }
                    @keyframes shimmer-move {
                        0% {
                            transform: translateX(-100%);
                        }
                        100% {
                            transform: translateX(100%);
                        }
                    }
                `}</style>
            </div>
        );
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Change Personal Info</h2>
            <div className="mb-2 border-b-2 border-black" />
            <ControlledField label="First Name" name="firstName" control={control} type="text" />
            <ControlledField label="Last Name" name="lastName" control={control} type="text" />
            <ControlledField
                label="Age"
                name="ageBracket"
                control={control}
                type="select"
                options={AGE_BRACKETS}
            />
            <ControlledField
                label="Gender"
                name="gender"
                control={control}
                type="select"
                options={GENDERS}
            />
            <ControlledField
                label="Student Status"
                name="studentStatus"
                control={control}
                type="select"
                options={STUDENT_STATUSES}
            />
            {studentStatus === 'At Adelaide University' && (
                <>
                    <ControlledField
                        label="Student Type"
                        name="studentType"
                        control={control}
                        type="select"
                        options={STUDENT_TYPES}
                    />
                    <ControlledField
                        label="Student ID"
                        name="studentId"
                        control={control}
                        type="text"
                    />
                </>
            )}
            <Button width="w-full" type="submit" colour="orange">
                Update personal info
            </Button>
            {status && (
                <span
                    className={
                        status.includes('success')
                            ? 'text-sm text-green-600'
                            : 'text-sm text-red-600'
                    }
                >
                    {status}
                </span>
            )}
        </form>
    );
}
