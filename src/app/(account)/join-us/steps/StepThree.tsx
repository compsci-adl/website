import Button from '@/components/Button';
import ControlledField from '@/components/ControlledField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useJoinUsStep, useJoinUsStudentInfo, useSetJoinUsHeading } from '../store';
import type { STUDENT_STATUSES } from './StepTwo';

const DEGREES = [
    'Bachelor of Computer Science or Bachelor of Computer Science (Advanced)',
    'Bachelor of Maths & Computer Science',
    'Bachelor of IT',
    'Bachelor of Software Engineering',
    'Honours, Computer Science',
    'Masters (Coursework), Computer Science',
    'Masters/PhD (Research), Computer Science',
    'Other',
] as const;
const AGE_BRACKETS = [
    'Under 20',
    '20-24',
    '25-29',
    '30-34',
    'Over 34',
    'Prefer not to say',
] as const;
const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'] as const;
const STUDENT_TYPES = ['Domestic', 'International'] as const;

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
        studentStatus === 'At The University of Adelaide' ||
        studentStatus === 'At another university';
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
            {(studentStatus === 'At The University of Adelaide' ||
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
            <div className="mt-8 flex justify-center space-x-4">
                <Button onClick={prevStep} colour="orange">
                    Back
                </Button>
                <Button type="submit" colour="orange">
                    Continue
                </Button>
            </div>
        </form>
    );
}
