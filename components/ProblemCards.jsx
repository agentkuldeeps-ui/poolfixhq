import Link from 'next/link'

/**
 * The four homepage diagnosis entry points. This is the primary navigation
 * device on the site: a visitor with a green pool should reach the green pool
 * article in one tap, above the fold, on a phone.
 *
 * Destinations point at /problems/<slug> articles. Update `href` when the
 * corresponding article slug changes.
 */
export const problemCards = [
  {
    href: '/problems/green-pool-water',
    title: 'Green Water',
    description: 'Algae bloom. Chlorine has been at zero longer than you think.',
    icon: (
      <>
        <path d="M12 3.2c3.2 3.9 5.5 6.9 5.5 9.6a5.5 5.5 0 11-11 0c0-2.7 2.3-5.7 5.5-9.6z" />
        <path d="M8.6 13.4c1 .9 2 .9 2.9 0s1.9-.9 2.9 0" />
      </>
    ),
  },
  {
    href: '/problems/cloudy-pool-water',
    title: 'Cloudy Water',
    description: 'Filtration, chemistry, or fine particulate. Three fixes, one order.',
    icon: (
      <>
        <path d="M6 17h11a4 4 0 000-8 6 6 0 00-11.3 2A3.5 3.5 0 006 17z" />
        <path d="M4 20h16" />
      </>
    ),
  },
  {
    href: '/equipment/pump-not-priming',
    title: 'Pump Problems',
    description: 'Losing prime, screaming bearings, or no flow at all.',
    icon: (
      <>
        <circle cx="12" cy="11" r="6.5" />
        <circle cx="12" cy="11" r="1.6" />
        <path d="M12 9.4V4.9M13.4 12l3.9 2.2M10.6 12l-3.9 2.2" />
        <path d="M5 20h14" />
      </>
    ),
  },
  {
    href: '/chemistry/chlorine-basics',
    title: 'Chemistry Off',
    description: 'pH drifting, chlorine that will not hold, stabilizer creep.',
    icon: (
      <>
        <path d="M9 3h6M10 3v6l-5 9a2 2 0 001.7 3h10.6a2 2 0 001.7-3l-5-9V3" />
        <path d="M7.5 15h9" />
      </>
    ),
  },
]

export default function ProblemCards() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {problemCards.map((card) => (
        <li key={card.href}>
          <Link
            href={card.href}
            className="group flex h-full flex-col rounded-xl border-2 border-pool-100 bg-white p-5 transition-colors hover:border-pool-400 hover:bg-pool-50"
          >
            {/* Icon and title share a row on mobile -- shorter cards mean more
                of them clear the fold, which is the whole job of this section.
                Reverts to the stacked layout from sm up. */}
            <div className="flex items-center gap-3 sm:block">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 shrink-0 text-pool-600 sm:h-10 sm:w-10"
              >
                {card.icon}
              </svg>
              <h3 className="text-lg font-bold text-pool-900 group-hover:underline sm:mt-4">
                {card.title}
              </h3>
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600 sm:mt-1.5">{card.description}</p>
            {/* mt-auto on the CTA below keeps every card's link on one baseline
                regardless of how many lines the description runs to. */}
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-accent-700">
              Diagnose it
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
