import { getProducts } from '@/lib/products'

/**
 * ComparisonTable -- side-by-side product comparison, referenced by id.
 *
 * From MDX, pass a comma-separated string:
 *
 *     <ComparisonTable ids="taylor-k2006, hth-6-way-strips" />
 *
 * NOT an array literal. next-mdx-remote v6 strips JavaScript expressions from
 * MDX by default (that is the fix for the RCE advisory against v5), so
 * `ids={[...]}` silently evaluates to nothing. We keep that protection on --
 * content files have no business executing JS -- and take a string instead.
 * An array still works when the component is called from real JSX.
 *
 * Mobile behaviour: the table scrolls horizontally inside its own container
 * rather than shrinking columns to unreadable widths. The wrapper is
 * focusable and labelled so keyboard and screen reader users can reach the
 * scroll region -- a plain overflow div is a known a11y trap.
 */
export function parseIds(ids) {
  if (Array.isArray(ids)) return ids
  if (typeof ids === 'string') return ids.split(',').map((id) => id.trim()).filter(Boolean)
  return []
}

export default function ComparisonTable({ ids = [], caption = 'Product comparison' }) {
  const items = getProducts(parseIds(ids))
  if (!items.length) return null

  return (
    <div className="not-prose my-8">
      <div
        role="region"
        aria-label={caption}
        tabIndex={0}
        className="overflow-x-auto rounded-xl border border-slate-200"
      >
        <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-pool-700 text-white">
              <th scope="col" className="px-4 py-3 font-semibold">Product</th>
              <th scope="col" className="px-4 py-3 font-semibold">Best For</th>
              <th scope="col" className="px-4 py-3 font-semibold">Watch out for</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product, index) => {
              return (
                <tr
                  key={product.id}
                  className={index % 2 ? 'bg-slate-50' : 'bg-white'}
                >
                  <th scope="row" className="max-w-[220px] px-4 py-4 align-top font-bold text-pool-900">
                    {product.title}
                    {false && (
                      <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-accent-700">
                        {product.badge}
                      </span>
                    )}
                  </th>
                  <td className="max-w-[260px] px-4 py-4 align-top text-slate-700">
                    {product.summary}
                  </td>
                  <td className="max-w-[260px] px-4 py-4 align-top text-slate-700">
                    {product.constraint || '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-slate-500 sm:hidden">Scroll the table sideways to see every column.</p>
    </div>
  )
}
