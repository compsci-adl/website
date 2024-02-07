import { useMount } from '@/hooks/use-mount';
import { create } from 'zustand';
import type { StepThreeData } from './steps/StepThree';
import type { StepTwoData } from './steps/StepTwo';

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
const initialStepThreeData: Record<keyof StepThreeData, string> = {
    ageBracket: '',
    gender: '',
    degree: '',
    studentType: '',
};
const initialStepTwoData: Record<keyof StepTwoData, string> = {
    firstName: '',
    lastName: '',
    studentStatus: 'At The University of Adelaide',
    studentId: '',
};
type JoinUsStudentInfoState = {
    stepTwoData: StepTwoData;
    stepThreeData: StepThreeData;
    setStepTwoData: (data: StepTwoData) => void;
    setStepThreeData: (data: StepThreeData) => void;
    getStudentInfo: () => StepTwoData & StepThreeData;
};
const useJoinUsStudentInfoInner = create<JoinUsStudentInfoState>((set, get) => ({
    stepTwoData: initialStepTwoData as StepTwoData,
    stepThreeData: initialStepThreeData as StepThreeData,
    setStepTwoData: (data) => set({ stepTwoData: data }),
    setStepThreeData: (data) => set({ stepThreeData: data }),
    getStudentInfo: () => ({ ...get().stepTwoData, ...get().stepThreeData }),
}));
export const useJoinUsStudentInfo = () => {
    const { getStudentInfo, ...inner } = useJoinUsStudentInfoInner();
    return { ...inner, studentInfo: getStudentInfo() };
};
