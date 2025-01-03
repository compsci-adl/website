import { auth } from '@/auth';
import Email from '@/emails/welcome';
import { env } from '@/env.mjs';
import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import React from 'react';
import { z } from 'zod';

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
    },
});

export async function POST(request: Request) {
    try {
        const req = await request.json();
        const schema = z.object({
            recipientEmail: z.string().min(1),
            firstName: z.string().min(1),
        });

        // Ensure user is logged in
        const session = await auth();
        if (!session?.user) {
            return new Response(null, { status: 401 });
        }

        const reqBody = schema.safeParse(req);
        if (!reqBody.success) {
            return new Response(JSON.stringify(reqBody.error.format()), { status: 400 });
        }

        const emailHtml = await render(
            React.createElement(Email, { firstName: reqBody.data.firstName })
        );

        const options = {
            from: 'noreply@csclub.org.au',
            to: reqBody.data.recipientEmail,
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
