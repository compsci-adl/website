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
      fontSize: {
        'primary-heading': ['5.5rem ', '1'],
      },
      colors: {
        'accent-blue': '#1BB8D1',
        'accent-yellow': '#FCC018',
        'accent-red': '#E71A64',
        'accent-highlight': '#0AD7F8',
        'primary-fg': 'white',
        'primary-bg': '#F2EFE5',
      },
      borderWidth: {
        primary: '4px',
      },
      boxShadow: {
        solid: '7px 7px',
      },
    },
  },
  plugins: [],
};