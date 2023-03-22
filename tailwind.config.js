const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-archivo)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'accent-blue': '#1BB8D1',
        'accent-yellow': '#FCC018',
        'accent-red': '#E71A64',
        // accentHighlight: '', // TODO
        'primary-fg': 'white',
        // bgPrimary: '' // TODO
      },
      borderWidth: {
        primary: '4px',
      },
      boxShadow: {
        solid: '5px 5px',
      },
    },
  },
  plugins: [],
};
