import { site } from '@/lib/site'

/**
 * The only component that may emit an outbound Amazon link.
 *
 * Centralised so the four things that must be true of EVERY affiliate link
 * are true structurally rather than by discipline:
 *
 *   1. the Associates tag is appended -- an untagged link earns nothing
 *   2. rel="sponsored nofollow noopener" -- sponsored is what Google asks for
 *      on paid/affiliate links, noopener is a security requirement of
 *      target="_blank"
 *   3. target="_blank" so we do not lose the reader's place in the review
 *   4. no price, ever. The label says "Check price on Amazon" precisely
 *      because the price lives on Amazon and nowhere on this site.
 *
 * scripts/check-compliance.mjs re-checks all of this against the rendered
 * HTML, so a hand-written <a> that bypasses this component fails the build.
 *
 * Shorteners are rejected outright: link cloaking is against the operating
 * agreement, and amzn.to hides the destination from the reader.
 */
function buildUrl({ asin, url }) {
  if (url && /amzn\.to|bit\.ly|tinyurl/i.test(url)) {
    throw new Error(
      `[AffiliateButton] shortened affiliate URL "${url}" -- link cloaking is not permitted. Use the full amazon.com URL or an ASIN.`,
    )
  }

  const target = url || (asin ? `https://www.amazon.com/dp/${asin}` : null)
  if (!target) return null

  const u = new URL(target)
  // Overwrite rather than append: a URL copied from a browser can already
  // carry someone else's tag.
  u.searchParams.set('tag', site.amazonTag)
  return u.toString()
}

export default function AffiliateButton({
  asin,
  url,
  name,
  label = 'Check price on Amazon',
  variant = 'primary',
  className = '',
}) {
  const href = buildUrl({ asin, url })

  // A product whose ASIN is not confirmed yet renders as disabled text rather
  // than a broken link. Better an obvious gap than a dead button.
  if (!href) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 py-3 text-base font-semibold text-slate-400 ${className}`}
      >
        Link pending
      </span>
    )
  }

  const styles =
    variant === 'secondary'
      ? 'border-2 border-accent-700 bg-white text-accent-700 hover:bg-accent-50'
      : 'bg-accent-700 text-white hover:bg-accent-800'

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold transition-colors ${styles} ${className}`}
    >
      {label}
      {name && <span className="sr-only"> &mdash; {name}</span>}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M8 7h9v9" />
      </svg>
    </a>
  )
}
