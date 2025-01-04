import { db } from '@/db';
import { memberTable } from '@/db/schema';
import Email from '@/emails/welcome';
import { env } from '@/env.mjs';
import { render } from '@react-email/components';
import { eq } from 'drizzle-orm';
import nodemailer from 'nodemailer';
import React from 'react';

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
    },
});

export const sendWelcomeEmail = async (
    keycloakId: string,
    recipientEmail: string,
    firstName: string
) => {
    const member = await db
        .select()
        .from(memberTable)
        .where(eq(memberTable.keycloakId, keycloakId));
    if (member[0]?.welcomeEmailSent) {
        return;
    }

    const emailHtml = await render(React.createElement(Email, { firstName }));

    const options = {
        from: env.SMTP_EMAIL_ADDRESS,
        to: recipientEmail,
        subject: 'Welcome to the CS Club!',
        html: emailHtml,
    };

    await transporter.sendMail(options);

    try {
        await db
            .update(memberTable)
            .set({ welcomeEmailSent: 1 })
            .where(eq(memberTable.keycloakId, keycloakId));
    } catch (dbError) {
        console.error('Error updating member table:', dbError);
    }

    return;
};
