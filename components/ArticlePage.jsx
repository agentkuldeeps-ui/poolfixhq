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
          faqSchema((article.faqs || []).map((f) => ({ question: f.q, answer: f.a }))),
        ].filter(Boolean)}
      />

      {/*
        Full-width shell with a sticky TOC rail. The article body still runs at a
        readable measure -- stretching 17px prose to 1100px would be worse to read,
        not better -- but the left gutter now carries navigation instead of nothing,
        and the whole page uses the viewport.
      */}
      <article className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-[16rem,minmax(0,1fr)] lg:gap-14">
          <nav
            aria-label="On this page"
            className="sticky top-24 hidden self-start lg:block"
          >
            {article.headings.length >= 3 && (
              <>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-pool-700">
                  On this page
                </p>
                <ul className="space-y-1.5 border-l border-slate-200">
                  {article.headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-[15px] leading-snug text-slate-600 hover:border-accent-600 hover:text-pool-800"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </nav>

          <div className="min-w-0">
          <Breadcrumbs items={crumbs} />

          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-pool-600">
            {category.label}
          </p>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-pool-900 sm:text-4xl">
            {article.title}
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last updated{' '}
            <time dateTime={article.dateModified}>{formatDate(article.dateModified)}</time>
            {article.readingTime ? ` · ${article.readingTime} min read` : null}
            {' · '}
            <a href="/editorial-policy" className="underline decoration-slate-300 underline-offset-2 hover:text-pool-700">
              How we review
            </a>
          </p>

          <div className="prose prose-slate mt-8 max-w-[68ch] prose-headings:scroll-mt-24 prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-xl prose-img:rounded-xl xl:max-w-[76ch]">
            <MdxRenderer source={article.body} article={article} related={related} />
          </div>

          {!bodyRendersRelated && <RelatedPosts posts={related} />}
          </div>
        </div>
      </article>
    </>
  )
}
