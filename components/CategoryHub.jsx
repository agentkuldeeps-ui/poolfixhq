import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import AnswerBlock from '@/components/AnswerBlock'
import ComparisonTable from '@/components/mdx/ComparisonTable'
import { getArticles } from '@/lib/content'
import { breadcrumbSchema, collectionSchema, faqSchema } from '@/lib/schema'

/**
 * Shared hub for every product category. Each app/<category>/page.js is a
 * four-line wrapper over this, so the 13 hubs cannot drift apart.
 *
 * These pages carry real weight even with no reviews published yet, and they
 * are built to. In order:
 *
 *   1. the category's direct answer  -- the AEO hook
 *   2. "Which type do you need?"     -- the decision most readers actually
 *                                       need to make before any model matters
 *   3. "How we judge these"          -- buyingCriteria from lib/taxonomy.js,
 *                                       which is the E-E-A-T load-bearing
 *                                       part: it publishes the criteria
 *                                       before any product is scored against
 *                                       them, so the ratings are auditable
 *   4. the reviews themselves
 *
 * A hub with nothing published is still a useful page under this shape, which
 * matters because these are the landing pages for category-level search.
 */
export default function CategoryHub({ category }) {
  const articles = getArticles(category.slug).filter((a) => a.status === 'live')
  const subcategories = category.subcategories ?? []

  const roundups = articles.filter((a) => a.type === 'roundup')
  const rest = articles.filter((a) => a.type !== 'roundup')

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: category.title, href: `/${category.slug}` },
  ]

  const faqs = [
    {
      q: `How do I choose a ${category.label.toLowerCase().replace(/s$/, '')}?`,
      a: category.shortAnswer,
    },
  ]

  const compareRows = articles
    .filter((a) => a.products?.length)
    .map((a) => ({
      name: a.products[0].name,
      href: a.href,
      badge: a.products[0].badge,
      price_tier: a.products[0].price_tier,
      rating: a.products[0].rating != null ? `${a.products[0].rating}/5` : null,
      brand: a.products[0].brand,
      fits: {
        pool_type: a.pool_type,
        sanitizer: a.sanitizer,
        filter_type: a.filter_type,
        surface: a.surface,
        gallons: a.gallons,
      },
    }))

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          collectionSchema(category, articles),
          faqSchema(faqs),
        ]}
      />

      <PageHeader
        eyebrow={category.label}
        title={category.heading}
        description={category.description}
      >
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        <div className="mx-auto max-w-3xl">
          <AnswerBlock answer={category.shortAnswer} />
        </div>

        {subcategories.length > 0 && (
          <section aria-labelledby="which-type" className="mt-10">
            <h2 id="which-type">Which type do you need?</h2>
            <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-slate-600">
              Narrowing the type is most of the decision. Everything after it is comparing models
              inside one shortlist.
            </p>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {subcategories.map((sub) => {
                const count = articles.filter((a) => a.subcategory === sub.slug).length
                return (
                  <li key={sub.slug}>
                    <div className="card flex h-full items-center justify-between gap-3 px-4 py-3">
                      <span className="text-[15px] font-semibold text-pool-800">{sub.label}</span>
                      <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {count ? `${count} review${count === 1 ? '' : 's'}` : 'soon'}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {/* Publishing the criteria BEFORE any product is scored is what makes
            a rating auditable rather than decorative. */}
        <section aria-labelledby="how-we-judge" className="mt-12">
          <h2 id="how-we-judge">How we judge {category.label.toLowerCase()}</h2>
          <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-slate-600">
            Every product in this category is scored against the same list. It is published here
            first so you can check our reasoning rather than take a number on trust.{' '}
            <Link href="/how-we-test" className="link-inline">
              Our full method
            </Link>
            .
          </p>

          <ol className="mt-5 grid gap-3 sm:grid-cols-2">
            {category.buyingCriteria.map((c, i) => (
              <li key={c} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4">
                <span className="shrink-0 font-mono text-sm font-bold text-pool-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[15px] leading-relaxed text-slate-700">{c}</span>
              </li>
            ))}
          </ol>
        </section>

        {compareRows.length > 1 && (
          <ComparisonTable
            title={`Compare ${category.label.toLowerCase()}`}
            rows={compareRows}
            columns={[
              { key: 'brand', label: 'Brand' },
              { key: 'rating', label: 'Our score' },
            ]}
            caption={`Comparison of ${category.label} reviewed on this site, filterable by pool type.`}
          />
        )}

        {roundups.length > 0 && (
          <section aria-labelledby="roundups" className="mt-12">
            <h2 id="roundups">Best-of roundups</h2>
            <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {roundups.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} showCategory={false} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="all-reviews" className="mt-12">
          <h2 id="all-reviews">Reviews and comparisons</h2>

          {rest.length ? (
            <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} showCategory={false} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-slate-300 p-8 text-center">
              <p className="text-slate-600">
                Nothing published in this category yet. Products get listed here only after they
                have been checked against the manufacturer&rsquo;s own documentation.
              </p>
              <Link
                href="/reviews"
                className="mt-4 inline-block text-sm font-semibold text-accent-700 hover:underline"
              >
                Browse everything we have reviewed &rarr;
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
