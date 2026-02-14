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
    phoneNumber: '',
    studentStatus: 'At Adelaide University',
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

// Notifications
export const categoryNames = {
    newsletters: 'Newsletters',
    clubEventsAndAnnouncements: 'Club Events and Announcements',
    sponsorNotifications: 'Sponsor Notifications',
};

export type CategoryTypes = keyof typeof categoryNames;

interface NotificationsState {
    email: Record<CategoryTypes, boolean>;
    sms: Record<CategoryTypes, boolean>;
}

type JoinUsNotificationsState = {
    notifications: NotificationsState;
    setNotificationsData: (notifications: NotificationsState) => void;
};

const initialNotificationsState: NotificationsState = {
    email: {
        newsletters: false,
        clubEventsAndAnnouncements: false,
        sponsorNotifications: false,
    },
    sms: {
        newsletters: false,
        clubEventsAndAnnouncements: false,
        sponsorNotifications: false,
    },
};

const useJoinUsNotificationsInner = create<JoinUsNotificationsState>((set) => ({
    notifications: initialNotificationsState,
    setNotificationsData: (notifications) => set({ notifications }),
}));

export const useJoinUsNotifications = () => {
    const { notifications, setNotificationsData } = useJoinUsNotificationsInner();
    return { notifications, setNotificationsData };
};
