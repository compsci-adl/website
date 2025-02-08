import Email from '@/emails/contact';
import { env } from '@/env.mjs';
import { transporter } from '@/lib/email';
import { render } from '@react-email/components';
import React from 'react';

export const sendContactEmail = async (fullname: string, email: string, message: string) => {
    const emailHtml = await render(React.createElement(Email, { fullname, email, message }));

    const options = {
        from: `CS Club <${env.SMTP_EMAIL_ADDRESS}>`,
        to: env.CONTACT_EMAIL_ADDRESS,
        subject: 'Contact Us Form Submission',
        html: emailHtml,
    };

    await transporter.sendMail(options);

    return;
};
