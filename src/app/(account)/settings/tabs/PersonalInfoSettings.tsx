import Button from '@/components/Button';
import ControlledField from '@/components/ControlledField';
import { AGE_BRACKETS, GENDERS, STUDENT_STATUSES, STUDENT_TYPES } from '@/constants/student-info';
import { useMount } from '@/hooks/use-mount';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const personalInfoSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    ageBracket: z.enum(AGE_BRACKETS),
    gender: z.enum(GENDERS),
    studentType: z.enum(STUDENT_TYPES),
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
    const [formData, setFormData] = useState({
        firstName: session.data?.user.firstName || '',
        lastName: session.data?.user.lastName || '',
        ageBracket: '',
        gender: '',
        studentType: '',
        studentStatus: '',
        studentId: '',
    });

    useMount(() => {
        const fetchPersonalInfo = async () => {
            try {
                const response = await fetch('/api/get-user-info');
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data[0]);
                } else {
                    console.error('Failed to fetch personal info:', response.status);
                }
            } catch (error) {
                console.error('Error fetching personal info:', error);
            }
        };

        fetchPersonalInfo();
    });

    const { register, handleSubmit, control } = useForm({
        defaultValues: formData,
        resolver: zodResolver(personalInfoSchema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

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
                label="Student Type"
                name="studentType"
                control={control}
                type="select"
                options={STUDENT_TYPES}
            />
            <ControlledField
                label="Student Status"
                name="studentStatus"
                control={control}
                type="select"
                options={STUDENT_STATUSES}
            />
            <ControlledField label="Student ID" name="studentId" control={control} type="text" />
            <Button type="submit" colour="orange">
                Update personal info
            </Button>
        </form>
    );
}
