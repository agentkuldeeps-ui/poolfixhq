import Link from 'next/link'
import { getAuthor } from '@/lib/authors'
import { dimensionsFor } from '@/lib/scoring'
import { categoryBySlug } from '@/lib/taxonomy'

function Tick() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mt-1 h-3.5 w-3.5 shrink-0 text-pool-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

/**
 * "How this review was made" -- the process disclosure under every review.
 *
 * WHY THIS EXISTS.
 *
 * Almost every affiliate review page asserts authority and shows none of its
 * working. This block shows the working: where the facts came from, what the
 * rating was computed from, what was NOT done, and who is accountable. It is
 * the same argument the scorecard makes about the number, applied to the page
 * as a whole.
 *
 * EVERY LINE MUST BE TRUE OF THIS SPECIFIC PAGE, which is why it is built
 * from the article's own data rather than written as boilerplate. If a page
 * has no sources, it does not claim to have any. If it was not scored, it
 * does not mention scoring. A disclosure block that overstates is worse than
 * no disclosure block, because it converts a trust signal into a lie.
 *
 * The "not tested by hand" line is not an apology. Stating plainly what was
 * not done is what makes the rest of it believable, and it is the opposite of
 * what a site with something to hide does.
 */
export default function ReviewColophon({ article, className = '' }) {
  const author = getAuthor(article.author)
  const category = categoryBySlug[article.category]
  const sourceCount = article.sources?.length ?? 0
  const scored = article.scores && Object.keys(article.scores).length > 0
  const dimensionCount = scored ? dimensionsFor(article.category).length : 0

  const points = []

  if (sourceCount > 0) {
    points.push(
      <>
        <strong>Built from primary documentation.</strong> {sourceCount} cited{' '}
        {sourceCount === 1 ? 'source' : 'sources'} — manufacturer manuals, specification
        sheets and warranty documents. Retailer listings are not treated as a source, and
        where a listing and a manual disagreed, the manual was used.
      </>,
    )
  }

  if (scored) {
    points.push(
      <>
        <strong>Scored, not asserted.</strong> Rated against the {dimensionCount} criteria
        published for {category?.label?.toLowerCase() ?? 'this category'} before any product
        was judged against them. The headline rating is computed from that breakdown, and the
        build refuses to publish a page whose stated rating disagrees with its own scores.{' '}
        <Link href="/how-we-test#scoring" className="link-inline">
          See the weights
        </Link>
        .
      </>,
    )
  }

  points.push(
    <>
      <strong>Not tested by hand.</strong> There is no test tank here and no instrumented
      rig. This review is documentary. Where it describes real-world behaviour, that is
      reported by owners and trade professionals and is labelled as such — never presented
      as something measured here.
    </>,
  )

  points.push(
    <>
      <strong>Checked before publishing.</strong> Every factual claim was checked against
      the source cited for it, and the page was checked against{' '}
      <Link href="/editorial-policy" className="link-inline">
        our editorial policy
      </Link>{' '}
      and the affiliate disclosure rules we operate under.
    </>,
  )

  points.push(
    <>
      <strong>AI-assisted, human-accountable.</strong> Research and drafting are AI-assisted
      under the documented process on our{' '}
      <Link href="/team" className="link-inline">
        team page
      </Link>
      . Nothing publishes without the checks above
      {author && !author.placeholder ? (
        <>
          , and {author.name} is accountable for what this page says
        </>
      ) : null}
      .
    </>,
  )

  return (
    <section
      aria-labelledby="how-this-was-made"
      className={`rounded-xl border border-pool-200 bg-pool-50/60 p-6 ${className}`}
    >
      <p
        id="how-this-was-made"
        className="mb-3.5 text-[11px] font-bold uppercase tracking-widest text-pool-600"
      >
        How this review was made
      </p>

      <ul className="space-y-2.5">
        {points.map((p, i) => (
          <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-slate-700">
            <Tick />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
