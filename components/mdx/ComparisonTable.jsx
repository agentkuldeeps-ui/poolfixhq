'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { filterFacets, badgeLabel, priceTierLabel } from '@/lib/taxonomy'

/**
 * Comparison table with the "Your pool" filter bar.
 *
 * THE ONE CLIENT COMPONENT ON THE SITE, and it earns it.
 *
 * A static comparison table of eight pool pumps is not useful, because six of
 * them do not fit the reader's pool. A 15,000-gallon above-ground vinyl pool
 * on a cartridge filter has a different shortlist from a 40,000-gallon
 * in-ground plaster pool on salt, and a table that cannot express that is a
 * spec dump with extra steps. Letting the reader say which pool they own is
 * the difference between a page they scan and a page they use.
 *
 * How the matching works: a row matches a selected facet when it either
 * declares that exact value OR declares the facet's neutral value ("any",
 * "both"), because a product that fits every pool should never be filtered
 * out by a pool-specific question.
 *
 * Everything renders server-side first: with JavaScript off, or before
 * hydration, the full unfiltered table is present in the HTML. That matters
 * because crawlers and answer engines read the initial HTML, and a table that
 * only exists after hydration is a table they never see.
 */
export default function ComparisonTable({
  rows = [],
  columns = [],
  title = 'Compare',
  facets = ['pool_type', 'sanitizer', 'gallons'],
  caption,
}) {
  const active = filterFacets.filter((f) => facets.includes(f.key))
  const [selected, setSelected] = useState({})

  const visible = useMemo(() => {
    const chosen = Object.entries(selected).filter(([, v]) => v)
    if (!chosen.length) return rows

    return rows.filter((row) =>
      chosen.every(([key, value]) => {
        const facet = active.find((f) => f.key === key)
        const rowValue = row.fits?.[key] ?? row[key]
        if (rowValue === undefined || rowValue === null) return true
        return rowValue === value || rowValue === facet?.neutral
      }),
    )
  }, [rows, selected, active])

  const anySelected = Object.values(selected).some(Boolean)

  return (
    <section className="my-8" aria-label={title}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-xl font-bold text-pool-900 sm:text-2xl">{title}</h2>
        {anySelected && (
          <button
            type="button"
            onClick={() => setSelected({})}
            className="text-sm font-semibold text-accent-700 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {active.length > 0 && (
        <div className="mt-4 rounded-xl border border-pool-200 bg-pool-50 p-4">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-pool-700">
            Your pool
          </p>
          <div className="flex flex-wrap gap-4">
            {active.map((facet) => (
              <label key={facet.key} className="flex flex-col gap-1 text-sm">
                <span className="font-semibold text-slate-700">{facet.label}</span>
                <select
                  value={selected[facet.key] ?? ''}
                  onChange={(e) =>
                    setSelected((s) => ({ ...s, [facet.key]: e.target.value || undefined }))
                  }
                  className="min-w-[10rem] rounded-lg border-2 border-pool-200 bg-white px-3 py-2 font-medium text-pool-900"
                >
                  <option value="">Any</option>
                  {facet.options
                    .filter((o) => o.slug !== facet.neutral)
                    .map((o) => (
                      <option key={o.slug} value={o.slug}>
                        {o.label}
                      </option>
                    ))}
                </select>
              </label>
            ))}
          </div>
          <p className="mt-3 text-[13px] text-slate-600">
            Showing <strong>{visible.length}</strong> of {rows.length}. Products that suit any pool
            always stay listed.
          </p>
        </div>
      )}

      {/* This one genuinely cannot fit a phone -- it is a product against
          three to six spec columns, and squeezing it would make every column
          unreadable. So it scrolls inside its own box, and says so, because a
          table that is silently cut off at the edge looks like a bug. */}
      <p className="mt-4 text-[13px] text-slate-500 sm:hidden" aria-hidden="true">
        Swipe the table sideways to see every column.
      </p>
      <div className="mt-2 overflow-x-auto rounded-xl border border-slate-200 sm:mt-4">
        <table className="w-full border-collapse text-left text-[15px]">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="bg-pool-800 text-white">
              <th scope="col" className="px-4 py-3 font-semibold">
                Product
              </th>
              {columns.map((c) => (
                <th key={c.key} scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, i) => (
              <tr key={row.name ?? i} className={i % 2 ? 'bg-slate-50' : 'bg-white'}>
                <th scope="row" className="border-b border-slate-100 px-4 py-3 align-top font-semibold text-pool-900">
                  {row.href ? (
                    <Link href={row.href} className="hover:underline">
                      {row.name}
                    </Link>
                  ) : (
                    row.name
                  )}
                  {row.badge && (
                    <span className="mt-1 block text-[11px] font-bold uppercase tracking-wide text-accent-700">
                      {badgeLabel[row.badge] ?? row.badge}
                    </span>
                  )}
                  {row.price_tier && (
                    <span className="mt-0.5 block text-[12px] font-medium text-slate-400">
                      {priceTierLabel[row.price_tier]}
                    </span>
                  )}
                </th>
                {columns.map((c) => (
                  <td key={c.key} className="border-b border-slate-100 px-4 py-3 align-top text-slate-700">
                    {row[c.key] ?? row.specs?.[c.key] ?? <span className="text-slate-300">&mdash;</span>}
                  </td>
                ))}
              </tr>
            ))}

            {!visible.length && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-slate-500">
                  Nothing here fits that combination. Try widening one of the filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
