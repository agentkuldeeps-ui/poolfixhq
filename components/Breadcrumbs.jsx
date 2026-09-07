import Link from 'next/link'

/**
 * Visible breadcrumbs. The matching BreadcrumbList JSON-LD is emitted
 * separately by each route from the SAME array, so the visible trail and the
 * structured one can never disagree -- Google checks that they match.
 *
 * The last crumb is the current page: not a link, and marked aria-current.
 */
export default function Breadcrumbs({ items = [] }) {
  if (items.length < 2) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-slate-500">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3 shrink-0 text-slate-300" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              )}
              {last ? (
                <span aria-current="page" className="font-medium text-slate-700">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-pool-700 hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
