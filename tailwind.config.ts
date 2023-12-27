import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      width: {
        responsive: 'min(85vw, 90rem)',
      },
      colors: {
        grey: '#252020',
        white: '#F3F3EB',
        orange: '#E1652B',
        yellow: '#FCC018',
        purple: '#7E7FE7',
      },
      screens: {
        smr: '480px',
      },
    },
  },
  plugins: [],
};

export default config;
