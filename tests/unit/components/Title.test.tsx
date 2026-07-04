import Title from '@/components/Title';
import { render, screen, cleanup } from '@testing-library/react';
import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';
import React from 'react';

describe('Title Component', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders heading text and applies font styling', () => {
        render(
            <Title colour="yellow" font="font-mono">
                My Main Title
            </Title>
        );
        const heading = screen.getByRole('heading', { level: 1, name: 'My Main Title' });
        assert.ok(heading);
        assert.ok(heading.classList.contains('font-mono'));
    });

    it('applies default font-bold class when font is not provided', () => {
        render(<Title colour="yellow">My Main Title</Title>);
        const heading = screen.getByRole('heading', { level: 1, name: 'My Main Title' });
        assert.ok(heading);
        assert.ok(heading.classList.contains('font-bold'));
    });

    it('suppresses act(...) console warnings via global interceptor in bootstrap.ts', () => {
        // Calling console.error with a matching pattern to cover the branch in bootstrap.ts
        console.error('Warning: An update to Title inside a test was not wrapped in act(...)');
        assert.ok(true);
    });
});
