import Link from 'next/link'
import { getAuthor } from '@/lib/authors'

function fmt(date) {
  if (!date) return null
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

/**
 * The byline: who wrote it, who checked it, when it last changed.
 *
 * This is the visible half of E-E-A-T. The structured half is Person schema
 * in lib/schema.js, and both read the same lib/authors.js entry so they
 * cannot contradict each other.
 *
 * A placeholder author renders as plain text with NO link and NO credential
 * claim -- there is nothing true to say yet, so it says nothing rather than
 * inventing authority. Fill in lib/authors.js and this fills in with it.
 *
 * "Last updated" is shown prominently on purpose. For product content,
 * recency is itself a quality signal, and hiding the date is a pattern
 * associated with sites that do not maintain their content.
 */
export default function AuthorByline({ article, className = '' }) {
  const author = getAuthor(article.author)
  const reviewer = article.reviewedBy ? getAuthor(article.reviewedBy) : null
  const updated = fmt(article.dateModified)
  const published = fmt(article.datePublished)
  const wasUpdated = article.dateModified !== article.datePublished

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 ${className}`}>
      {author && (
        <span className="flex items-center gap-2">
          <span className="text-slate-400">By</span>
          {author.placeholder ? (
            <span className="font-semibold text-slate-700">{author.name}</span>
          ) : (
            <Link href={`/authors/${author.slug}`} className="font-semibold text-pool-700 hover:underline">
              {author.name}
            </Link>
          )}
          {author.credential && (
            <span className="text-slate-500">&middot; {author.credential}</span>
          )}
        </span>
      )}

      {reviewer && !reviewer.placeholder && (
        <span className="flex items-center gap-2">
          <span className="text-slate-400">Reviewed by</span>
          <Link href={`/authors/${reviewer.slug}`} className="font-semibold text-pool-700 hover:underline">
            {reviewer.name}
          </Link>
        </span>
      )}

      <span className="flex items-center gap-1.5">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        <span>
          {wasUpdated ? 'Updated' : 'Published'}{' '}
          <time dateTime={article.dateModified}>{updated}</time>
        </span>
      </span>

      {wasUpdated && published && (
        <span className="text-slate-400">
          Originally published <time dateTime={article.datePublished}>{published}</time>
        </span>
      )}

      {article.readingTime && (
        <span className="text-slate-400">{article.readingTime} min read</span>
      )}
    </div>
  )
}
