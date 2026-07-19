import Paragraph from '@/components/Paragraph';
import { render, screen, cleanup } from '@testing-library/react';
import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';
import React from 'react';

describe('Paragraph Component', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders children elements and applies additional classNames', () => {
        const { container } = render(
            <Paragraph className="my-custom-class">
                <span>Paragraph text</span>
            </Paragraph>
        );
        assert.ok(screen.getByText('Paragraph text'));
        const paragraphDiv = container.querySelector('.my-custom-class');
        assert.ok(paragraphDiv);
    });

    it('renders correctly when className is omitted', () => {
        const { container } = render(
            <Paragraph>
                <span>Paragraph text without class</span>
            </Paragraph>
        );
        assert.ok(screen.getByText('Paragraph text without class'));
        const div = container.firstChild as HTMLDivElement;
        assert.ok(div.className.includes('rounded-xl bg-grey'));
    });
});
