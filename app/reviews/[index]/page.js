import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { reviewIndexes } from '@/lib/taxonomy'
import { getByType } from '@/lib/content'
import { breadcrumbSchema } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return reviewIndexes.map((i) => ({ index: i.slug }))
}

const find = (slug) => reviewIndexes.find((i) => i.slug === slug)

export function generateMetadata({ params }) {
  const index = find(params.index)
  if (!index) return {}
  return buildMetadata({
    title: index.title,
    description: index.description,
    path: `/reviews/${index.slug}`,
  })
}

export default function ReviewListingPage({ params }) {
  const index = find(params.index)
  if (!index) notFound()

  const articles = getByType(index.type)

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Reviews', href: '/reviews' },
    { name: index.label, href: `/reviews/${index.slug}` },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader eyebrow="Reviews" title={index.title} description={index.description}>
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        {articles.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={`${a.category}/${a.slug}`}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <p className="text-slate-600">Nothing published in this format yet.</p>
            <Link href="/reviews" className="mt-4 inline-block text-sm font-semibold text-accent-700 hover:underline">
              Back to all reviews &rarr;
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
