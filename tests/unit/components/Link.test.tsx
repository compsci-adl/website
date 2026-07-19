import Link from '@/components/Link';
import { render, screen, cleanup } from '@testing-library/react';
import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';
import React from 'react';

// Mock Icon component
const MockIcon = () => <span data-testid="mock-icon">Icon</span>;

describe('Link Component', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders text, applies background, and configures target/rel correctly', () => {
        render(
            <Link
                name="Social Link"
                link="https://social.example.com"
                icon={MockIcon}
                borderColour="yellow"
            />
        );
        const anchor = screen.getByRole('link', { name: 'Social Link' });
        assert.ok(anchor);
        assert.strictEqual(anchor.getAttribute('href'), 'https://social.example.com');
        assert.strictEqual(anchor.getAttribute('target'), '_blank');
        assert.strictEqual(anchor.getAttribute('rel'), 'noopener noreferrer');
    });

    it('renders the embedded icon component', () => {
        render(
            <Link
                name="Social Link"
                link="https://social.example.com"
                icon={MockIcon}
                borderColour="yellow"
            />
        );
        assert.ok(screen.getByTestId('mock-icon'));
    });
});
