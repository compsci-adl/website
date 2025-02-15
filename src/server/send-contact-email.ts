import Email from '@/emails/contact';
import { env } from '@/env.mjs';
import { transporter } from '@/lib/email';
import { render } from '@react-email/components';
import React from 'react';

function renderComments(htmlString: string): string {
    return htmlString
        .replace(/<div\s+data-comment-start="([^"]+)"\s*><\/div>/g, '<!--[if $1]><!-- -->')
        .replace(/<div\s+data-comment-end="([^"]+)"\s*><\/div>/g, '<!--<![$1]-->')
        .replace(/<div\s+data-comment-mso-start="([^"]+)"\s*><\/div>/g, '<!--[if $1]>')
        .replace(/<div\s+data-comment-mso-end="([^"]+)"\s*><\/div>/g, '<![$1]-->');
}

export const sendContactEmail = async (fullname: string, email: string, message: string) => {
    const emailHtml = await render(React.createElement(Email, { fullname, email, message }));

    const finalHtml = renderComments(emailHtml);

    const options = {
        from: `CS Club <${env.SMTP_EMAIL_ADDRESS}>`,
        to: env.CONTACT_EMAIL_ADDRESS,
        subject: 'Contact Us Form Submission',
        html: finalHtml,
    };

    await transporter.sendMail(options);

    return;
};
