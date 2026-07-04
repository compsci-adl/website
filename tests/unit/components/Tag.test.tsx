import Tag from '@/components/Tag';
import { render, screen, cleanup } from '@testing-library/react';
import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';
import React from 'react';

describe('Tag Component', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders tag name and applies style props correctly', () => {
        render(<Tag name="Testing" backgroundColor="#000000" />);
        const element = screen.getByText('Testing');
        assert.ok(element);

        const parentDiv = element.closest('div');
        assert.ok(parentDiv);
        // The background color should match black, and text color should contrast to white
        assert.strictEqual(parentDiv.style.backgroundColor, 'rgb(0, 0, 0)');
        assert.strictEqual(parentDiv.style.color, 'rgb(255, 255, 255)');
    });

    it('determines contrast color as black for light backgrounds', () => {
        render(<Tag name="LightTag" backgroundColor="#ffffff" />);
        const element = screen.getByText('LightTag');
        const parentDiv = element.closest('div');
        assert.ok(parentDiv);
        assert.strictEqual(parentDiv.style.backgroundColor, 'rgb(255, 255, 255)');
        assert.strictEqual(parentDiv.style.color, 'rgb(0, 0, 0)');
    });
});
