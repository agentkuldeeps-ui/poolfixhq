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
  // A credential line alone is usually too short for a useful meta
  // description, so it gets composed into a full sentence rather than used raw.
  const description = a.credential
    ? `${a.name} — ${a.credential}. Reviews, buying criteria and product analysis for PoolFixHQ.`
    : `Product reviews and analysis written by ${a.name} for PoolFixHQ, built from manufacturer documentation and published buying criteria.`

  return buildMetadata({
    title: a.name,
    description,
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

          {/* An author page is a content page, so it carries an answer block
              like every other one. "Who is this and what do they cover" is a
              real query, and this is the passage an answer engine lifts for
              it. check-seo.mjs warns when a content page has none. */}
          {!author.placeholder && (
            <div className="answer-block not-prose mb-6">
              <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-pool-600">
                Short answer
              </p>
              <p>
                {author.name} is the {author.role ?? 'author'} at PoolFixHQ
                {author.expertise?.length > 0 && (
                  <>
                    , covering{' '}
                    {author.expertise
                      .map((s) => categoryBySlug[s]?.label?.toLowerCase() ?? s)
                      .join(', ')}
                  </>
                )}
                . {articles.length > 0 ? `${articles.length} ` : 'Their '}
                {articles.length === 1 ? 'page carries' : 'pages carry'} their byline, each built
                from manufacturer documentation and scored against criteria published before any
                product is judged against them.
              </p>
            </div>
          )}

          {/* Photo beside the bio, not beside the answer block -- floated
              against the answer block it squeezed both. On a page whose whole
              job is "is this a real person who knows this equipment", a
              picture of them working on it does more than a studio portrait
              would, and this site does not bench-test, so it is the only
              first-hand evidence there is. */}
          <div className="flex flex-col gap-6 sm:flex-row-reverse sm:items-start sm:gap-7">
            {(author.atWorkImage || author.image) && !author.placeholder && (
              <figure className="shrink-0 sm:w-64">
                <img
                  src={author.atWorkImage ?? author.image}
                  alt={
                    author.atWorkCaption ??
                    `${author.name}, ${author.role ?? 'author'} at PoolFixHQ`
                  }
                  width={820}
                  height={1096}
                  className="w-full rounded-xl border border-slate-200 shadow-sm"
                />
                {author.atWorkCaption && (
                  <figcaption className="mt-2 text-[13px] leading-snug text-slate-500">
                    {author.atWorkCaption}
                  </figcaption>
                )}
              </figure>
            )}

            <div className="prose prose-slate min-w-0 max-w-none prose-p:text-[17px]">
              <p className="!mt-0">{author.bio}</p>
            </div>
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
