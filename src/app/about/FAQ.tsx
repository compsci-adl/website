'use client';

import FancyRectangle from '@/components/FancyRectangle';
import type { Colour } from '@/constants/colours';
import { useState } from 'react';
import { IoTriangleSharp } from 'react-icons/io5';

interface FAQProps {
    question: string;
    answer: JSX.Element;
    colour: Colour;
}

const FAQ = ({ question, answer, colour }: FAQProps) => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    return (
        <FancyRectangle colour="white" filled rounded offset={'8'} fullWidth>
            <div className="flex w-full flex-col">
                <div
                    className={`flex h-full w-full flex-col justify-center rounded-xl border-2 bg-${colour} border-white p-4`}
                    onClick={toggleAnswer}
                >
                    <div className="flex flex-row">
                        <div className="mr-4">
                            <IoTriangleSharp
                                className={`mt-1 transform text-white duration-300 ease-in-out ${showAnswer ? 'rotate-180' : 'rotate-90'}`}
                                size={20}
                            />
                        </div>
                        <div className="text-2xl font-bold text-grey">{question}</div>
                    </div>
                </div>
                {showAnswer && <div className="mx-8 my-4 text-grey">{answer}</div>}
            </div>
        </FancyRectangle>
    );
};

export default FAQ;
