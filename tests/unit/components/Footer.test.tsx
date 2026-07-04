import Footer from '@/components/Footer';
import { render, screen, cleanup } from '@testing-library/react';
import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';
import React from 'react';

describe('Footer Component', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders the footer element', () => {
        const { container } = render(<Footer />);
        const footer = container.querySelector('footer');
        assert.ok(footer);
    });

    it('renders the copyright text containing the current year', () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear();
        const expectedText = `${currentYear} Adelaide University Computer Science Club`;
        assert.ok(screen.getByText(new RegExp(expectedText)));
    });

    it('renders social media link containers inside the footer', () => {
        const { container } = render(<Footer />);
        const links = container.querySelectorAll('a');
        assert.ok(links.length > 0);
    });
});
