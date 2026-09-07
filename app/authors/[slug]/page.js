import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { authors, getAuthor } from '@/lib/authors'
import { categoryBySlug } from '@/lib/taxonomy'
import { getLiveArticles } from '@/lib/content'
import { breadcrumbSchema, personSchema } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }) {
  const a = getAuthor(params.slug)
  if (!a) return {}
  return buildMetadata({
    title: a.name,
    description: a.credential || `Reviews and analysis by ${a.name}.`,
    path: `/authors/${a.slug}`,
    // A placeholder author is noindex: there is nothing verifiable to index,
    // and a thin author page with no real credentials is a liability rather
    // than an E-E-A-T signal. See lib/authors.js.
    noindex: a.placeholder,
  })
}

export default function AuthorPage({ params }) {
  const author = getAuthor(params.slug)
  if (!author) notFound()

  const articles = getLiveArticles().filter(
    (a) => a.author === author.slug || a.reviewedBy === author.slug,
  )

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: author.name, href: `/authors/${author.slug}` },
  ]

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), personSchema(author.slug)]} />

      <PageHeader eyebrow="Author" title={author.name} description={author.credential}>
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        <div className="mx-auto max-w-3xl">
          {author.placeholder && (
            <div className="mb-6 rounded-lg border border-verdict-warn/30 bg-verdict-warnBg p-4 text-[15px] text-slate-700">
              <strong className="font-semibold">This author profile is a placeholder.</strong> It
              is not indexed and emits no structured data until a real, named person with
              verifiable credentials is configured.
            </div>
          )}

          <div className="prose prose-slate max-w-none prose-p:text-[17px]">
            <p>{author.bio}</p>
          </div>

          {author.certifications?.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-pool-900">Credentials</h2>
              <ul className="mt-3 space-y-2">
                {author.certifications.map((c) => (
                  <li key={c.name} className="rounded-lg border border-slate-200 p-4">
                    <p className="font-semibold text-pool-900">{c.name}</p>
                    {c.issuedBy && <p className="text-sm text-slate-600">{c.issuedBy}</p>}
                    {c.url && (
                      <a href={c.url} target="_blank" rel="noopener" className="text-sm link-inline">
                        Verify
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {author.expertise?.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-pool-900">Covers</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {author.expertise.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/${slug}`}
                      className="inline-block rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-pool-800 hover:border-pool-400 hover:bg-pool-50"
                    >
                      {categoryBySlug[slug]?.label ?? slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {articles.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-5 text-xl font-bold text-pool-900 sm:text-2xl">
              Pages by {author.name}
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <li key={`${a.category}/${a.slug}`}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  )
}
