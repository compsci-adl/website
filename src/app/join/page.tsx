'use client';

import { useState } from 'react';

import Button from '@/components/Button';
import Card from '@/components/Card';

import { CheckboxInput, TextInput } from './SignupForm';
import Footer from './Footer';

export default function Join() {
    const [showUniSignUp, setShowUniSignUp] = useState(false);
    const [showOtherSignUp, setShowOtherSignUp] = useState(false);

    return (
        <main className="relative z-10 flex h-auto w-responsive flex-col items-center justify-center">
            <section className="flex w-full flex-col items-center justify-start gap-6 pt-[10em] max-md:pb-12 md:pt-[16em]">
                <h1 className="text-center text-5xl font-bold md:text-6xl lg:text-primary-heading">
                    JOIN THE CLUB
                </h1>
            </section>

            <section className="w-full pt-12 md:pt-16 lg:pt-20">
                <h2 className="text-left text-5xl font-bold md:text-6xl lg:text-secondary-heading">
                    About the club
                </h2>
                <p className="py-4">
                    The University of Adelaide Computer Science Club is a student-run club for those
                    with an interest in computer science or computing in general. Although
                    we&apos;re a university club, we welcome anyone interested in computer science
                    and/or socialising to join!
                </p>
            </section>

            {/* Member sign up form */}
            <section className="w-full pt-12 md:pt-16 lg:pt-20">
                <Card className="content-center px-5 py-10">
                    <h2 className="text-center text-5xl font-bold md:text-6xl lg:text-secondary-heading">
                        New Member Sign Up
                    </h2>
                    <h2 className="text-center text-5xl font-bold text-accent-blue md:text-6xl lg:text-secondary-heading">
                        2023
                    </h2>
                    {/* TODO: Handle form submission - this incl. changing button to submit type input*/}
                    <form className="center flex flex-col content-center gap-8 px-[10%] py-8">
                        <div className="grow-1 flex flex-row justify-between gap-8">
                            <TextInput
                                required={true}
                                labelTitle="First Name"
                                placeholder="First Name"
                            />
                            <TextInput
                                required={true}
                                labelTitle="Last name"
                                placeholder="Last Name"
                            />
                        </div>

                        {/* TODO: Ensure this is a required question */}
                        <p>Are you a student or staff of the University of Adelaide?</p>
                        <div className="grow-1 flex flex-row justify-start gap-8">
                            <Button
                                className="bg-accent-highlight px-5 py-2 text-xl font-bold lg:px-6 lg:py-3 lg:text-2xl"
                                onClick={() => {
                                    setShowUniSignUp(true);
                                    setShowOtherSignUp(false);
                                }}
                            >
                                Yes
                            </Button>
                            <Button
                                className="bg-accent-highlight px-5 py-2 text-xl font-bold lg:px-6 lg:py-3 lg:text-2xl"
                                onClick={() => {
                                    setShowUniSignUp(false);
                                    setShowOtherSignUp(true);
                                }}
                            >
                                No
                            </Button>
                        </div>

                        {/* UofA students and staff only */}
                        <div
                            id="uniSignUp"
                            className={`grow-1 flex flex-col justify-between gap-8 ${
                                showUniSignUp ? '' : 'hidden'
                            }`}
                        >
                            <hr />
                            <h3 className="text-left text-xl font-bold md:text-2xl">
                                For University of Adelaide students and staff
                            </h3>
                            <div className="grow-1 flex flex-row justify-between">
                                <TextInput
                                    labelTitle="Username / ID Number"
                                    placeholder="a1234567"
                                    pattern="a[0-9]{7}"
                                />
                            </div>
                            <div className="grow-1 flex flex-row justify-between">
                                <TextInput
                                    labelTitle="Degree"
                                    placeholder="Bachelor of ... / Master of ..."
                                />
                            </div>
                        </div>

                        {/* For other people (non-UofA people) */}
                        <div
                            id="otherSignUp"
                            className={`grow-1 flex flex-col justify-between gap-8 ${
                                showOtherSignUp ? '' : 'hidden'
                            }`}
                        >
                            <hr />
                            <h3 className="text-left text-xl font-bold md:text-2xl">For others</h3>
                        </div>

                        <div className="grow-1 flex flex-row justify-between">
                            <TextInput
                                required={true}
                                labelTitle="Email"
                                placeholder="Preferred Email"
                            />
                        </div>

                        <div className="flex flex-col justify-between gap-8">
                            <CheckboxInput
                                required={true}
                                labelTitle="I acknowledge that failure to provide payment at the time of submitting this form will result in my membership being dishonoured."
                            />
                            <CheckboxInput
                                required={true}
                                labelTitle="By submitting this form, you agree to abide by the University Code of Conduct and Computer Science Club Constitution. You acknowledge that failure to adhere to these rules may result in my membership being suspended or revoked following formal procedures outlined in the Constitution. You acknowledge that services and events offered by the Club may change at any time upon our discretion without notice."
                            />
                        </div>
                        <div className="grow-1 flex flex-row justify-center">
                            <Button
                                className="bg-accent-highlight px-7 py-3 text-2xl font-bold lg:px-9 lg:py-5 lg:text-3xl"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Card>
            </section>

            <Footer />
        </main>
    );
}