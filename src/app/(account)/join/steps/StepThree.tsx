import Button from '@/components/Button';
import ControlledField from '@/components/ControlledField';
import type { STUDENT_STATUSES } from '@/constants/student-info';
import { AGE_BRACKETS, DEGREES, GENDERS, STUDENT_TYPES } from '@/constants/student-info';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useJoinUsStep, useJoinUsStudentInfo, useSetJoinUsHeading } from '../store';

export const stepThreeSchema = z.object({
    ageBracket: z.enum(AGE_BRACKETS, {
        errorMap: () => ({ message: 'Please select an age bracket' }),
    }),
    gender: z.enum(GENDERS, { errorMap: () => ({ message: 'Please select a gender' }) }),
    degree: z
        .enum(DEGREES, { errorMap: () => ({ message: 'Please select a degree' }) })
        .or(z.literal('')),
    studentType: z
        .enum(STUDENT_TYPES, {
            errorMap: () => ({ message: 'Please select a student type' }),
        })
        .or(z.literal('')),
});
export type StepThreeData = z.infer<typeof stepThreeSchema>;

/** Get schema with student check */
const getValidationSchema = (studentStatus: (typeof STUDENT_STATUSES)[number]) => {
    const isStudent =
        studentStatus === 'At Adelaide University' || studentStatus === 'At another university';
    return stepThreeSchema
        .refine((data) => (isStudent ? data.degree !== '' : true), {
            message: 'Please select a degree',
            path: ['degree'],
        })
        .refine((data) => (isStudent ? data.studentType !== '' : true), {
            message: 'Please select a student type',
            path: ['studentType'],
        });
};

export default function StepThree() {
    useSetJoinUsHeading({
        title: 'Background',
        description: 'Tell us about your background',
    });

    const {
        stepTwoData: { studentStatus },
        stepThreeData,
        setStepThreeData,
    } = useJoinUsStudentInfo();
    const { prevStep, nextStep } = useJoinUsStep();

    const validationSchema = getValidationSchema(studentStatus);
    const form = useForm<StepThreeData>({
        defaultValues: stepThreeData,
        resolver: zodResolver(validationSchema),
    });

    const handleContinue = form.handleSubmit((formData) => {
        setStepThreeData(formData);
        nextStep();
    });

    return (
        <form onSubmit={handleContinue}>
            <ControlledField
                label="What age bracket do you fall into?"
                control={form.control}
                name="ageBracket"
                type="select"
                placeholder="Select Age Bracket"
                options={AGE_BRACKETS}
            />
            <ControlledField
                label="How do you identify?"
                control={form.control}
                name="gender"
                type="select"
                placeholder="Select Gender"
                options={GENDERS}
            />
            {(studentStatus === 'At Adelaide University' ||
                studentStatus === 'At another university') && (
                <>
                    <ControlledField
                        label="What degree are you studying?"
                        control={form.control}
                        name="degree"
                        type="select"
                        placeholder="Select Degree"
                        options={DEGREES}
                    />
                    <ControlledField
                        label="Are you a domestic or international student?"
                        control={form.control}
                        name="studentType"
                        type="select"
                        placeholder="Select Student Type"
                        options={STUDENT_TYPES}
                    />
                </>
            )}
            <div className="grid grid-cols-2 gap-4">
                <Button onClick={prevStep} colour="orange" width="w-full" size="small">
                    Back
                </Button>
                <Button type="submit" colour="orange" width="w-full" size="small">
                    Continue
                </Button>
            </div>
        </form>
    );
}
