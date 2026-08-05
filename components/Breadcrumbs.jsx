import Link from 'next/link'

/**
 * Visible breadcrumb trail. Pair with <JsonLd> BreadcrumbList so the markup and
 * the structured data never drift apart -- both take the same `items` array.
 *
 * items: [{ name, href }] -- last item is the current page and is not a link.
 */
export default function Breadcrumbs({ items = [] }) {
  if (items.length < 2) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-slate-300">
                  /
                </span>
              )}
              {isLast ? (
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
