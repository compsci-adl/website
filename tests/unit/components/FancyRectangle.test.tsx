import FancyRectangle from '@/components/FancyRectangle';
import { render, screen, cleanup } from '@testing-library/react';
import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';
import React from 'react';

describe('FancyRectangle Component', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders children correctly', () => {
        render(
            <FancyRectangle colour="yellow" offset="4">
                <span>Inside Rectangle</span>
            </FancyRectangle>
        );
        assert.ok(screen.getByText('Inside Rectangle'));
    });

    it('supports fullWidth and fullHeight props', () => {
        const { container } = render(
            <FancyRectangle colour="orange" offset="6" fullWidth fullHeight>
                <span>Full size</span>
            </FancyRectangle>
        );
        // The first child div should contain fullWidth/fullHeight classes
        const innerDiv = container.querySelector('.h-full.w-full');
        assert.ok(innerDiv);
    });

    it('supports rounded prop', () => {
        const { container } = render(
            <FancyRectangle colour="purple" offset="8" rounded>
                <span>Rounded</span>
            </FancyRectangle>
        );
        const backgroundDiv = container.querySelector('.rounded-xl');
        assert.ok(backgroundDiv);
    });

    it('correctly forwards refs to the root element', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <FancyRectangle ref={ref} colour="black" offset="4">
                <span>Ref container</span>
            </FancyRectangle>
        );
        assert.ok(ref.current);
        assert.strictEqual(ref.current.tagName.toLowerCase(), 'div');
    });
});
