import {
    AGE_BRACKETS,
    DEGREES,
    GENDERS,
    STUDENT_STATUSES,
    STUDENT_TYPES,
} from '@/constants/student-info';
import { z } from 'zod';

export const emailSchema = z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Please enter a valid email' });

export const passwordSchema = z
    .string()
    .min(1, { message: 'Please enter a password' })
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/^(?=.*[a-zA-Z]).+$/, { message: 'Password must include a letter' })
    .regex(/^(?=.*[0-9]).+$/, { message: 'Password must include a number' });

const nameRegex = /^[a-z ,.'-]+$/i;

export const firstNameSchema = z
    .string()
    .min(1, { message: 'Please enter your first name' })
    .regex(nameRegex, {
        message: 'Please enter a valid first name',
    });

export const lastNameSchema = z
    .string()
    .min(1, { message: 'Please enter your last name' })
    .regex(nameRegex, {
        message: 'Please enter a valid last name',
    });

export const codeSchema = z
    .string()
    .min(1, { message: 'Please enter the code' })
    .length(6, { message: 'Code must be 6 digits' })
    .regex(/^\d+$/, {
        message: 'Code must be numeric',
    });

export const stepTwoSchema = z.object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    studentStatus: z.enum(STUDENT_STATUSES, {
        errorMap: () => ({ message: 'Please select a valid status' }),
    }),
    studentId: z
        .string()
        .regex(/^a\d{7}$/, {
            message: 'Please enter a valid student ID (format: aXXXXXXX)',
        })
        .or(z.literal('')),
});

export const stepThreeSchema = z.object({
    ageBracket: z.enum(AGE_BRACKETS, {
        errorMap: () => ({ message: 'Please select an age bracket' }),
    }),
    gender: z.enum(GENDERS, { errorMap: () => ({ message: 'Please select a gender' }) }),
    degree: z
        .enum(DEGREES, { errorMap: () => ({ message: 'Please select a degree' }) })
        .or(z.literal('')),
    studentType: z
        .enum(STUDENT_TYPES, {
            errorMap: () => ({ message: 'Please select a student type' }),
        })
        .or(z.literal('')),
});

export const infoSchema = stepTwoSchema.merge(stepThreeSchema);
