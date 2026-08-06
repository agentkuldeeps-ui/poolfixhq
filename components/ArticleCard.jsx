import Link from 'next/link'
import { categoryBySlug } from '@/lib/categories'

/** Standard article teaser. Used by hubs, RelatedPosts, and the homepage. */
export default function ArticleCard({ article, showCategory = true }) {
  const category = categoryBySlug[article.category]

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md focus-within:shadow-md">
      {showCategory && category && (
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-pool-600">
          {category.label}
        </p>
      )}

      <h3 className="text-lg font-bold leading-snug text-pool-900">
        <Link href={article.href} className="after:absolute after:inset-0 group-hover:underline">
          {article.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-slate-600">
        {article.metaDescription}
      </p>

      <p className="mt-4 text-xs text-slate-500">
        Updated{' '}
        <time dateTime={article.dateModified}>{formatDate(article.dateModified)}</time>
        {article.readingTime ? ` · ${article.readingTime} min read` : null}
      </p>
    </article>
  )
}

export function formatDate(iso) {
  if (!iso) return ''
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
