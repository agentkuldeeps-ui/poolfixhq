import Link from 'next/link'
import { getAuthor, profileLabel } from '@/lib/authors'
import { categoryBySlug } from '@/lib/taxonomy'

function Initials({ name }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
  return (
    <span
      aria-hidden="true"
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-pool-700 text-xl font-extrabold text-white"
    >
      {initials}
    </span>
  )
}

/**
 * "About the author", rendered at the FOOT of every review.
 *
 * The byline at the top answers "who says so" in six words. This answers it
 * properly, at the moment a reader has finished and is deciding whether to
 * act on what they just read.
 *
 * A placeholder author renders nothing at all. There is no honest version of
 * this block for a person who has not been filled in, and a card reading
 * "PoolFixHQ Editorial writes about pools" is worse than an absent one.
 *
 * The photo falls back to initials rather than a stock headshot. A stock
 * photo attached to a named reviewer is a fabricated credential in image
 * form, and it is the single easiest thing for a reader to catch with a
 * reverse image search.
 */
export default function AuthorCard({ slug, className = '' }) {
  const author = getAuthor(slug)
  if (!author || author.placeholder) return null

  const covers = (author.expertise ?? [])
    .map((c) => categoryBySlug[c])
    .filter(Boolean)

  return (
    <section
      aria-labelledby="about-the-author"
      className={`rounded-xl border border-slate-200 bg-slate-50 p-6 ${className}`}
    >
      <p
        id="about-the-author"
        className="mb-4 text-[11px] font-bold uppercase tracking-widest text-pool-600"
      >
        About the author
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        {author.image ? (
          <img
            src={author.image}
            alt={`${author.name}, ${author.role}`}
            width={64}
            height={64}
            loading="lazy"
            className="h-16 w-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <Initials name={author.name} />
        )}

        <div className="min-w-0">
          <p className="text-lg font-bold text-pool-900">
            <Link href={`/authors/${author.slug}`} className="hover:underline">
              {author.name}
            </Link>
          </p>
          {author.role && (
            <p className="text-[14px] font-semibold text-pool-700">{author.role}</p>
          )}

          <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">{author.bio}</p>

          {author.certifications?.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {author.certifications.map((c) => (
                <li
                  key={c.name}
                  className="rounded-full border border-pool-200 bg-white px-3 py-1 text-[12.5px] font-semibold text-pool-800"
                >
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener" className="hover:underline">
                      {c.name}
                    </a>
                  ) : (
                    c.name
                  )}
                  {c.issuer && <span className="font-normal text-slate-500"> · {c.issuer}</span>}
                </li>
              ))}
            </ul>
          )}

          {covers.length > 0 && (
            <p className="mt-3 text-[13.5px] text-slate-500">
              Covers{' '}
              {covers.map((c, i) => (
                <span key={c.slug}>
                  {i > 0 && (i === covers.length - 1 ? ' and ' : ', ')}
                  <Link href={`/${c.slug}`} className="text-pool-700 hover:underline">
                    {c.label.toLowerCase()}
                  </Link>
                </span>
              ))}
              .
            </p>
          )}

          {/* rel="me" is doing real work here, not decoration: it is the
              microformat that declares this link points at the same person,
              and it is half of what makes `sameAs` a verifiable claim rather
              than an assertion. */}
          {author.sameAs?.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[13.5px]">
              {author.sameAs.map((u) => {
                const { network, handle } = profileLabel(u)
                return (
                  <li key={u}>
                    <a
                      href={u}
                      target="_blank"
                      rel="noopener me"
                      className="font-medium text-pool-700 hover:underline"
                    >
                      {network}
                      {handle && <span className="font-normal text-slate-500"> {handle}</span>}
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
