import Button from '@/components/Button';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';
import React from 'react';

describe('Button Component', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders button children successfully and supports className', () => {
        render(
            <Button colour="yellow" className="custom-btn-class">
                Click me
            </Button>
        );
        const element = screen.getByText('Click me');
        assert.ok(element);
        assert.strictEqual(element.tagName.toLowerCase(), 'button');
        assert.ok(element.classList.contains('custom-btn-class'));
    });

    it('renders as anchor when href is provided', () => {
        render(
            <Button colour="yellow" href="https://example.com">
                Go to link
            </Button>
        );
        const element = screen.getByText('Go to link');
        assert.ok(element);
        assert.strictEqual(element.tagName.toLowerCase(), 'a');
        assert.strictEqual(element.getAttribute('href'), 'https://example.com');
    });

    it('handles click events', () => {
        let clicked = false;
        render(
            <Button
                colour="yellow"
                onClick={() => {
                    clicked = true;
                }}
            >
                Click me
            </Button>
        );
        const element = screen.getByText('Click me');
        fireEvent.click(element);
        assert.strictEqual(clicked, true);
    });

    it('respects loading state by disabling the button', () => {
        render(
            <Button colour="yellow" loading>
                Submit
            </Button>
        );
        const element = screen.getByRole('button');
        assert.ok((element as HTMLButtonElement).disabled);
    });

    it('renders with small size padding and font class', () => {
        render(
            <Button colour="yellow" size="small">
                Small btn
            </Button>
        );
        const element = screen.getByRole('button');
        assert.ok(element.classList.contains('px-4'));
        assert.ok(element.classList.contains('text-sm'));
    });

    it('applies target="_blank" and rel attribute when targetBlank is true on anchors', () => {
        render(
            <Button colour="yellow" href="https://example.com" targetBlank>
                External link
            </Button>
        );
        const element = screen.getByText('External link');
        assert.strictEqual(element.getAttribute('target'), '_blank');
        assert.strictEqual(element.getAttribute('rel'), 'noopener noreferrer');
    });

    it('renders with custom type attribute when it is not an anchor', () => {
        render(
            <Button colour="yellow" type="submit">
                Submit form
            </Button>
        );
        const element = screen.getByRole('button');
        assert.strictEqual(element.getAttribute('type'), 'submit');
    });
});
