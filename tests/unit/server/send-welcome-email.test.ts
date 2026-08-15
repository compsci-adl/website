import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

let mockDbResults: unknown[] = [];
let lastUpdateValues: unknown = null;
let lastUpdateId: { col?: unknown; val?: unknown } | null = null;
let sentEmailOptions: { to?: string; html?: string } | null = null;
let renderCalledWith: unknown = null;

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
                set: (values: unknown) => {
                    lastUpdateValues = values;
                    return {
                        where: async (cond: { col?: unknown; val?: unknown }) => {
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
        eq: (col: unknown, val: unknown) => ({ col, val }),
        sql: (strings: TemplateStringsArray, ...values: unknown[]) => strings.join('?'),
    },
});

// Mock react-email rendering
mock.module('@react-email/components', {
    exports: {
        Img: () => null,
        Section: ({ children }: { children?: React.ReactNode }) => children,
        Row: ({ children }: { children?: React.ReactNode }) => children,
        Column: ({ children }: { children?: React.ReactNode }) => children,
        Head: ({ children }: { children?: React.ReactNode }) => children,
        Html: ({ children }: { children?: React.ReactNode }) => children,
        Body: ({ children }: { children?: React.ReactNode }) => children,
        Container: ({ children }: { children?: React.ReactNode }) => children,
        Tailwind: ({ children }: { children?: React.ReactNode }) => children,
        render: async (element: unknown) => {
            renderCalledWith = element;
            return '<div>Welcome! <div data-comment-start="!mso"></div></div>';
        },
    },
});

// Mock Email SMTP transporter
mock.module('@/lib/email', {
    exports: {
        transporter: {
            sendMail: async (options: { to?: string; html?: string }) => {
                sentEmailOptions = options;
            },
        },
    },
});

const { sendWelcomeEmail } = await import('@/server/send-welcome-email');

describe('sendWelcomeEmail server function', () => {
    it('does not send email if member already received one', async () => {
        mockDbResults = [{ welcomeEmailSent: true }];
        shouldDbUpdateThrow = false;
        lastUpdateValues = null;
        lastUpdateId = null;
        sentEmailOptions = null;

        await sendWelcomeEmail('keycloak-id', 'test@example.com', 'Alice');

        assert.strictEqual(sentEmailOptions, null);
        assert.strictEqual(lastUpdateValues, null);
    });

    it('renders and sends welcome email and updates database flag', async () => {
        mockDbResults = [{ welcomeEmailSent: false }];
        shouldDbUpdateThrow = false;
        lastUpdateValues = null;
        lastUpdateId = null;
        sentEmailOptions = null;

        await sendWelcomeEmail('keycloak-id', 'test@example.com', 'Alice');

        const emailOpts = sentEmailOptions as { to?: string; html?: string } | null;
        const updateId = lastUpdateId as { col?: unknown; val?: unknown } | null;

        assert.ok(emailOpts);
        assert.strictEqual(emailOpts.to, 'test@example.com');
        assert.ok(emailOpts.html?.includes('<!--[if !mso]><!-- -->'));
        assert.deepEqual(lastUpdateValues, { welcomeEmailSent: true });
        assert.strictEqual(updateId?.val, 'keycloak-id');
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
