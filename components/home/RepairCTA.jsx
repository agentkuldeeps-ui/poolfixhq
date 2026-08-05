import Link from 'next/link'

/**
 * Lead-gen band. Positioned near the bottom on purpose: a reader who has
 * scrolled this far without finding a DIY answer is the reader most likely to
 * want a phone number.
 */
export default function RepairCTA() {
  return (
    <section aria-labelledby="repair-cta-heading" className="container-page py-12 sm:py-16">
      <div className="overflow-hidden rounded-2xl bg-pool-800 px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr,1fr] lg:items-center">
          <div>
            <h2
              id="repair-cta-heading"
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Some jobs are not worth doing yourself.
            </h2>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-pool-100">
              Gas heaters, cracked plumbing, a pump tripping the breaker. That is licensed work in
              most states, and guessing at it gets expensive fast. Tell us what the pool is doing
              and we will connect you with techs near you.
            </p>
            <Link href="/pool-repair" className="btn-primary mt-6">
              Get Repair Quotes
            </Link>
            <p className="mt-3 text-sm text-pool-200">Free, no obligation.</p>
          </div>

          <ul className="space-y-2.5 text-[15px] text-pool-50">
            {[
              'Water loss you cannot trace',
              'Anything tripping a breaker',
              'Gas heater faults',
              'Cracks in the shell or a lifting deck',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-1 h-4 w-4 shrink-0 text-accent-400"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
