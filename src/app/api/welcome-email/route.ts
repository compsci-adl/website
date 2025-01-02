import Email from '@/emails/welcome';
import type { SendEmailCommandInput } from '@aws-sdk/client-ses';
import { SES } from '@aws-sdk/client-ses';
import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import React from 'react';

const ses = new SES({ region: process.env.AWS_SES_REGION });

export async function POST(req: Request) {
    try {
        const emailHtml = await render(React.createElement(Email));

        const { recipientEmail } = await req.json();
        if (!recipientEmail) {
            return NextResponse.json({ error: 'Recipient email is required' }, { status: 400 });
        }

        const params: SendEmailCommandInput = {
            Source: 'noreply@csclub.org.au',
            Destination: {
                ToAddresses: [recipientEmail],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: emailHtml,
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: 'Welcome to the CS Club!',
                },
            },
        };

        const result = await ses.sendEmail(params);

        return NextResponse.json({ message: 'Email sent successfully', result });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email', details: error },
            { status: 500 }
        );
    }
}
