import Link from 'next/link'
import { states } from '@/lib/states'
import { getArticles } from '@/lib/content'

/**
 * State picker. Climate changes the playbook more than any other variable --
 * an Arizona pool and a Minnesota pool have almost nothing in common in
 * February -- and this is the entry point into that silo.
 *
 * States without a published guide render as muted chips, not dead links.
 */
export default function RegionalFinder() {
  const published = new Set(getArticles('regional').map((a) => a.slug))

  return (
    <section aria-labelledby="regional-heading" className="bg-slate-50">
      <div className="container-page py-12 sm:py-16">
        <div className="max-w-2xl">
          <h2
            id="regional-heading"
            className="text-2xl font-bold tracking-tight text-pool-900 sm:text-3xl"
          >
            Where you live changes the answer
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Arizona sun burns off chlorine faster than you can add it. Minnesota winters crack
            plumbing that was not blown out properly. Same pool, different playbook.
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2.5">
          {states.map((state) => {
            const live = published.has(state.slug)
            return (
              <li key={state.slug}>
                {live ? (
                  <Link
                    href={`/regional/${state.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-pool-200 bg-white px-4 py-2.5 text-[15px] font-semibold text-pool-800 transition-colors hover:border-pool-400 hover:bg-pool-50"
                  >
                    {state.name}
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-200 px-4 py-2.5 text-[15px] text-slate-400">
                    {state.name}
                  </span>
                )}
              </li>
            )
          })}
        </ul>

        <Link
          href="/regional"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:underline"
        >
          All regional guides &rarr;
        </Link>
      </div>
    </section>
  )
}
