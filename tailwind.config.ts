import type { Config } from 'tailwindcss';

// import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      width: {
        responsive: 'min(85vw, 90rem)',
      },
      colors: {
        background: '#252020',
        white: '#F3F3EB',
        orange: '#E1652B',
        yellow: '#FCC018',
        purple: '#7E7FE7',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        smr: '480px',
      },
    },
  },
  plugins: [],
};

export default config;
