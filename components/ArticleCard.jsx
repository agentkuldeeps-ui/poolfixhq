import Link from 'next/link'
import { categoryBySlug, badgeLabel } from '@/lib/taxonomy'
import RatingBadge from '@/components/mdx/RatingBadge'

const TYPE_LABEL = {
  review: 'Review',
  roundup: 'Best of',
  comparison: 'Comparison',
  guide: 'Guide',
}

/**
 * Card for a content page in any listing.
 *
 * Leads with the `answer` rather than a body excerpt. An excerpt is whatever
 * happened to be in the first paragraph; the answer is the conclusion, which
 * is the thing that makes someone click. It also means the card, the meta
 * description, the RSS item and the AI summary all say the same thing.
 *
 * The whole card is one link with no nested interactive elements, so the tap
 * target on a phone is the card, not a 14px title.
 */
export default function ArticleCard({ article, showCategory = true }) {
  const category = categoryBySlug[article.category]
  const top = article.products?.[0]

  return (
    <article className="card h-full">
      <Link href={article.href} className="group flex h-full flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-pool-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-pool-700">
            {TYPE_LABEL[article.type] ?? article.type}
          </span>
          {showCategory && category && (
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              {category.label}
            </span>
          )}
          {top?.badge && (
            <span className="text-[11px] font-bold uppercase tracking-wide text-accent-700">
              {badgeLabel[top.badge] ?? top.badge}
            </span>
          )}
        </div>

        <h3 className="mt-3 text-lg font-bold leading-snug text-pool-900 group-hover:underline">
          {article.title}
        </h3>

        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{article.answer}</p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
          <span className="text-sm font-semibold text-accent-700">Read &rarr;</span>
          {top?.rating !== undefined && top?.rating !== null && (
            <RatingBadge value={top.rating} size="sm" />
          )}
        </div>
      </Link>
    </article>
  )
}
