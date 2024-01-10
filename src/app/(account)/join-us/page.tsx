'use client';

import FancyRectangle from '@/components/FancyRectangle';
import { useSignUp } from '@clerk/nextjs';
import { useState } from 'react';
import Form from './Form';

export default function Page() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [step, setStep] = useState(1);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [studentID, setStudentID] = useState('');
    // const [isStudent, setIsStudent] = useState(false);
    const [degree, setDegree] = useState('');
    const [ageBracket, setAgeBracket] = useState('');
    const [gender, setGender] = useState('');
    const [studentType, setStudentType] = useState('');
    const [studentStatus, setStudentStatus] = useState('At The University of Adelaide');
    const [agreement, setAgreement] = useState(false);

    // This verifies the user using email code that is delivered.
    const onPressVerify = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });
            if (completeSignUp.status !== 'complete') {
                /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
                console.log(JSON.stringify(completeSignUp, null, 2));
            }
            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            throw err;
        }
    };

    // Create functions to handle moving between steps
    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <div className="relative z-10 bg-grey h-fit w-responsive top-32 text-white">
            <main className="mx-4 md:mx-10 px-4 py-8 flex flex-col items-center">
                <section>
                    <FancyRectangle colour="purple" offset="8" filled={false}>
                        <div className="bg-purple w-fit px-8 py-2">
                            <h1 className="text-5xl md:text-7xl text-grey font-bold">Join Us</h1>
                        </div>
                    </FancyRectangle>
                    <div className="flex flex-col md:flex-row relative z-10 font-black text-2xl lg:text-3xl mt-16">
                        <h3>New Members are</h3>
                        <div className="bg-purple w-fit px-2 md:ml-2 mt-2 md:mt-0">
                            <h3 className=" text-grey">Always Welcome</h3>
                        </div>
                    </div>
                    <div className="border-white border-2 mt-8 px-4 py-4">
                        <p>
                            <span className="text-yellow">Membership costs $10</span> for the full
                            year. You can pay for membership online here at our website.
                            Alternatively, you can pay at a club event or contact one of the{' '}
                            <a href="/about" className="underline">
                                committee members
                            </a>
                            .
                        </p>
                        <p className="mt-4">
                            Create an <span className="text-orange">account below</span> to start
                            the registration process.
                        </p>
                    </div>
                </section>
                <div className="h-16"></div>
                <Form
                    step={step}
                    setStep={setStep}
                    emailAddress={emailAddress}
                    setEmailAddress={setEmailAddress}
                    password={password}
                    setPassword={setPassword}
                    pendingVerification={pendingVerification}
                    setPendingVerification={setPendingVerification}
                    code={code}
                    setCode={setCode}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    studentStatus={studentStatus}
                    setStudentStatus={setStudentStatus}
                    studentID={studentID}
                    setStudentID={setStudentID}
                    degree={degree}
                    setDegree={setDegree}
                    ageBracket={ageBracket}
                    setAgeBracket={setAgeBracket}
                    gender={gender}
                    setGender={setGender}
                    studentType={studentType}
                    setStudentType={setStudentType}
                    agreement={agreement}
                    setAgreement={setAgreement}
                    onPressVerify={onPressVerify}
                    nextStep={nextStep}
                    prevStep={prevStep}
                ></Form>
                <div className="h-32"></div>
            </main>
        </div>
    );
}
