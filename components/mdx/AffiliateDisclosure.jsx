import Link from 'next/link'

/**
 * The disclosure that must appear ABOVE the first affiliate link on a page.
 *
 * This is not optional and it is not a footer job. The Associates operating
 * agreement requires the disclosure to be proximate to the links, and the FTC
 * requires it to be clear and conspicuous -- meaning a reader encounters it
 * before the link, not after scrolling past it.
 *
 * lib/frontmatter.js FAILS THE BUILD if a page contains an Amazon link and
 * never renders this component. That is why it is a hard failure rather than
 * a warning: a page that ships without it is a compliance problem, not a
 * style problem.
 *
 * The wording deliberately says what we get AND what the reader does not pay.
 * "We may earn a commission" alone tends to read as a hedge; naming that the
 * price is unchanged is what actually addresses the reader's question.
 */
export default function AffiliateDisclosure({ compact = false }) {
  if (compact) {
    return (
      <p className="text-xs leading-relaxed text-slate-500">
        We earn a commission if you buy through our links, at no extra cost to you.{' '}
        <Link href="/affiliate-disclosure" className="underline hover:text-pool-700">
          How this works
        </Link>
        .
      </p>
    )
  }

  return (
    <aside
      aria-label="Affiliate disclosure"
      className="my-6 flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 16v-5M12 8h.01" />
      </svg>
      <p className="text-[13.5px] leading-relaxed text-slate-600">
        <strong className="font-semibold text-slate-800">Disclosure:</strong> some links on this
        page are affiliate links. If you buy through one we earn a commission, at no extra cost to
        you. It does not change what we recommend &mdash; we regularly point readers at the cheaper
        option, or at not buying anything.{' '}
        <Link href="/affiliate-disclosure" className="link-inline">
          Full disclosure
        </Link>
        .
      </p>
    </aside>
  )
}
