import Button from '@/components/Button';
import FancyRectangle from '@/components/FancyRectangle';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import StepFour from './StepFour';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
import VerifyEmail from './VerifyEmail';

interface FormProps {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    emailAddress: string;
    setEmailAddress: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    pendingVerification: boolean;
    setPendingVerification: React.Dispatch<React.SetStateAction<boolean>>;
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    studentStatus: string;
    setStudentStatus: React.Dispatch<React.SetStateAction<string>>;
    studentID: string;
    setStudentID: React.Dispatch<React.SetStateAction<string>>;
    degree: string;
    setDegree: React.Dispatch<React.SetStateAction<string>>;
    ageBracket: string;
    setAgeBracket: React.Dispatch<React.SetStateAction<string>>;
    gender: string;
    setGender: React.Dispatch<React.SetStateAction<string>>;
    studentType: string;
    setStudentType: React.Dispatch<React.SetStateAction<string>>;
    agreement: boolean;
    setAgreement: React.Dispatch<React.SetStateAction<boolean>>;
    onPressVerify: (e: React.ChangeEvent<any>) => Promise<void>;
    nextStep: () => void;
    prevStep: () => void;
}

export default function Form({
    step,
    setStep,
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    pendingVerification,
    setPendingVerification,
    code,
    setCode,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    studentStatus,
    setStudentStatus,
    studentID,
    setStudentID,
    degree,
    setDegree,
    ageBracket,
    setAgeBracket,
    gender,
    setGender,
    studentType,
    setStudentType,
    agreement,
    setAgreement,
    onPressVerify,
    nextStep,
    prevStep,
}: FormProps) {
    return (
        <section>
            <FancyRectangle colour="purple" offset="8" filled={true}>
                <div className="bg-white border-black border-4 text-black w-fit px-12 py-12 z-0">
                    <SignedOut>
                        {!pendingVerification && (
                            <div>
                                <StepOne
                                    firstName={firstName}
                                    setFirstName={setFirstName}
                                    lastName={lastName}
                                    setLastName={setLastName}
                                    emailAddress={emailAddress}
                                    setEmailAddress={setEmailAddress}
                                    password={password}
                                    setPassword={setPassword}
                                    setPendingVerification={setPendingVerification}
                                ></StepOne>
                            </div>
                        )}
                        {pendingVerification && (
                            <VerifyEmail
                                code={code}
                                setCode={setCode}
                                onPressVerify={onPressVerify}
                            />
                        )}
                    </SignedOut>
                    <SignedIn>
                        {step === 1 && (
                            <StepTwo
                                firstName={firstName}
                                setFirstName={setFirstName}
                                lastName={lastName}
                                setLastName={setLastName}
                                studentStatus={studentStatus}
                                setStudentStatus={setStudentStatus}
                                studentID={studentID}
                                setStudentID={setStudentID}
                                nextStep={nextStep}
                            ></StepTwo>
                        )}
                        {step === 2 && (
                            <StepThree
                                degree={degree}
                                setDegree={setDegree}
                                ageBracket={ageBracket}
                                setAgeBracket={setAgeBracket}
                                gender={gender}
                                setGender={setGender}
                                studentType={studentType}
                                studentStatus={studentStatus}
                                setStudentType={setStudentType}
                                prevStep={prevStep}
                                nextStep={nextStep}
                            ></StepThree>
                        )}
                        {step === 3 && (
                            <StepFour
                                agreement={agreement}
                                setAgreement={setAgreement}
                                prevStep={prevStep}
                            ></StepFour>
                        )}
                    </SignedIn>
                </div>
            </FancyRectangle>
        </section>
    );
}
