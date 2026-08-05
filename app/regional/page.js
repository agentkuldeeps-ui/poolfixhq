import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { categoryBySlug } from '@/lib/categories'
import { getArticles } from '@/lib/content'
import { regions, states } from '@/lib/states'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

const category = categoryBySlug.regional

export const metadata = buildMetadata({
  title: category.title,
  description: category.metaDescription,
  path: '/regional',
})

export default function RegionalIndexPage() {
  const articles = getArticles('regional')
  const published = new Map(articles.map((a) => [a.slug, a]))

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: category.title, href: '/regional' },
  ]

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), collectionPageSchema(category, articles)]} />

      <PageHeader eyebrow={category.label} title={category.heading} description={category.description}>
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        {regions.map((region) => {
          const inRegion = states.filter((s) => s.region === region)
          return (
            <section key={region} className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-pool-900">{region}</h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {inRegion.map((state) => {
                  const article = published.get(state.slug)
                  return (
                    <li key={state.slug}>
                      {article ? (
                        <Link
                          href={article.href}
                          className="flex h-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 font-semibold text-pool-800 transition-colors hover:border-pool-300 hover:bg-pool-50"
                        >
                          <span>{state.name}</span>
                          <span aria-hidden="true" className="text-sm text-pool-400">
                            {state.abbr}
                          </span>
                        </Link>
                      ) : (
                        <div className="flex h-full items-center justify-between gap-3 rounded-xl border border-dashed border-slate-200 px-5 py-4 text-slate-400">
                          <span>{state.name}</span>
                          <span className="text-xs uppercase tracking-wide">Coming soon</span>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>
    </>
  )
}
