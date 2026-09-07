import Link from 'next/link'
import { categoriesByNavGroup, categories } from '@/lib/categories'

/**
 * Sticky site header. Deliberately CSS-only -- no JS, no client component, no
 * hydration cost. Both the category dropdown and the mobile menu are <details>
 * elements, which are keyboard accessible and work with JS disabled.
 *
 * Thirteen categories will not fit a flat bar, so they live behind
 * "Categories" grouped by navGroup. The mobile menu lists them flat under
 * their group headings, because a nested disclosure inside a disclosure is
 * worse than a slightly long menu.
 */
const SECONDARY = [
  { href: '/product-reviews/best-of', label: 'Best Of' },
  { href: '/product-reviews/comparisons', label: 'Comparisons' },
  { href: '/tools', label: 'Calculators' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-pool-800 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-pool-900"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 text-pool-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 16c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" />
            <path d="M2 20c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" />
            <path d="M7 14V5a2 2 0 114 0M13 14V5a2 2 0 114 0" />
          </svg>
          PoolFix<span className="text-pool-600">HQ</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            <li>
              <details className="group/cat relative">
                <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-md px-3 py-2 text-[15px] font-semibold text-slate-700 hover:bg-pool-50 hover:text-pool-800 [&::-webkit-details-marker]:hidden">
                  Categories
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-open/cat:rotate-180" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>

                <div className="absolute left-0 top-11 w-[46rem] rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
                  <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                    {categoriesByNavGroup.map(({ group, items }) => (
                      <div key={group}>
                        <p className="border-b border-slate-100 pb-1.5 text-[11px] font-bold uppercase tracking-widest text-pool-600">
                          {group}
                        </p>
                        <ul className="mt-1.5">
                          {items.map((c) => (
                            <li key={c.slug}>
                              <Link
                                href={`/${c.slug}`}
                                className="block rounded-md px-2 py-1.5 text-[14.5px] font-medium text-slate-700 hover:bg-pool-50 hover:text-pool-800"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/product-reviews"
                    className="mt-3 inline-flex items-center gap-1.5 border-t border-slate-100 pt-3 text-sm font-semibold text-accent-700 hover:underline"
                  >
                    All product reviews
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </details>
            </li>

            {SECONDARY.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-[15px] font-semibold text-slate-700 hover:bg-pool-50 hover:text-pool-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/pool-repair"
          className="hidden shrink-0 rounded-lg bg-accent-700 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-800 sm:inline-block"
        >
          Find a Pro
        </Link>

        <details className="group relative md:hidden">
          <summary
            className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md text-pool-800 hover:bg-pool-50 [&::-webkit-details-marker]:hidden"
            aria-label="Open menu"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" />
              <path d="M6 6l12 12M18 6L6 18" className="hidden group-open:block" />
            </svg>
          </summary>

          <nav
            aria-label="Mobile"
            className="absolute right-0 top-12 max-h-[calc(100vh-5rem)] w-64 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
          >
            {categoriesByNavGroup.map(({ group, items }) => (
              <div key={group} className="mb-1">
                <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-widest text-pool-600">
                  {group}
                </p>
                <ul>
                  {items.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.slug}`}
                        className="block rounded-md px-3 py-2 text-[15px] font-medium text-slate-700 hover:bg-pool-50"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <ul className="mt-1 border-t border-slate-100 pt-1">
              {SECONDARY.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-md px-3 py-2.5 font-semibold text-slate-700 hover:bg-pool-50">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/pool-repair" className="block rounded-md px-3 py-2.5 font-semibold text-accent-700 hover:bg-accent-50">
                  Find a Pro
                </Link>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  )
}

/** Exported for the sitemap and any nav-coverage check. */
export const navCategorySlugs = categories.map((c) => c.slug)
