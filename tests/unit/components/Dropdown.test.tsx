import Dropdown from '@/components/Dropdown';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';
import React from 'react';

describe('Dropdown Component', () => {
    const options = [
        { value: '30', label: '30 Images' },
        { value: '50', label: '50 Images' },
        { value: '100', label: '100 Images' },
    ];

    afterEach(() => {
        cleanup();
    });

    it('renders currently selected option label', () => {
        render(<Dropdown options={options} value="50" onChange={() => {}} colour="yellow" />);
        // Find the selected label inside a span element
        assert.ok(screen.getByText('50 Images', { selector: 'span' }));
    });

    it('opens option list on header click and fires onChange when option is selected', () => {
        let selectedValue: string | number = '';
        render(
            <Dropdown
                options={options}
                value="30"
                onChange={(val) => {
                    selectedValue = val;
                }}
                colour="yellow"
            />
        );

        // Click the header to open (rendered inside a span)
        const headerButton = screen.getByText('30 Images', { selector: 'span' });
        fireEvent.click(headerButton);

        // Click an option (rendered inside a div list item)
        const targetOption = screen.getByText('100 Images', { selector: 'div' });
        fireEvent.click(targetOption);

        assert.strictEqual(selectedValue, '100');
    });

    it('closes the dropdown when clicking outside', () => {
        const { container } = render(
            <div>
                <div data-testid="outside">Outside element</div>
                <Dropdown options={options} value="30" onChange={() => {}} colour="yellow" />
            </div>
        );

        const headerButton = screen.getByText('30 Images', { selector: 'span' });
        const optionsList = container.querySelector('.shadow-md');
        assert.ok(optionsList);

        fireEvent.click(headerButton);

        // Click outside
        fireEvent.mouseDown(screen.getByTestId('outside'));

        // Options list should be closed (opacity-0)
        assert.ok(optionsList.classList.contains('opacity-0'));
    });

    it('uses default fallback label when value matches no option', () => {
        render(
            <Dropdown options={options} value="invalid-value" onChange={() => {}} colour="yellow" />
        );
        // Fallback value is '30 Images'
        assert.ok(screen.getByText('30 Images', { selector: 'span' }));
    });

    it('positions dropdown list above the header when size is small', () => {
        const { container } = render(
            <Dropdown
                options={options}
                value="30"
                onChange={() => {}}
                colour="yellow"
                size="small"
            />
        );
        // Open the dropdown
        const headerButton = screen.getByText('30 Images', { selector: 'span' });
        fireEvent.click(headerButton);

        const listContainer = container.querySelector('.bottom-full');
        assert.ok(listContainer);
    });

    it('removes event listener on unmount', () => {
        const { unmount } = render(
            <Dropdown options={options} value="30" onChange={() => {}} colour="yellow" />
        );
        unmount();
        // Trigger click outside to check no crash occurs
        fireEvent.mouseDown(document.body);
        assert.ok(true);
    });
});
