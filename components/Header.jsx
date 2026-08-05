import Link from 'next/link'
import { categories } from '@/lib/categories'

/**
 * Sticky site header. Deliberately CSS-only -- no JS, no client component, no
 * hydration cost. The mobile menu is a <details> element, which is keyboard
 * accessible and works with JS disabled.
 */
export default function Header() {
  const nav = [
    ...categories.map((c) => ({ href: `/${c.slug}`, label: c.label })),
    { href: '/tools', label: 'Tools' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-pool-800 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-pool-900">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 text-pool-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 16c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" />
            <path d="M2 20c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" />
            <path d="M7 14V5a2 2 0 114 0M13 14V5a2 2 0 114 0" />
          </svg>
          PoolFix<span className="text-pool-600">HQ</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
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

        <Link href="/pool-repair" className="hidden shrink-0 rounded-lg bg-accent-700 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-800 sm:inline-block">
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
            className="absolute right-0 top-12 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
          >
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-md px-3 py-2.5 font-semibold text-slate-700 hover:bg-pool-50">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-slate-100 pt-1">
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
