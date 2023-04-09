const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        responsive: 'min(85vw, 80rem)',
      },
      fontFamily: {
        sans: ['var(--font-archivo)', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'primary-heading': ['5rem ', '1'],
        'secondary-heading': ['3rem ', '1'],
        'tertiary-heading': ['2rem ', '1'],
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
        solid: '6px 6px',
      },
    },
  },
  plugins: [],
};
