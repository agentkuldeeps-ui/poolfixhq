import Link from 'next/link'

/**
 * How the site makes money, said plainly and above the footer rather than
 * buried in it. FTC disclosure requirements aside, a site that recommends
 * products should say why it recommends them before it recommends any.
 *
 * Keep this copy accurate. If the business model changes, change this first.
 */
export default function TransparencyNote() {
  return (
    <section aria-labelledby="transparency-heading" className="border-t border-slate-200 bg-slate-50">
      <div className="container-page py-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="transparency-heading" className="text-lg font-bold text-pool-900">
            How this site makes money
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
            Some product links earn us a commission, and we get paid when we connect you with a
            repair pro. Neither changes what we recommend or the order it appears in — and when the
            cheap fix beats the expensive product, we say so, even though saying so earns us
            nothing.
          </p>
          <p className="mt-4 text-sm">
            <Link href="/affiliate-disclosure" className="link-inline">
              Affiliate disclosure
            </Link>{' '}
            ·{' '}
            <Link href="/editorial-policy" className="link-inline">
              Editorial policy
            </Link>{' '}
            ·{' '}
            <Link href="/about" className="link-inline">
              About us
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
