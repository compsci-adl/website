import { render, screen, cleanup } from '@testing-library/react';
import assert from 'node:assert/strict';
import { describe, it, afterEach, mock } from 'node:test';
import React from 'react';

mock.module('@react-email/components', {
    exports: {
        Html: ({ children }: any) => <div>{children}</div>,
        Head: ({ children }: any) => <div data-testid="head">{children}</div>,
        Body: ({ children, className }: any) => <div className={className}>{children}</div>,
        Container: ({ children, className }: any) => <div className={className}>{children}</div>,
        Tailwind: ({ children }: any) => <div>{children}</div>,
        Section: ({ children }: any) => <section>{children}</section>,
        Row: ({ children }: any) => <tr>{children}</tr>,
        Column: ({ children }: any) => <td>{children}</td>,
        Img: (props: any) => <img {...props} />,
    },
});

const { default: Welcome } = await import('@/emails/Welcome');

describe('Welcome Email Component', () => {
    afterEach(() => {
        cleanup();
    });

    it("renders the email template with the user's first name", () => {
        render(<Welcome firstName="Bob" />);

        // Check if the welcome message is rendered
        const welcomeText = screen.getAllByText('Welcome, Bob!');
        assert.ok(welcomeText.length > 0);

        // Check some other text to make sure the body is loaded
        const bodyText = screen.getAllByText(/We host events all year round/);
        assert.ok(bodyText.length > 0);

        // Check if the Outlook body is also rendered
        const outlookText = screen.getAllByText(/What is the Duck Lounge\?/);
        assert.ok(outlookText.length > 0);

        // Check if social links are rendered
        const githubLink = screen.getAllByLabelText('GitHub');
        assert.ok(githubLink.length > 0);
    });
});
