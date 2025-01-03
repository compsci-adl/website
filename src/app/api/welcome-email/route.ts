import Email from '@/emails/welcome';
import { env } from '@/env.mjs';
import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
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

export async function POST(req: Request) {
    try {
        const { recipientEmail, firstName } = await req.json();
        if (!recipientEmail) {
            return NextResponse.json({ error: 'Recipient email is required' }, { status: 400 });
        }
        if (!firstName) {
            return NextResponse.json({ error: 'First name is required' }, { status: 400 });
        }

        const emailHtml = await render(React.createElement(Email, { firstName }));

        const options = {
            from: 'noreply@csclub.org.au',
            to: recipientEmail,
            subject: 'Welcome to the CS Club!',
            html: emailHtml,
        };

        await transporter.sendMail(options);

        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email', details: error },
            { status: 500 }
        );
    }
}
