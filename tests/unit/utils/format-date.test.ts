import { formatDate } from '@/utils/format-date';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

describe('formatDate', () => {
    it('should format dates as DD/MM/YYYY', () => {
        const date = new Date(2026, 4, 18);
        const result = formatDate(date);
        assert.strictEqual(result, '18/05/2026');
    });

    it('should pad single-digit days and months with leading zeros', () => {
        const date = new Date(2026, 0, 5); // Jan 5, 2026
        const result = formatDate(date);
        assert.strictEqual(result, '05/01/2026');
    });
});
