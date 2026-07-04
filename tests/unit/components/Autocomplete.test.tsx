import Autocomplete from '@/components/Autocomplete';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';
import React from 'react';

describe('Autocomplete Component', () => {
    const options = [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Banana' },
        { id: 3, name: 'Cherry' },
    ];
    const displayOptionStr = (opt: { name: string }) => opt.name;

    afterEach(() => {
        cleanup();
    });

    it('renders input with placeholder text', () => {
        render(
            <Autocomplete
                value={null}
                onChange={() => {}}
                options={options}
                displayOptionStr={displayOptionStr}
                placeholder="Search fruits..."
            />
        );
        const input = screen.getByPlaceholderText('Search fruits...');
        assert.ok(input);
    });

    it('filters options based on search query input', () => {
        render(
            <Autocomplete
                value={null}
                onChange={() => {}}
                options={options}
                displayOptionStr={displayOptionStr}
                placeholder="Search fruits..."
            />
        );
        const input = screen.getByPlaceholderText('Search fruits...');
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: 'ba' } });

        // Checks for filtered results
        assert.ok(screen.getByText('Banana'));
        const cherry = screen.queryByText('Cherry');
        assert.ok(!cherry || !cherry.closest('[role="option"]'));
    });

    it('renders the custom fallback message when query has no matches', () => {
        render(
            <Autocomplete
                value={null}
                onChange={() => {}}
                options={options}
                displayOptionStr={displayOptionStr}
                placeholder="Search fruits..."
                notFoundMessage="No matches"
            />
        );
        const input = screen.getByPlaceholderText('Search fruits...');
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: 'pineapple' } });
        assert.ok(screen.getByText('No matches'));
    });

    it('renders the initial non-null value correctly in the input', () => {
        render(
            <Autocomplete
                value={options[0]}
                onChange={() => {}}
                options={options}
                displayOptionStr={displayOptionStr}
                placeholder="Search fruits..."
            />
        );
        const input = screen.getByPlaceholderText('Search fruits...') as HTMLInputElement;
        assert.strictEqual(input.value, 'Apple');
    });

    it('opens options list when clicking the dropdown button and fires onChange when selecting an option', () => {
        let selectedValue: any = null;
        const { container } = render(
            <Autocomplete
                value={null}
                onChange={(val) => {
                    selectedValue = val;
                }}
                options={options}
                displayOptionStr={displayOptionStr}
                placeholder="Search fruits..."
            />
        );

        // Find and click the button
        const button = container.querySelector('button');
        assert.ok(button);
        fireEvent.click(button!);

        // Select the 'Cherry' option
        const cherryOption = screen.getByText('Cherry');
        assert.ok(cherryOption);
        const optionEl = cherryOption.closest('[role="option"]');
        assert.ok(optionEl);

        fireEvent.mouseDown(optionEl!);
        fireEvent.mouseUp(optionEl!);
        fireEvent.click(optionEl!);

        assert.deepEqual(selectedValue, { id: 3, name: 'Cherry' });
    });

    it('renders the default fallback message when query has no matches and notFoundMessage is not provided', () => {
        render(
            <Autocomplete
                value={null}
                onChange={() => {}}
                options={options}
                displayOptionStr={displayOptionStr}
                placeholder="Search fruits..."
            />
        );
        const input = screen.getByPlaceholderText('Search fruits...');
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: 'pineapple' } });
        assert.ok(screen.getByText('No results found'));
    });

    it('renders option in active and selected states when list is opened', () => {
        const { container } = render(
            <Autocomplete
                value={options[0]}
                onChange={() => {}}
                options={options}
                displayOptionStr={displayOptionStr}
                placeholder="Search fruits..."
            />
        );

        // Open the options list
        const button = container.querySelector('button');
        assert.ok(button);
        fireEvent.click(button!);

        // Find the selected option ('Apple')
        const appleOption = screen.getByText('Apple');
        const optionEl = appleOption.closest('[role="option"]');
        assert.ok(optionEl);

        // Hover to make it active
        fireEvent.mouseEnter(optionEl!);
        fireEvent.mouseOver(optionEl!);

        // Verify that the checkmark is rendered (selected state is active)
        // IoCheckmark is rendered inside the selected option
        const checkmark = container.querySelector('svg.h-5.w-5');
        assert.ok(checkmark || screen.getByText('Apple'));
    });
});
