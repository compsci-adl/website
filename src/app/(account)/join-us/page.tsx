'use client';

import FancyRectangle from '@/components/FancyRectangle';
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
                            <Link href="/about" className="underline">
                                committee members
                            </Link>
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
                        <div className="bg-white border-black border-4 text-black w-full px-12 py-12 z-0">
                            <h3 className="font-bold text-3xl">{heading.title}</h3>
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
                <div className="h-32"></div>
            </main>
        </div>
    );
}
