/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        // PRIMARY -- deep pool blue. Structure, headers, links, trust.
        pool: {
          50: '#EFF8FC',
          100: '#D8EDF7',
          200: '#AEDAEE',
          300: '#77BFE0',
          400: '#3D9EC9',
          500: '#1B7CA9',
          600: '#0F6188',
          700: '#0C4E6E',
          800: '#0A3E58',
          900: '#083247',
          950: '#05202E',
        },
        // ACCENT -- warm. CTAs only. Never used for body text or structure.
        accent: {
          50: '#FFF6ED',
          100: '#FFEAD5',
          200: '#FDD0AA',
          300: '#FBB474',
          400: '#F98E3C',
          500: '#F77316',
          600: '#E2560C',
          700: '#BB3E0C',
          800: '#952F12',
          900: '#792912',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.slate.700'),
            '--tw-prose-headings': theme('colors.pool.900'),
            '--tw-prose-links': theme('colors.pool.700'),
            '--tw-prose-bold': theme('colors.pool.900'),
            '--tw-prose-quotes': theme('colors.pool.800'),
            '--tw-prose-quote-borders': theme('colors.pool.200'),
            '--tw-prose-bullets': theme('colors.pool.300'),
            '--tw-prose-counters': theme('colors.pool.600'),
            maxWidth: 'none',
            a: { textUnderlineOffset: '3px' },
            'h2 a, h3 a': { textDecoration: 'none' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
