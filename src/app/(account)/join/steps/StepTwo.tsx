import Button from '@/components/Button';
import ControlledField from '@/components/ControlledField';
import { STUDENT_STATUSES } from '@/constants/student-info';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { firstNameSchema, lastNameSchema } from '../../schemas';
import { useJoinUsStep, useJoinUsStudentInfo, useSetJoinUsHeading } from '../store';

export const stepTwoSchema = z.object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    phoneNumber: z
        .string()
        .regex(/^0\d{9}$/, {
            message: 'Please enter a valid Australian phone number',
        })
        .optional()
        .or(z.literal('')),
    studentStatus: z.enum(STUDENT_STATUSES, {
        errorMap: () => ({ message: 'Please select a valid status' }),
    }),
    studentId: z
        .string()
        .regex(/^a\d{7}$/, {
            message: 'Please enter a valid student ID (format: aXXXXXXX)',
        })
        .or(z.literal('')),
});
export type StepTwoData = z.infer<typeof stepTwoSchema>;

const validationSchema = stepTwoSchema.refine(
    (data) => (data.studentStatus === 'At Adelaide University' ? data.studentId !== '' : true),
    { message: 'Please enter a student ID', path: ['studentId'] }
);

export default function StepTwo() {
    useSetJoinUsHeading({
        title: 'Continue Signing Up',
        description: "Let's get to know you!",
    });

    const { stepTwoData, setStepTwoData } = useJoinUsStudentInfo();

    const form = useForm<StepTwoData>({
        defaultValues: stepTwoData,
        resolver: zodResolver(validationSchema),
    });

    const { data: session } = useSession();

    useEffect(() => {
        if (!session) return;
        if (session.user) {
            form.setValue('firstName', String(session.user.firstName));
            form.setValue('lastName', String(session.user.lastName));
        }
    }, [session?.user]);

    const { nextStep } = useJoinUsStep();
    const handleContinue = form.handleSubmit((formData) => {
        setStepTwoData(formData);
        nextStep();
    });

    return (
        <form onSubmit={handleContinue}>
            <ControlledField label="First Name" control={form.control} name="firstName" />
            <ControlledField label="Last Name" control={form.control} name="lastName" />
            <ControlledField
                label="Phone Number (optional)"
                control={form.control}
                name="phoneNumber"
                longLabel="Providing your phone number allows you to receive SMS updates about internships, graduate opportunities, and club notifications."
            />
            <ControlledField
                label="Are you a university student?"
                control={form.control}
                name="studentStatus"
                options={STUDENT_STATUSES}
                type="select"
            />
            {form.watch('studentStatus') === 'At Adelaide University' && (
                <ControlledField label="Student ID" control={form.control} name="studentId" />
            )}
            <Button colour="orange" width="w-full" size="small" type="submit">
                Continue
            </Button>
        </form>
    );
}
