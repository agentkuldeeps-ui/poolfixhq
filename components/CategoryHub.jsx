import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { getArticles } from '@/lib/content'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

/**
 * Shared hub index for every product category. app/<category>/page.js is a
 * four-line wrapper around this, so the 13 hubs cannot drift apart.
 *
 * The subcategory grid renders whether or not any reviews exist yet. That is
 * deliberate: these pages are the destination for every redirect off the
 * retired editorial URLs, and a page that only says "nothing here yet" is a
 * bad landing for that traffic. The subcategory list at least tells a visitor
 * what the section will cover and gives them somewhere to go.
 */
export default function CategoryHub({ category }) {
  const articles = getArticles(category.slug)
  const subcategories = category.subcategories ?? []
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: category.title, href: `/${category.slug}` },
  ]

  const roundups = articles.filter((a) => a.type === 'roundup')
  const reviews = articles.filter((a) => a.type !== 'roundup')

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), collectionPageSchema(category, articles)]} />

      <PageHeader
        eyebrow={category.label}
        title={category.heading}
        description={category.description}
      >
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        {subcategories.length > 0 && (
          <section aria-labelledby="which-type" className="mb-10">
            <h2
              id="which-type"
              className="text-xl font-bold tracking-tight text-pool-900 sm:text-2xl"
            >
              Which type do you need?
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-600">
              Narrowing the type first is most of the decision. Everything after it is comparing
              models inside one shortlist.
            </p>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {subcategories.map((sub) => {
                const count = articles.filter((a) => a.subcategory === sub.slug).length
                return (
                  <li key={sub.slug}>
                    <Link
                      href={`/${category.slug}#${sub.slug}`}
                      className="group flex h-full items-center justify-between gap-3 rounded-xl border-2 border-pool-100 bg-white px-4 py-3 transition-colors hover:border-pool-400 hover:bg-pool-50"
                    >
                      <span className="text-[15px] font-semibold text-pool-800 group-hover:underline">
                        {sub.label}
                      </span>
                      <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {count ? `${count} review${count === 1 ? '' : 's'}` : 'soon'}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {roundups.length > 0 && (
          <section aria-labelledby="roundups" className="mb-10">
            <h2 id="roundups" className="mb-5 text-xl font-bold tracking-tight text-pool-900 sm:text-2xl">
              Best-of roundups
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {roundups.map((article) => (
                <li key={article.slug}>
                  <ArticleCard article={article} showCategory={false} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="all-reviews">
          <h2 id="all-reviews" className="mb-5 text-xl font-bold tracking-tight text-pool-900 sm:text-2xl">
            Reviews and comparisons
          </h2>

          {reviews.length ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((article) => (
                <li key={article.slug}>
                  <ArticleCard article={article} showCategory={false} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
              <p className="text-slate-500">
                We are still working through this category. Nothing gets listed here until it has
                been researched against the manufacturer&rsquo;s own documentation.
              </p>
              <Link
                href="/product-reviews"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:underline"
              >
                Browse everything we have reviewed
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
