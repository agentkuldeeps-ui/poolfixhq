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
        <circle cx="12" cy="12" r="9" />
        <path d="M8 13c1.5 1.5 3 1.5 4 0s2.5-1.5 4 0" />
        <path d="M9 9h.01M15 10h.01" />
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
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3m0 12v3M3 12h3m12 0h3M6 6l2 2m8 8l2 2m0-12l-2 2M8 16l-2 2" />
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
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-pool-600"
            >
              {card.icon}
            </svg>
            <h3 className="mt-4 text-lg font-bold text-pool-900 group-hover:underline">
              {card.title}
            </h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{card.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-700">
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
