import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import JsonLd from '@/components/JsonLd'
import { categories, categoriesByNavGroup, compatBrands } from '@/lib/taxonomy'
import { getWinners, getLiveArticles } from '@/lib/content'
import { site, absoluteUrl } from '@/lib/site'
import { buildMetadata } from '@/lib/seo'
import { faqSchema } from '@/lib/schema'

export const metadata = buildMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: '/',
})

/** Highest-value categories first, for the Top Picks strip. */
const PICK_ORDER = [
  'pool-cleaners',
  'pool-pumps',
  'chlorine-shock',
  'test-kits',
  'pool-filters',
  'salt-systems',
]

const HOME_FAQS = [
  {
    q: 'How does PoolFixHQ choose which products to recommend?',
    a: 'Every category has a published list of buying criteria, set before any product is scored against it. Products are judged on manufacturer specifications, product labels and documented owner-reported failure patterns, then rated on that same list so the scores actually compare.',
  },
  {
    q: 'Does PoolFixHQ make money from these recommendations?',
    a: 'Yes. We earn an affiliate commission on qualifying purchases made through links on this site, at no extra cost to you. It does not change what we recommend, and pages regularly point readers at the cheaper option or at not buying anything.',
  },
  {
    q: 'Why does this site not list prices?',
    a: 'Because we have no live price feed, so any figure we published would be stale within days. Products are placed in a budget, mid-range or premium bracket instead, and you check the current price at the retailer.',
  },
]

export default function HomePage() {
  const picks = getWinners(PICK_ORDER, 6)
  const live = getLiveArticles()

  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQS)} />

      {/* ---------------------------------------------------------- hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-pool-100 via-pool-50 to-white">
        <div className="container-page py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-600" />
              Specs first. Marketing second.
            </p>

            <h1>Pool Gear, Judged on the Spec Sheet</h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {site.longDescription}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/reviews/best-of" className="btn-primary">
                Best-of roundups
              </Link>
              <Link href="/how-we-test" className="btn-secondary">
                How we evaluate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ top picks */}
      {picks.length > 0 && (
        <section aria-labelledby="picks-heading" className="border-b border-slate-200 bg-white">
          <div className="container-page py-12 sm:py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 id="picks-heading">Top picks right now</h2>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">
                  One pick per category, with the reasoning on its own page. These change when the
                  evidence changes, not when the commission does.
                </p>
              </div>
              <Link href="/reviews/best-of" className="text-sm font-semibold text-accent-700 hover:underline">
                All roundups &rarr;
              </Link>
            </div>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {picks.map((p) => (
                <li key={`${p.category}/${p.slug}`}>
                  <ArticleCard article={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------ categories */}
      <section aria-labelledby="categories-heading" className="border-b border-slate-200 bg-slate-50">
        <div className="container-page py-12 sm:py-16">
          <div className="max-w-2xl">
            <h2 id="categories-heading">Browse by category</h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-600">
              Each hub opens with the decision you actually have to make first, then the criteria
              we judge that category on, then the products.
            </p>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categoriesByNavGroup.map(({ group, items }) => (
              <div key={group}>
                <h3 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-widest text-pool-700">
                  {group}
                </h3>
                <ul className="mt-3 space-y-1">
                  {items.map((c) => {
                    const count = live.filter((a) => a.category === c.slug).length
                    return (
                      <li key={c.slug}>
                        <Link href={`/${c.slug}`} className="group block rounded-md px-2 py-2 hover:bg-white">
                          <span className="flex items-baseline justify-between gap-2">
                            <span className="text-[15px] font-semibold text-pool-800 group-hover:underline">
                              {c.label}
                            </span>
                            {count > 0 && (
                              <span className="shrink-0 text-xs font-semibold text-slate-400">
                                {count}
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 block text-[13.5px] leading-snug text-slate-500">
                            {c.heading}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- method */}
      <section aria-labelledby="method-heading" className="border-b border-slate-200 bg-white">
        <div className="container-page py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr,1fr] lg:gap-16">
            <div>
              <h2 id="method-heading">What makes a review here different</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Most product pages restate the retailer listing. Listings are marketing copy, and
                they are routinely wrong about the numbers that decide a purchase.
              </p>
              <Link href="/how-we-test" className="btn-secondary mt-6">
                Read the full method
              </Link>
            </div>

            <dl className="space-y-6">
              {[
                [
                  'Criteria published before scores',
                  'Every category lists what it is judged on, up front. A rating you cannot audit is decoration.',
                ],
                [
                  'Manufacturer documents, not listings',
                  'Flow curves, manuals and product labels. Where a listing and a manual disagree, the manual wins.',
                ],
                [
                  'The cheaper answer, when it is the right one',
                  'A five-dollar o-ring instead of a pump. Saying so costs us the referral and it is still the honest read.',
                ],
                [
                  'No prices, ever',
                  'We have no live price feed. A stale price is worse than no price, so we publish brackets instead.',
                ],
              ].map(([term, def]) => (
                <div key={term} className="border-l-4 border-pool-200 pl-5">
                  <dt className="font-bold text-pool-900">{term}</dt>
                  <dd className="mt-1 text-[16px] leading-relaxed text-slate-600">{def}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- brands */}
      <section aria-labelledby="brands-heading" className="border-b border-slate-200 bg-slate-50">
        <div className="container-page py-12 sm:py-16">
          <div className="max-w-2xl">
            <h2 id="brands-heading">Shop by brand system</h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-600">
              Replacement cells, cartridges and parts mostly have to match what is already bolted
              to your equipment pad. Start from the badge on the housing.
            </p>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {compatBrands.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/brands/${b.slug}`}
                  className="inline-flex items-center rounded-lg border-2 border-pool-100 bg-white px-4 py-2.5 text-[15px] font-semibold text-pool-800 transition-colors hover:border-pool-400 hover:bg-pool-50"
                >
                  {b.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------- FAQ */}
      <section aria-labelledby="home-faq" className="bg-white">
        <div className="container-page py-12 sm:py-16">
          <h2 id="home-faq">Common questions</h2>
          <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
            {HOME_FAQS.map((f) => (
              <div key={f.q} className="py-5">
                <h3 className="text-lg font-bold leading-snug text-pool-900">{f.q}</h3>
                <p className="mt-2 max-w-3xl text-[16px] leading-relaxed text-slate-700">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
