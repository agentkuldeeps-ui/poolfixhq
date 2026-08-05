import Link from 'next/link'
import { trustPoints } from '@/lib/authors'

/**
 * Credibility band, immediately under the hero.
 *
 * For a new site giving chemical-handling advice, this is the highest-leverage
 * block on the page -- a reader deciding whether to trust a shock dosage does
 * it here, not on /about.
 *
 * Any point flagged `verified: false` renders with a loud PLACEHOLDER tag.
 * That is deliberate: an unverified credibility claim should be impossible to
 * ship by accident. Fill in lib/authors.js and set verified: true.
 */
export default function TrustStrip() {
  return (
    <section aria-label="Why trust this site" className="border-b border-slate-200 bg-white">
      <div className="container-page py-8">
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.label} className="flex gap-3">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-1 h-5 w-5 shrink-0 text-pool-600"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <div>
                <dt className="font-bold text-pool-900">
                  {point.stat}
                  {!point.verified && (
                    <span className="ml-2 rounded bg-accent-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-800">
                      unverified
                    </span>
                  )}
                </dt>
                <dd className="mt-0.5 text-[15px] leading-snug text-slate-600">{point.label}</dd>
              </div>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-sm text-slate-500">
          <Link href="/about" className="link-inline">
            Who writes this
          </Link>{' '}
          ·{' '}
          <Link href="/editorial-policy" className="link-inline">
            How we review and source
          </Link>
        </p>
      </div>
    </section>
  )
}
