import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { getAllArticles } from '@/lib/content'
import { breadcrumbSchema } from '@/lib/schema'

/** Which frontmatter `type` each listing collects. */
const TYPE_FOR = {
  'best-of': 'roundup',
  comparisons: 'comparison',
  'individual-reviews': 'review',
}

export default function ReviewListing({ index }) {
  const wanted = TYPE_FOR[index.slug]

  // `review` is the default when type is absent, so an older file without the
  // field still lands in the individual-reviews listing rather than nowhere.
  const articles = getAllArticles().filter((a) =>
    wanted === 'review' ? a.type === 'review' || !a.type : a.type === wanted,
  )

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Product Reviews', href: '/product-reviews' },
    { name: index.label, href: `/product-reviews/${index.slug}` },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader eyebrow="Product Reviews" title={index.title} description={index.description}>
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        {articles.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={`${article.category}/${article.slug}`}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <p className="text-slate-500">Nothing published in this format yet.</p>
            <Link
              href="/product-reviews"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:underline"
            >
              Back to all product reviews
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
