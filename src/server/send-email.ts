'use server';

import type React from 'react';
import { Resend } from 'resend';
import z from 'zod';

const emailSchema = z.object({
    from: z.string().refine(
        (value) => {
            const pattern = /^[\w\s]+ <\w+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}>$/;
            return pattern.test(value);
        },
        {
            message: "Must be in the format 'Name <email>'",
        }
    ),
    to: z.string(),
    subject: z.string(),
    body: z.custom<React.JSX.Element>(),
});

export const sendEmail = async (email: z.infer<typeof emailSchema>) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
        from: email.from,
        to: email.to,
        subject: email.subject,
        react: email.body,
    });

    if (error) {
        return error;
    }

    return data;
};
