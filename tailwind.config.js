import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-recursive)', ...fontFamily.sans],
        mono: ['var(--font-recursive)', ...fontFamily.mono],
        display: ['var(--font-recursive)', ...fontFamily.sans],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        display: ['clamp(2.25rem, min(7vw, 9vh), 5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        display: '-0.02em',
        wordmark: '-0.01em',
        caps: '0.04em',
      },
      colors: {
        paper: 'oklch(99% 0.003 60)',
        'paper-elev': 'oklch(97% 0.004 60)',
        'border-subtle': 'oklch(92% 0.006 60)',
        hairline: 'oklch(85% 0.008 60)',
        muted: 'oklch(45% 0.010 50)',
        ink: 'oklch(22% 0.012 45)',
        'ink-strong': 'oklch(14% 0.014 40)',
        accent: 'oklch(50% 0.200 38)',
        'accent-press': 'oklch(44% 0.200 38)',
      },
    },
  },
  plugins: [],
};
