import Button from '@/components/Button';
import Field from '@/components/Field';
import validateFields from '@/util/validation';
import React, { useState } from 'react';
import { z } from 'zod';
import ProgressBar from './ProgressBar';

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

// Define validation schemas
const degreeSchema = z.string().min(1, { message: 'Please select a degree' });
const ageBracketSchema = z.string().min(1, { message: 'Please select an age bracket' });
const genderSchema = z.string().min(1, { message: 'Please select a gender' });
const studentTypeSchema = z.string().min(1, { message: 'Please select a student type' });

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
    const [degreeError, setDegreeError] = useState<string | null>(null);
    const [ageBracketError, setAgeBracketError] = useState<string | null>(null);
    const [genderError, setGenderError] = useState<string | null>(null);
    const [studentTypeError, setStudentTypeError] = useState<string | null>(null);

    const fields = [degree, ageBracket, gender, studentType];
    const schemas = [degreeSchema, ageBracketSchema, genderSchema, studentTypeSchema];
    const setErrors = [setDegreeError, setAgeBracketError, setGenderError, setStudentTypeError];

    const handleContinue = async () => {
        validateFields(fields, schemas, setErrors, nextStep);
    };

    return (
        <div>
            {/* Heading */}
            <h3 className="font-bold text-3xl">Background</h3>
            <p className="text-xl">Tell us about your background</p>
            {/* Progress Bar */}
            <ProgressBar ducksFilled={3}></ProgressBar>
            {/* Form fields */}
            <Field
                label="What degree are you studying?"
                value={degree}
                onChange={(value) => setDegree(value)}
                error={degreeError}
                type="select"
                options={[
                    'Select Degree',
                    'Bachelor of Computer Science (or Advanced)',
                    'Bachelor of Maths & Computer Science',
                    'Bachelor of IT',
                    'Bachelor of Software Engineering',
                    'Honours, Computer Science',
                    'Masters (Coursework), Computer Science',
                    'Masters/PhD (Research), Computer Science',
                    'Other',
                ]}
            />
            <Field
                label="What age bracket do you fall into?"
                value={ageBracket}
                onChange={(value) => setAgeBracket(value)}
                error={ageBracketError}
                type="select"
                options={[
                    'Select Age Bracket',
                    'Under 20',
                    '20-24',
                    '25-29',
                    '30-34',
                    'Over 34',
                    'Prefer not to say',
                ]}
            />
            <Field
                label="How do you identify?"
                value={gender}
                onChange={(value) => setGender(value)}
                error={genderError}
                type="select"
                options={['Select Gender', 'Male', 'Female', 'Other', 'Prefer not to say']}
            />
            <Field
                label="Are you a domestic or international student?"
                value={studentType}
                onChange={(value) => setStudentType(value)}
                error={studentTypeError}
                type="select"
                options={['Select Student Type', 'Domestic', 'International']}
            />
            {/* Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
                <Button onClick={prevStep} colour="orange">
                    Back
                </Button>
                <Button onClick={handleContinue} colour="orange">
                    Continue
                </Button>
            </div>
        </div>
    );
}
