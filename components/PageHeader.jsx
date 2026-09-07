/**
 * The H1 block. Every page uses this, which is how "exactly one H1 per page"
 * stays true without anyone having to remember it -- scripts/check-seo.mjs
 * fails the build if a rendered page has zero or more than one.
 *
 * `children` slots in above the heading, for breadcrumbs.
 */
export default function PageHeader({ eyebrow, title, description, children, align = 'left' }) {
  return (
    <header
      className={`border-b border-slate-200 bg-gradient-to-b from-pool-50 to-white ${
        align === 'center' ? 'text-center' : ''
      }`}
    >
      <div className="container-page py-8 sm:py-12">
        {children}

        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}

        <h1 className={align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-4xl'}>{title}</h1>

        {description && (
          <p
            className={`mt-4 text-lg leading-relaxed text-slate-600 ${
              align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-3xl'
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </header>
  )
}
