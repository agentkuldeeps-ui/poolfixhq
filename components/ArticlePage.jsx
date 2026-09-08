import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import MdxRenderer from '@/components/MdxRenderer'
import AuthorByline from '@/components/AuthorByline'
import AnswerBlock from '@/components/AnswerBlock'
import ArticleCard from '@/components/ArticleCard'
import ReviewSidebar from '@/components/ReviewSidebar'
import { categoryBySlug, subcategoryLabel } from '@/lib/taxonomy'
import { getRelated } from '@/lib/content'
import { articleSchema } from '@/lib/schema'

/**
 * The single template behind every review, roundup and comparison.
 *
 * PAGE ORDER IS THE ARGUMENT, and it is inverted-pyramid on purpose:
 *
 *   H1 -> byline -> ANSWER -> table of contents -> body -> FAQ -> sources
 *
 * The answer comes before the reasoning because both audiences want it there.
 * A reader standing next to their pool wants the conclusion; an answer engine
 * lifts the first self-contained passage after the H1. Making the reader
 * scroll past 800 words of preamble to reach a verdict is a pattern that
 * loses both.
 *
 * The byline sits ABOVE the answer, not buried at the bottom. Who wrote it
 * and when it was last checked are trust signals, and a trust signal below
 * the fold is a trust signal nobody sees.
 *
 * A `status: scaffold` page renders normally but is noindex,follow via
 * lib/seo.js and is excluded from the sitemap from the same field, so a draft
 * can be reviewed at a real URL without being indexed.
 */
export default function ArticlePage({ article }) {
  const category = categoryBySlug[article.category]
  const related = getRelated(article, 3)

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: category?.title ?? article.category, href: `/${article.category}` },
    { name: article.title, href: article.href },
  ]

  return (
    <>
      <JsonLd data={articleSchema(article, crumbs)} />

      <article>
        <header className="border-b border-slate-200 bg-gradient-to-b from-pool-50 to-white">
          <div className="container-page py-8 sm:py-10">
            <Breadcrumbs items={crumbs} />

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/${article.category}`}
                className="eyebrow hover:border-pool-400 hover:text-pool-900"
              >
                {category?.label ?? article.category}
              </Link>
              {article.subcategory && (
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  {subcategoryLabel(article.category, article.subcategory)}
                </span>
              )}
              {article.status !== 'live' && (
                <span className="rounded bg-verdict-warnBg px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-verdict-warn">
                  Draft — not indexed
                </span>
              )}
            </div>

            <h1 className="mt-3 max-w-4xl">{article.title}</h1>

            <AuthorByline article={article} className="mt-5" />
          </div>
        </header>

        <div className="container-page py-8">
          {/* Two-column on desktop, single column below `lg`. The sidebar is
              hidden rather than stacked on mobile -- see ReviewSidebar. */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr),19rem] lg:gap-12">
            <div className="min-w-0 max-w-3xl">
              {/* The answer block is rendered here rather than left to the MDX,
                  so no page can ship without one. check-seo.mjs enforces it. */}
              <AnswerBlock answer={article.answer} />

              <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-p:text-[17px] prose-p:leading-relaxed prose-li:text-[17px]">
                <MdxRenderer source={article.body} article={article} />
              </div>
            </div>

            <ReviewSidebar article={article} />
          </div>
        </div>

        {related.length > 0 && (
          <aside aria-labelledby="related-heading" className="border-t border-slate-200 bg-slate-50">
            <div className="container-page py-10">
              <h2 id="related-heading" className="mb-5 text-xl font-bold text-pool-900 sm:text-2xl">
                Related
              </h2>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <li key={`${r.category}/${r.slug}`}>
                    <ArticleCard article={r} />
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </article>
    </>
  )
}
