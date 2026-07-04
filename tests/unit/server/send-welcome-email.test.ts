import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

let mockDbResults: any[] = [];
let lastUpdateValues: any = null;
let lastUpdateId: any = null;
let sentEmailOptions: any = null;
let renderCalledWith: any = null;

let shouldDbUpdateThrow = false;

// Mock Drizzle DB
mock.module('@/db', {
    exports: {
        db: {
            select: () => ({
                from: () => ({
                    where: async () => mockDbResults,
                }),
            }),
            update: () => ({
                set: (values: any) => {
                    lastUpdateValues = values;
                    return {
                        where: async (cond: any) => {
                            if (shouldDbUpdateThrow) {
                                throw new Error('Database update failed');
                            }
                            lastUpdateId = cond;
                        },
                    };
                },
            }),
        },
    },
});

mock.module('drizzle-orm', {
    exports: {
        eq: (col: any, val: any) => ({ col, val }),
        sql: (strings: any, ...values: any[]) => strings.join('?'),
    },
});

// Mock react-email rendering
mock.module('@react-email/components', {
    exports: {
        Img: () => null,
        Section: ({ children }: any) => children,
        Row: ({ children }: any) => children,
        Column: ({ children }: any) => children,
        Head: ({ children }: any) => children,
        Html: ({ children }: any) => children,
        Body: ({ children }: any) => children,
        Container: ({ children }: any) => children,
        Tailwind: ({ children }: any) => children,
        render: async (element: any) => {
            renderCalledWith = element;
            return '<div>Welcome! <div data-comment-start="!mso"></div></div>';
        },
    },
});

// Mock Email SMTP transporter
mock.module('@/lib/email', {
    exports: {
        transporter: {
            sendMail: async (options: any) => {
                sentEmailOptions = options;
            },
        },
    },
});

const { sendWelcomeEmail } = await import('@/server/send-welcome-email');

describe('sendWelcomeEmail server function', () => {
    it('does not send email if member already received one', async () => {
        mockDbResults = [{ welcomeEmailSent: true }];
        sentEmailOptions = null;

        await sendWelcomeEmail('keycloak-id', 'test@example.com', 'Alice');

        assert.strictEqual(sentEmailOptions, null);
    });

    it('renders and sends welcome email and updates database flag', async () => {
        mockDbResults = [{ welcomeEmailSent: false }];
        lastUpdateValues = null;
        lastUpdateId = null;
        sentEmailOptions = null;

        await sendWelcomeEmail('keycloak-id', 'test@example.com', 'Alice');

        assert.ok(sentEmailOptions);
        assert.strictEqual(sentEmailOptions.to, 'test@example.com');
        assert.ok(sentEmailOptions.html.includes('<!--[if !mso]><!-- -->'));
        assert.deepEqual(lastUpdateValues, { welcomeEmailSent: true });
        assert.strictEqual(lastUpdateId.val, 'keycloak-id');
    });

    it('handles database update errors gracefully', async () => {
        mockDbResults = [{ welcomeEmailSent: false }];
        shouldDbUpdateThrow = true;

        const originalConsoleError = console.error;
        let consoleErrorCalled = false;
        console.error = () => {
            consoleErrorCalled = true;
        };

        try {
            await sendWelcomeEmail('keycloak-id', 'test@example.com', 'Alice');
            assert.strictEqual(consoleErrorCalled, true);
        } finally {
            console.error = originalConsoleError;
            shouldDbUpdateThrow = false;
        }
    });
});
