import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { categoriesByNavGroup, reviewIndexes } from '@/lib/taxonomy'
import { getLiveArticles } from '@/lib/content'
import { breadcrumbSchema } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Pool Product Reviews',
  description:
    'Every pool product review, best-of roundup and head-to-head comparison, organised by what you are trying to decide.',
  path: '/reviews',
})

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Reviews', href: '/reviews' },
]

export default function ReviewsIndexPage() {
  const live = getLiveArticles()
  const countFor = (type) =>
    live.filter((a) => (type === 'review' ? a.type === 'review' : a.type === type)).length

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader
        eyebrow="Reviews"
        title="Pool Product Reviews"
        description="Organised by the shape of the decision: one product in depth, a category shortlist, or two products head to head."
      >
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        <ul className="grid gap-5 sm:grid-cols-3">
          {reviewIndexes.map((index) => (
            <li key={index.slug}>
              <Link href={`/reviews/${index.slug}`} className="card group flex h-full flex-col p-5">
                <p className="text-lg font-bold text-pool-900 group-hover:underline">
                  {index.title}
                </p>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">
                  {index.description}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {countFor(index.type)} published
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <section aria-labelledby="by-category" className="mt-12">
          <h2 id="by-category">Browse by category</h2>
          <div className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categoriesByNavGroup.map(({ group, items }) => (
              <div key={group}>
                <h3 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-widest text-pool-700">
                  {group}
                </h3>
                <ul className="mt-3 space-y-1">
                  {items.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/${c.slug}`} className="group block rounded-md px-2 py-2 hover:bg-pool-50">
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
