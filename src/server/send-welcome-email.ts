import { db } from '@/db';
import { memberTable } from '@/db/schema';
import Email from '@/emails/welcome';
import { env } from '@/env.mjs';
import { transporter } from '@/lib/email';
import { render } from '@react-email/components';
import { eq } from 'drizzle-orm';
import React from 'react';

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
        from: `CS Club <${env.SMTP_EMAIL_ADDRESS}>`,
        to: recipientEmail,
        subject: 'Welcome to the CS Club!',
        html: emailHtml,
    };

    await transporter.sendMail(options);

    try {
        await db
            .update(memberTable)
            .set({ welcomeEmailSent: true })
            .where(eq(memberTable.keycloakId, keycloakId));
    } catch (dbError) {
        console.error('Error updating member table:', dbError);
    }

    return;
};
