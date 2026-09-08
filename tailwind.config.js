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
        // 700 (#0C4E6E) is the brand anchor.
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
        // ACCENT -- warm. CTAs and affiliate buttons ONLY.
        // Never body text, never structure. If everything is accent,
        // nothing is, and the buy button stops reading as the buy button.
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
        // VERDICT -- used by rating badges and pros/cons only, so a
        // "good" and a "bad" always look the same everywhere on the site.
        verdict: {
          good: '#15803D',
          goodBg: '#F0FDF4',
          bad: '#B91C1C',
          badBg: '#FEF2F2',
          warn: '#A16207',
          warnBg: '#FEFCE8',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
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
            '--tw-prose-th-borders': theme('colors.slate.300'),
            '--tw-prose-td-borders': theme('colors.slate.200'),
            maxWidth: 'none',
            a: { textUnderlineOffset: '3px' },
            'h2 a, h3 a': { textDecoration: 'none' },
            // NO `table` OVERRIDE HERE, deliberately.
            //
            // This used to carry `display: block; overflow-x: auto;
            // white-space: nowrap`, intended to stop a wide spec table
            // dragging the whole page sideways. It did stop that, and it
            // caused something worse: `white-space: nowrap` forbids wrapping
            // in EVERY cell of EVERY table inside prose, so a two-line note in
            // a table cell ran off the edge on a phone instead of wrapping.
            // `display: block` also silently disables `table-layout: fixed`
            // and percentage column widths, so the usual fix stopped working.
            //
            // Horizontal scrolling now lives where it belongs -- on a wrapper
            // element, one per table. Markdown tables get theirs from the
            // `table` override in components/mdx/index.js; component tables
            // (SpecTable, BeforeYouBuy, ComparisonTable, Scorecard) each ship
            // with their own. The table itself stays a real table and its text
            // wraps like text.
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
