import { useMount } from '@/hooks/use-mount';
import { z } from 'zod';
import { create } from 'zustand';
import { stepThreeSchema } from './steps/StepThree';
import { stepTwoSchema } from './steps/StepTwo';

// Step
type JoinUsStepState = {
    step: number;
    nextStep: () => void;
    prevStep: () => void;
    setStep: (step: number) => void;
};
export const useJoinUsStep = create<JoinUsStepState>((set) => ({
    step: 1,
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: state.step - 1 })),
    setStep: (step) => set({ step }),
}));

// Heading
type Heading = { title: string; description: string };
type JoinUsHeading = {
    heading: Heading;
    setHeading: (heading: Heading) => void;
};
export const useJoinUsHeading = create<JoinUsHeading>((set) => ({
    heading: { title: 'Join Us', description: 'Create your account' },
    setHeading: (heading) => set({ heading }),
}));
export const useSetJoinUsHeading = (heading: Heading) => {
    const { setHeading } = useJoinUsHeading();
    useMount(() => {
        setHeading(heading);
    });
};

// Student Info
const studentInfoSchema = stepTwoSchema.merge(stepThreeSchema);
type StudentInfo = z.infer<typeof studentInfoSchema>;
const initialStudentInfo: Record<keyof StudentInfo, string> = {
    firstName: '',
    lastName: '',
    studentStatus: 'At The University of Adelaide',
    studentId: '',
    ageBracket: '',
    gender: '',
    degree: '',
    studentType: '',
};
type JoinUsStudentInfoState = {
    studentInfo: StudentInfo;
    setStudentInfo: (data: Partial<StudentInfo>) => void;
};
export const useJoinUsStudentInfo = create<JoinUsStudentInfoState>((set) => ({
    studentInfo: initialStudentInfo as StudentInfo,
    setStudentInfo: (data) => set((state) => ({ studentInfo: { ...state.studentInfo, ...data } })),
}));
