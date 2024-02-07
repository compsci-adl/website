'use client';

import FancyRectangle from '@/components/FancyRectangle';
import Title from '@/components/Title';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect } from 'react';
import ProgressBar from './ProgressBar';
import StepFour from './steps/StepFour';
import StepOne from './steps/StepOne';
import StepThree from './steps/StepThree';
import StepTwo from './steps/StepTwo';
import { useJoinUsHeading, useJoinUsStep } from './store';

export default function JoinUsPage() {
    const { step, setStep } = useJoinUsStep();
    const { heading } = useJoinUsHeading();

    const { isSignedIn } = useUser();
    useEffect(() => {
        if (isSignedIn) {
            setStep(2);
        }
    }, [isSignedIn]);

    return (
        <main className="mx-4 flex flex-col items-center gap-8 px-4 md:mx-10 md:gap-16">
            <Title colour="purple">Join Us</Title>
            <section>
                <div className="relative z-10 flex flex-col text-2xl font-black md:flex-row lg:text-3xl">
                    <h3>New Members are</h3>
                    <div className="mt-2 w-fit bg-purple px-2 md:ml-2 md:mt-0">
                        <h3 className=" text-grey">Always Welcome</h3>
                    </div>
                </div>
                <div className="mt-8 border-2 border-white px-4 py-4">
                    <p>
                        <span className="text-yellow">Membership costs $10</span> for the full year.
                        You can pay for membership online here at our website. Alternatively, you
                        can pay at a club event or contact one of the{' '}
                        <Link href="/about" className="underline">
                            committee members
                        </Link>
                        .
                    </p>
                    <p className="mt-4">
                        Create an <span className="text-orange">account below</span> to start the
                        registration process.
                    </p>
                </div>
            </section>
            <section>
                <FancyRectangle colour="purple" offset="8" filled={true}>
                    <div className="z-0 w-full border-4 border-black bg-white px-12 py-12 text-black">
                        <h3 className="text-3xl font-bold">{heading.title}</h3>
                        <p className="text-xl">{heading.description}</p>

                        <SignedOut>
                            <StepOne />
                        </SignedOut>
                        <SignedIn>
                            <ProgressBar step={step} />
                            {
                                // eslint-disable-next-line react/jsx-key
                                [<StepTwo />, <StepThree />, <StepFour />][step - 2]
                            }
                        </SignedIn>
                    </div>
                </FancyRectangle>
            </section>
        </main>
    );
}
