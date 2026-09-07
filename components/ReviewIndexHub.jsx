import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { categoriesByNavGroup } from '@/lib/categories'
import { getAllArticles } from '@/lib/content'
import { breadcrumbSchema } from '@/lib/schema'

/**
 * /product-reviews -- the top of the review tree, and the landing page for
 * every redirect off the retired /problems and /equipment sections.
 *
 * Two jobs: route people to the three listing types, and show the full
 * category map so a visitor who arrived from a dead symptom URL can find the
 * thing that fixes their problem in one more click.
 */
export default function ReviewIndexHub({ indexes }) {
  const all = getAllArticles()
  const countByType = {
    roundup: all.filter((a) => a.type === 'roundup').length,
    comparison: all.filter((a) => a.type === 'comparison').length,
    review: all.filter((a) => a.type === 'review' || !a.type).length,
  }
  const countFor = {
    'best-of': countByType.roundup,
    comparisons: countByType.comparison,
    'individual-reviews': countByType.review,
  }

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Product Reviews', href: '/product-reviews' },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader
        eyebrow="Product Reviews"
        title="Every Pool Product We Have Reviewed"
        description="Researched against manufacturer documentation and owner feedback, then written up in the order you would actually work the problem."
      >
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        <ul className="grid gap-5 sm:grid-cols-3">
          {indexes.map((index) => (
            <li key={index.slug}>
              <Link
                href={`/product-reviews/${index.slug}`}
                className="group flex h-full flex-col rounded-xl border-2 border-pool-100 bg-white p-5 transition-colors hover:border-pool-400 hover:bg-pool-50"
              >
                <p className="text-lg font-bold text-pool-900 group-hover:underline">
                  {index.title}
                </p>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">
                  {index.description}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {countFor[index.slug] || 0} published
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <section aria-labelledby="browse-by-category" className="mt-12">
          <h2
            id="browse-by-category"
            className="text-xl font-bold tracking-tight text-pool-900 sm:text-2xl"
          >
            Browse by category
          </h2>

          <div className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categoriesByNavGroup.map(({ group, items }) => (
              <div key={group}>
                <p className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-widest text-pool-700">
                  {group}
                </p>
                <ul className="mt-3 space-y-1">
                  {items.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.slug}`}
                        className="group block rounded-md px-2 py-2 hover:bg-pool-50"
                      >
                        <span className="text-[15px] font-semibold text-pool-800 group-hover:underline">
                          {c.label}
                        </span>
                        <span className="mt-0.5 block text-[13.5px] leading-snug text-slate-500">
                          {c.heading}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
