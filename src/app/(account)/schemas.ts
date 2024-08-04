import { z } from "zod";

export const emailSchema = z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Please enter a valid email" });

export const passwordSchema = z
    .string()
    .min(1, { message: "Please enter a password" })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-zA-Z]).+$/, { message: "Password must include a letter" })
    .regex(/^(?=.*[0-9]).+$/, { message: "Password must include a number" });

const nameRegex = /^[a-z ,.'-]+$/i;

export const firstNameSchema = z
    .string()
    .min(1, { message: "Please enter your first name" })
    .regex(nameRegex, {
        message: "Please enter a valid first name",
    });

export const lastNameSchema = z
    .string()
    .min(1, { message: "Please enter your last name" })
    .regex(nameRegex, {
        message: "Please enter a valid last name",
    });

export const codeSchema = z
    .string()
    .min(1, { message: "Please enter the code" })
    .length(6, { message: "Code must be 6 digits" })
    .regex(/^\d+$/, {
        message: "Code must be numeric",
    });
