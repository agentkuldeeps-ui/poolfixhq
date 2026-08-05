import ProblemCards from '@/components/ProblemCards'

/**
 * Above the fold on a phone: the question, one line of context, and four taps
 * to the four things that are actually wrong with most pools. Nothing else
 * competes for that space -- no carousel, no hero photo, no email popup.
 *
 * The wave is inline SVG: zero requests, zero layout shift, scales free.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pool-100 via-pool-50 to-pool-50">
      <div className="container-page relative py-8 sm:py-16 lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex sm:mb-4 items-center gap-2 rounded-full border border-pool-200 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-pool-700">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-600" />
            Diagnose first, buy second
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-pool-900 sm:text-5xl lg:text-6xl">
            What&rsquo;s Wrong With Your Pool?
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-xl">
            Pick the symptom. We will tell you what is actually causing it, what the fix costs, and
            whether it is worth doing yourself — written by people who do this for a living, not by
            the store that wants to sell you chemicals.
          </p>
        </div>

        <div className="mt-6 sm:mt-10">
          <h2 className="sr-only">Start with your symptom</h2>
          <ProblemCards />
        </div>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="block h-8 w-full text-white sm:h-10"
      >
        <path
          fill="currentColor"
          d="M0 32c120-21 240-21 360 0s240 21 360 0 240-21 360 0 240 21 360 0v28H0z"
        />
      </svg>
    </section>
  )
}
