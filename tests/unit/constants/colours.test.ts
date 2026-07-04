import { BG_COLOURS, BORDER_COLOURS, getContrastColor } from '@/constants/colours';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

describe('colours constants and utilities', () => {
    it('contains valid CSS class mappings for background colors', () => {
        assert.strictEqual(BG_COLOURS.yellow, 'bg-yellow');
        assert.strictEqual(BG_COLOURS.orange, 'bg-orange');
        assert.strictEqual(BG_COLOURS.purple, 'bg-purple');
        assert.strictEqual(BG_COLOURS.black, 'bg-black');
        assert.strictEqual(BG_COLOURS.grey, 'bg-grey');
        assert.strictEqual(BG_COLOURS.lightGrey, 'bg-gray-500');
        assert.strictEqual(BG_COLOURS.white, 'bg-white');
    });

    it('contains valid CSS class mappings for border colors', () => {
        assert.strictEqual(BORDER_COLOURS.yellow, 'border-yellow border-2');
        assert.strictEqual(BORDER_COLOURS.orange, 'border-orange border-2');
        assert.strictEqual(BORDER_COLOURS.purple, 'border-purple border-2');
        assert.strictEqual(BORDER_COLOURS.black, 'border-black border-2');
        assert.strictEqual(BORDER_COLOURS.grey, 'border-grey border-2');
        assert.strictEqual(BORDER_COLOURS.lightGrey, 'border-gray-500 border-2');
        assert.strictEqual(BORDER_COLOURS.white, 'border-white border-2');
    });

    it('getContrastColor returns white (#FFFFFF) for dark background colors', () => {
        // Pure black
        assert.strictEqual(getContrastColor('#000000'), '#FFFFFF');
        // Pure red
        assert.strictEqual(getContrastColor('#FF0000'), '#FFFFFF');
        // Dark blue
        assert.strictEqual(getContrastColor('#000033'), '#FFFFFF');
    });

    it('getContrastColor returns black (#000000) for light background colors', () => {
        // Pure white
        assert.strictEqual(getContrastColor('#FFFFFF'), '#000000');
        // Light yellow
        assert.strictEqual(getContrastColor('#FFFF99'), '#000000');
        // Pure green (relatively high luminance in ITU-R BT.601)
        assert.strictEqual(getContrastColor('#00FF00'), '#000000');
    });

    it('getContrastColor parses hex colors with and without prefix successfully', () => {
        assert.strictEqual(getContrastColor('000000'), '#FFFFFF');
        assert.strictEqual(getContrastColor('#000000'), '#FFFFFF');
    });
});
