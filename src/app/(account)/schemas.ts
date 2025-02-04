import { z } from 'zod';

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
