import { useMount } from '@/hooks/use-mount';
import { render, cleanup } from '@testing-library/react';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import React, { useState } from 'react';

describe('useMount hook', () => {
    it('runs the callback exactly once when mounted', () => {
        let count = 0;
        const TestComponent = () => {
            const [val, setVal] = useState(0);
            useMount(() => {
                count++;
            });
            return <button onClick={() => setVal((v) => v + 1)}>Increment</button>;
        };

        const { getByRole } = render(<TestComponent />);
        assert.strictEqual(count, 1);

        // Re-rendering or triggering a state update should not invoke the mount function again
        const button = getByRole('button');
        button.click();

        assert.strictEqual(count, 1);
        cleanup();
    });
});
