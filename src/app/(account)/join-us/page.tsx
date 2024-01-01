'use client';

import Button from '@/components/Button';
import FancyRectangle from '@/components/FancyRectangle';
import { useSignUp } from '@clerk/nextjs';
import Image from 'next/image';
import { useState } from 'react';

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
    const [agreement, setAgreement] = useState(false);

    const handleSubmit = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                emailAddress,
                password,
                firstName,
                lastName,
            });

            // send the email.
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

            // change the UI to our pending section.
            setPendingVerification(true);
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

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
                <section>
                    <FancyRectangle colour="purple" offset="8" filled={true}>
                        <div className="bg-white border-black border-4 text-black w-fit px-8 py-6 z-0">
                            <div>
                                {!pendingVerification && (
                                    <form className="mt-4">
                                        {step === 1 && (
                                            <div>
                                                <h3 className="font-bold text-3xl">Welcome</h3>
                                                <p className="text-xl">Let's get to know you!</p>
                                            </div>
                                        )}
                                        {step === 2 && (
                                            <div>
                                                <h3 className="font-bold text-3xl">
                                                    Login Details
                                                </h3>
                                                <p className="text-xl">Let's get to know you!</p>
                                            </div>
                                        )}
                                        {step === 3 && (
                                            <div>
                                                <h3 className="font-bold text-3xl">Background</h3>
                                                <p className="text-xl">
                                                    Tell us about your background
                                                </p>
                                            </div>
                                        )}

                                        {/* Render progress bar */}
                                        <div className="flex items-end justify-center mt-4">
                                            <div className="flex items-center justify-center">
                                                {step >= 1 ? (
                                                    <Image
                                                        src="/images/yellowDuck.svg"
                                                        alt="Yellow Duck"
                                                        className="h-10 md:h-12 scale-x-[-1]"
                                                        height={100}
                                                        width={100}
                                                    />
                                                ) : (
                                                    <Image
                                                        src="/images/greyDuckOutline.svg"
                                                        alt="Grey Duck Outline"
                                                        className="h-10 md:h-12 scale-x-[-1]"
                                                        height={100}
                                                        width={100}
                                                    />
                                                )}
                                                <div className="absolute mt-20 text-black font-bold">
                                                    1
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-center">
                                                {step >= 2 ? (
                                                    <Image
                                                        src="/images/yellowDuck.svg"
                                                        alt="Yellow Duck"
                                                        className="h-10 md:h-12 scale-x-[-1]"
                                                        height={100}
                                                        width={100}
                                                    />
                                                ) : (
                                                    <Image
                                                        src="/images/greyDuckOutline.svg"
                                                        alt="Grey Duck Outline"
                                                        className="h-10 md:h-12 scale-x-[-1]"
                                                        height={100}
                                                        width={100}
                                                    />
                                                )}
                                                <div className="absolute mt-20 text-black font-bold">
                                                    2
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-center">
                                                {step >= 3 ? (
                                                    <Image
                                                        src="/images/yellowDuck.svg"
                                                        alt="Yellow Duck"
                                                        className="h-10 md:h-12 scale-x-[-1]"
                                                        height={100}
                                                        width={100}
                                                    />
                                                ) : (
                                                    <Image
                                                        src="/images/greyDuckOutline.svg"
                                                        alt="Grey Duck Outline"
                                                        className="h-10 md:h-12 scale-x-[-1]"
                                                        height={100}
                                                        width={100}
                                                    />
                                                )}
                                                <div className="absolute mt-20 text-black font-bold">
                                                    3
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-center">
                                                {step >= 4 ? (
                                                    <Image
                                                        src="/images/yellowDuck.svg"
                                                        alt="Yellow Duck"
                                                        className="h-10 md:h-12 scale-x-[-1]"
                                                        height={100}
                                                        width={100}
                                                    />
                                                ) : (
                                                    <Image
                                                        src="/images/greyDuckOutline.svg"
                                                        alt="Grey Duck Outline"
                                                        className="h-10 md:h-12 scale-x-[-1]"
                                                        height={100}
                                                        width={100}
                                                    />
                                                )}
                                                <div className="absolute mt-20 text-black font-bold">
                                                    4
                                                </div>
                                            </div>
                                        </div>

                                        {/* Render different sections based on the step */}
                                        {step === 1 && (
                                            <div>
                                                <div className="mt-8 mb-4">
                                                    <label htmlFor="firstName" className="block">
                                                        First Name
                                                    </label>
                                                    <input
                                                        onChange={(e) =>
                                                            setFirstName(e.target.value)
                                                        }
                                                        id="firstName"
                                                        name="firstName"
                                                        type="text"
                                                        className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="lastName" className="block">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        onChange={(e) =>
                                                            setLastName(e.target.value)
                                                        }
                                                        id="lastName"
                                                        name="lastName"
                                                        type="text"
                                                        className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    {/* {' '}
                                                    <label htmlFor="isStudent" className="block">
                                                        Are you a student at the University of
                                                        Adelaide?
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        id="isStudent"
                                                        name="isStudent"
                                                        checked={isStudent}
                                                        onChange={(e) =>
                                                            setIsStudent(e.target.checked)
                                                        }
                                                        className="ml-2"
                                                    />
                                                    <label htmlFor="isStudent" className="ml-2">
                                                        Yes
                                                    </label> */}
                                                    <label htmlFor="studentID" className="block">
                                                        Student ID (N/A if not at University of
                                                        Adelaide)
                                                    </label>
                                                    <input
                                                        onChange={(e) =>
                                                            setStudentID(e.target.value)
                                                        }
                                                        id="studentID"
                                                        name="studentID"
                                                        type="text"
                                                        className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {step === 2 && (
                                            <div>
                                                <div className="mt-8 mb-4">
                                                    <label htmlFor="email" className="block">
                                                        Email
                                                    </label>
                                                    <input
                                                        onChange={(e) =>
                                                            setEmailAddress(e.target.value)
                                                        }
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="password" className="block">
                                                        Password
                                                    </label>
                                                    <input
                                                        onChange={(e) =>
                                                            setPassword(e.target.value)
                                                        }
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {step === 3 && (
                                            <div>
                                                <div className="mt-8 mb-4">
                                                    <label htmlFor="degree" className="block">
                                                        What degree are you studying?
                                                    </label>
                                                    <select
                                                        onChange={(e) => setDegree(e.target.value)}
                                                        id="degree"
                                                        name="degree"
                                                        className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                                                    >
                                                        <option value="">Select Degree</option>
                                                        <option value="Bachelor of Computer Science (or Advanced)">
                                                            Bachelor of Computer Science (or
                                                            Advanced)
                                                        </option>
                                                        <option value="Bachelor of Maths & Computer Science">
                                                            Bachelor of Maths & Computer Science
                                                        </option>
                                                        <option value="Bachelor of IT">
                                                            Bachelor of IT
                                                        </option>
                                                        <option value="Bachelor of Software Engineering">
                                                            Bachelor of Software Engineering
                                                        </option>
                                                        <option value="Honours, Computer Science">
                                                            Honours, Computer Science
                                                        </option>
                                                        <option value="Masters (Coursework), Computer Science">
                                                            Masters (Coursework), Computer Science
                                                        </option>
                                                        <option value="Masters/PhD (Research), Computer Science">
                                                            Masters/PhD (Research), Computer Science
                                                        </option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="ageBracket" className="block">
                                                        What age bracket do you fall into?
                                                    </label>
                                                    <select
                                                        onChange={(e) =>
                                                            setAgeBracket(e.target.value)
                                                        }
                                                        id="ageBracket"
                                                        name="ageBracket"
                                                        className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                                                    >
                                                        <option value="">Select Age Bracket</option>
                                                        <option value="Under 20">Under 20</option>
                                                        <option value="20-24">20-24</option>
                                                        <option value="25-29">25-29</option>
                                                        <option value="30-34">30-34</option>
                                                        <option value="Over 34">Over 34</option>
                                                        <option value="Prefer not to say">
                                                            Prefer not to say
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="gender" className="block">
                                                        How do you identify?
                                                    </label>
                                                    <select
                                                        onChange={(e) => setGender(e.target.value)}
                                                        id="gender"
                                                        name="gender"
                                                        className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                        <option value="Prefer not to say">
                                                            Prefer not to say
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="studentType" className="block">
                                                        Are you a domestic or international student?
                                                    </label>
                                                    <select
                                                        onChange={(e) =>
                                                            setStudentType(e.target.value)
                                                        }
                                                        id="studentType"
                                                        name="studentType"
                                                        className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                                                    >
                                                        <option value="">
                                                            Select Student Type
                                                        </option>
                                                        <option value="Domestic">Domestic</option>
                                                        <option value="International">
                                                            International
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                        {step === 4 && (
                                            <div className="mt-8 mb-4">
                                                <label htmlFor="agreement" className="block">
                                                    By submitting this form, you agree to abide by
                                                    the University Code of Conduct and Computer
                                                    Science Club Code of Conduct. You acknowledge
                                                    that failure to adhere to these rules may result
                                                    in my membership being suspended or revoked
                                                    following formal procedures outlined in the Code
                                                    of Conduct. You acknowledge that services and
                                                    events offered by the Club may change at any
                                                    time upon our discretion without notice.
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id="agreement"
                                                    name="agreement"
                                                    checked={agreement}
                                                    onChange={(e) => setAgreement(e.target.checked)}
                                                    className="ml-2"
                                                />
                                                <label htmlFor="agreement" className="ml-2">
                                                    Yes
                                                </label>
                                            </div>
                                        )}

                                        {/* Button container with centered buttons */}
                                        <div className="flex justify-center space-x-4">
                                            {/* Back button */}
                                            {step > 1 && (
                                                <Button
                                                    onClick={prevStep}
                                                    type="button"
                                                    colour="orange"
                                                >
                                                    Back
                                                </Button>
                                            )}

                                            {/* Continue button */}
                                            {step < 4 && (
                                                <Button
                                                    onClick={nextStep}
                                                    type="button"
                                                    colour="orange"
                                                >
                                                    Continue
                                                </Button>
                                            )}

                                            {/* Sign up button */}
                                            {step === 4 && (
                                                <Button
                                                    onClick={handleSubmit}
                                                    type="submit"
                                                    colour="purple"
                                                >
                                                    Sign up
                                                </Button>
                                            )}
                                        </div>
                                        <div className="mt-4 flex justify-center">
                                            <span>Have an account?&nbsp;</span>
                                            <a href="/sign-in" className="text-orange">
                                                Sign in
                                            </a>
                                        </div>
                                    </form>
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
                        </div>
                    </FancyRectangle>
                </section>

                <div className="h-32"></div>
            </main>
        </div>
    );
}
