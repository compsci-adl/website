import Button from '@/components/Button';
import FancyRectangle from '@/components/FancyRectangle';
import Image from 'next/image';
import StepFour from './StepFour';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

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
    handleSubmit: (e: React.ChangeEvent<any>) => Promise<void>;
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
    handleSubmit,
    onPressVerify,
    nextStep,
    prevStep,
}: FormProps) {
    return (
        <section>
            <FancyRectangle colour="purple" offset="8" filled={true}>
                <div className="bg-white border-black border-4 text-black w-fit px-10 py-8 z-0">
                    {!pendingVerification && (
                        <div>
                            {step === 1 && (
                                <StepOne
                                    firstName={firstName}
                                    setFirstName={setFirstName}
                                    lastName={lastName}
                                    setLastName={setLastName}
                                    studentID={studentID}
                                    setStudentID={setStudentID}
                                    nextStep={nextStep}
                                ></StepOne>
                            )}
                            {step === 2 && (
                                <StepTwo
                                    emailAddress={emailAddress}
                                    setEmailAddress={setEmailAddress}
                                    password={password}
                                    setPassword={setPassword}
                                    prevStep={prevStep}
                                    nextStep={nextStep}
                                ></StepTwo>
                            )}
                            {step === 3 && (
                                <StepThree
                                    degree={degree}
                                    setDegree={setDegree}
                                    ageBracket={ageBracket}
                                    setAgeBracket={setAgeBracket}
                                    gender={gender}
                                    setGender={setGender}
                                    studentType={studentType}
                                    setStudentType={setStudentType}
                                    prevStep={prevStep}
                                    nextStep={nextStep}
                                ></StepThree>
                            )}
                            {step === 4 && (
                                <StepFour
                                    agreement={agreement}
                                    setAgreement={setAgreement}
                                    handleSubmit={handleSubmit}
                                    prevStep={prevStep}
                                ></StepFour>
                            )}
                        </div>
                    )}
                    {pendingVerification && (
                        <div className="mt-4">
                            <form>
                                <input
                                    value={code}
                                    placeholder="Code..."
                                    onChange={(e) => setCode(e.target.value)}
                                    className="border border-gray-300 px-3 py-2 w-full mt-1"
                                />
                                <button
                                    onClick={onPressVerify}
                                    className="bg-purple font-bold py-2 px-4 mt-2 transition-all"
                                >
                                    Verify Email
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </FancyRectangle>
        </section>
    );
}
