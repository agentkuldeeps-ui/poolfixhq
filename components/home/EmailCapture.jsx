import { features } from '@/lib/site'

/**
 * Newsletter signup.
 *
 * GATED OFF by `features.emailCapture` in lib/site.js. A form that silently
 * eats addresses costs more trust than no form at all, so this renders nothing
 * until it works.
 *
 * To ship it:
 *   1. Pick a provider (ConvertKit, Buttondown, Resend + your own list).
 *   2. Add a POST handler at app/api/subscribe/route.js.
 *   3. Set action/method below and drop the `disabled`.
 *   4. Flip features.emailCapture to true in lib/site.js.
 *
 * The honeypot field is already here. Keep it.
 */
export default function EmailCapture() {
  if (!features.emailCapture) return null

  return (
    <section aria-labelledby="email-heading" className="border-y border-slate-200 bg-white">
      <div className="container-page py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="email-heading"
            className="text-2xl font-bold tracking-tight text-pool-900 sm:text-3xl"
          >
            One email a month, at the start of the season that matters
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            What to do this month, what breaks next month, and the fix that costs eight dollars
            instead of four hundred. No daily blasts.
          </p>

          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <label htmlFor="subscriber-email" className="sr-only">
              Email address
            </label>
            <input
              id="subscriber-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-pool-600"
            />
            <button type="submit" className="btn-primary shrink-0" disabled>
              Subscribe
            </button>
          </form>

          <p className="mt-3 text-xs text-slate-500">
            Unsubscribe any time. We never sell your address.
          </p>
        </div>
      </div>
    </section>
  )
}
