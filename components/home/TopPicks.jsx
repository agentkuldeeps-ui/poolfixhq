import Link from 'next/link'
import { categoryBySlug } from '@/lib/categories'
import { getAllArticles } from '@/lib/content'

/**
 * "Top Picks Right Now" -- the #1 pick from the highest-volume categories.
 *
 * Sourced from frontmatter `winner: true`, one per category, in the priority
 * order below. Renders nothing at all until there is something real to show:
 * an empty "our top picks" strip is worse than no strip, and this block sits
 * high on the page where a placeholder would be most visible.
 */
const PRIORITY = [
  'pool-cleaners',
  'pool-pumps',
  'chlorine-shock',
  'test-kits',
  'pool-filters',
  'salt-systems',
]

export default function TopPicks({ limit = 6 }) {
  const all = getAllArticles()

  const picks = PRIORITY.map((slug) =>
    all.find((a) => a.category === slug && a.winner),
  )
    .filter(Boolean)
    .slice(0, limit)

  if (!picks.length) return null

  return (
    <section aria-labelledby="top-picks-heading" className="border-b border-slate-200 bg-slate-50">
      <div className="container-page py-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2
              id="top-picks-heading"
              className="text-2xl font-bold tracking-tight text-pool-900 sm:text-3xl"
            >
              Top picks right now
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-600">
              One pick per category, and the reasoning behind each is on its own page. We change
              these when the evidence changes, not when the commission does.
            </p>
          </div>
          <Link
            href="/product-reviews/best-of"
            className="text-sm font-semibold text-accent-700 hover:underline"
          >
            All best-of roundups &rarr;
          </Link>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((pick) => {
            const category = categoryBySlug[pick.category]
            const product = pick.products?.[0]

            return (
              <li key={`${pick.category}/${pick.slug}`}>
                <Link
                  href={pick.href}
                  className="group flex h-full flex-col rounded-xl border-2 border-pool-100 bg-white p-5 transition-colors hover:border-pool-400"
                >
                  <span className="inline-flex w-fit rounded-full bg-pool-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-pool-700">
                    {category?.label ?? pick.category}
                  </span>

                  <p className="mt-3 text-lg font-bold leading-snug text-pool-900 group-hover:underline">
                    {product?.name ?? pick.title}
                  </p>

                  {pick.quickAnswer && (
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">
                      {pick.quickAnswer}
                    </p>
                  )}

                  <span className="mt-4 text-sm font-semibold text-accent-700">
                    Read the review &rarr;
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
