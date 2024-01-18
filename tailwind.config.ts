import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      width: {
        responsive: 'min(85vw, 90rem)',
      },
      boxShadow: {
        card: '10px 10px 0px 0px #7E7FE7',
        button: '4px 4px 0px 0px #000000',
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
