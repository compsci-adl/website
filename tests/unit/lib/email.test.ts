import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

let createTransportOptions: any = null;

mock.module('nodemailer', {
    exports: {
        createTransport: (options: any) => {
            createTransportOptions = options;
            return {
                sendMail: async () => {},
            };
        },
    },
});

// Mock environment variables
process.env.SMTP_HOST = 'smtp.test.com';
process.env.SMTP_USER = 'test-user';
process.env.SMTP_PASS = 'test-pass';

describe('Nodemailer Transporter Wrapper', () => {
    it('initializes the SMTP transporter with correct configurations', async () => {
        const { transporter } = await import('@/lib/email');
        assert.ok(transporter);
        assert.deepEqual(createTransportOptions, {
            host: 'smtp.test.com',
            port: 465,
            secure: true,
            auth: {
                user: 'test-user',
                pass: 'test-pass',
            },
        });
    });
});
