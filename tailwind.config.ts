import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-myfont)'],
        mono: ['var(--font-poppins-mono)'],}
    },
  },
  plugins: [],
};
export default config;