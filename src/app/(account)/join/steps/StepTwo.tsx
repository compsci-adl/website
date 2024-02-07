import Button from '@/components/Button';
import ControlledField from '@/components/ControlledField';
import { STUDENT_STATUSES } from '@/constants/student-info';
import { useUser } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { firstNameSchema, lastNameSchema } from '../../schemas';
import { useJoinUsStep, useJoinUsStudentInfo, useSetJoinUsHeading } from '../store';

export const stepTwoSchema = z.object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
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
    (data) =>
        data.studentStatus === 'At The University of Adelaide' ? data.studentId !== '' : true,
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

    const { user } = useUser();
    // Fetch user's profile information on component mount
    useEffect(() => {
        // Check if user profile data exists
        if (user && user.primaryEmailAddress && user.fullName) {
            // Split the full name into first and last names
            const [firstName, lastName] = user.fullName.split(' ');
            // Set the first and last names in the state
            form.setValue('firstName', firstName);
            form.setValue('lastName', lastName);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

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
                label="Are you an university student?"
                control={form.control}
                name="studentStatus"
                options={STUDENT_STATUSES}
                type="select"
            />
            {form.watch('studentStatus') === 'At The University of Adelaide' && (
                <ControlledField label="Student ID" control={form.control} name="studentId" />
            )}
            <div className="mb-4 mt-8 flex w-full">
                <Button colour="orange" width="w-[19rem] md:w-[25.5rem]" type="submit">
                    Continue
                </Button>
            </div>
        </form>
    );
}
