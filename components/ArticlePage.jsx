import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import MdxRenderer from '@/components/MdxRenderer'
import RelatedPosts from '@/components/mdx/RelatedPosts'
import { formatDate } from '@/components/ArticleCard'
import { categoryBySlug } from '@/lib/categories'
import { getRelated } from '@/lib/content'
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema'

/**
 * Shared article shell used by every /<category>/[slug] route. Handles the
 * masthead, breadcrumbs, structured data, MDX body, and the trailing
 * RelatedPosts grid, so the per-category route files stay tiny.
 */
export default function ArticlePage({ article }) {
  const category = categoryBySlug[article.category]
  const related = getRelated(article, 3)

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: category.title, href: `/${category.slug}` },
    { name: article.title, href: article.href },
  ]

  const bodyRendersRelated = /<RelatedPosts\b/.test(article.body)

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          articleSchema(article),
          faqSchema(article.faqs),
        ].filter(Boolean)}
      />

      <article className="container-page py-8 lg:py-12">
        <div className="mx-auto w-full max-w-3xl">
          <Breadcrumbs items={crumbs} />

          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-pool-600">
            {category.label}
          </p>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-pool-900 sm:text-4xl">
            {article.title}
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last updated{' '}
            <time dateTime={article.lastUpdated}>{formatDate(article.lastUpdated)}</time>
            {article.readingTime ? ` · ${article.readingTime} min read` : null}
            {' · '}
            <a href="/editorial-policy" className="underline decoration-slate-300 underline-offset-2 hover:text-pool-700">
              How we review
            </a>
          </p>

          <div className="prose prose-slate mt-8 prose-headings:scroll-mt-24 prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-xl prose-img:rounded-xl">
            <MdxRenderer source={article.body} article={article} related={related} />
          </div>

          {!bodyRendersRelated && <RelatedPosts posts={related} />}
        </div>
      </article>
    </>
  )
}
