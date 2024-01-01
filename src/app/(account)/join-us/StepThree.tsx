import Button from '@/components/Button';
import FancyRectangle from '@/components/FancyRectangle';
import Image from 'next/image';
import React from 'react';

interface StepThreeProps {
    degree: string;
    setDegree: React.Dispatch<React.SetStateAction<string>>;
    ageBracket: string;
    setAgeBracket: React.Dispatch<React.SetStateAction<string>>;
    gender: string;
    setGender: React.Dispatch<React.SetStateAction<string>>;
    studentType: string;
    setStudentType: React.Dispatch<React.SetStateAction<string>>;
    prevStep: () => void;
    nextStep: () => void;
}

export default function StepThree({
    degree,
    setDegree,
    ageBracket,
    setAgeBracket,
    gender,
    setGender,
    studentType,
    setStudentType,
    prevStep,
    nextStep,
}: StepThreeProps) {
    return (
        <div>
            {/* Heading */}
            <h3 className="font-bold text-3xl">Background</h3>
            <p className="text-xl">Tell us about your background</p>
            {/* Progress Bar */}
            <div className="flex items-end justify-center mt-4">
                <div className="flex items-center justify-center">
                    <Image
                        src="/images/yellowDuck.svg"
                        alt="Yellow Duck"
                        className="h-10 md:h-12 scale-x-[-1]"
                        height={100}
                        width={100}
                    />
                    <div className="absolute mt-20 text-black font-bold">1</div>
                </div>

                <div className="flex items-center justify-center">
                    <Image
                        src="/images/yellowDuck.svg"
                        alt="Yellow Duck"
                        className="h-10 md:h-12 scale-x-[-1]"
                        height={100}
                        width={100}
                    />
                    <div className="absolute mt-20 text-black font-bold">2</div>
                </div>

                <div className="flex items-center justify-center">
                    <Image
                        src="/images/yellowDuck.svg"
                        alt="Yellow Duck"
                        className="h-10 md:h-12 scale-x-[-1]"
                        height={100}
                        width={100}
                    />
                    <div className="absolute mt-20 text-black font-bold">3</div>
                </div>

                <div className="flex items-center justify-center">
                    <Image
                        src="/images/greyDuckOutline.svg"
                        alt="Grey Duck Outline"
                        className="h-10 md:h-12 scale-x-[-1]"
                        height={100}
                        width={100}
                    />
                    <div className="absolute mt-20 text-black font-bold">4</div>
                </div>
            </div>
            {/* Form fields */}
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
                        Bachelor of Computer Science (or Advanced)
                    </option>
                    <option value="Bachelor of Maths & Computer Science">
                        Bachelor of Maths & Computer Science
                    </option>
                    <option value="Bachelor of IT">Bachelor of IT</option>
                    <option value="Bachelor of Software Engineering">
                        Bachelor of Software Engineering
                    </option>
                    <option value="Honours, Computer Science">Honours, Computer Science</option>
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
                    onChange={(e) => setAgeBracket(e.target.value)}
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
                    <option value="Prefer not to say">Prefer not to say</option>
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
                    <option value="Prefer not to say">Prefer not to say</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="studentType" className="block">
                    Are you a domestic or international student?
                </label>
                <select
                    onChange={(e) => setStudentType(e.target.value)}
                    id="studentType"
                    name="studentType"
                    className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                >
                    <option value="">Select Student Type</option>
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                </select>
            </div>
            {/* Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
                {' '}
                <Button onClick={prevStep} colour="orange">
                    Back
                </Button>
                <Button onClick={nextStep} colour="orange">
                    Continue
                </Button>
            </div>
        </div>
    );
}
