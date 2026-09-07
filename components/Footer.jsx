import Link from 'next/link'
import { categories, reviewIndexes } from '@/lib/categories'
import { site } from '@/lib/site'

const legal = [
  { href: '/about', label: 'About' },
  { href: '/editorial-policy', label: 'How We Evaluate' },
  { href: '/affiliate-disclosure', label: 'Affiliate Disclosure' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
]

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="container-page py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <p className="text-lg font-extrabold tracking-tight text-pool-900">
              PoolFix<span className="text-pool-600">HQ</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">{site.tagline}</p>
          </div>

          {/* Thirteen categories need two columns or the footer becomes a wall. */}
          <nav aria-label="Categories" className="sm:col-span-2">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-pool-800">
              Categories
            </p>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="text-slate-600 hover:text-pool-700 hover:underline"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Reviews">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-pool-800">Reviews</p>
            <ul className="space-y-2 text-sm">
              {reviewIndexes.map((i) => (
                <li key={i.slug}>
                  <Link
                    href={`/product-reviews/${i.slug}`}
                    className="text-slate-600 hover:text-pool-700 hover:underline"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/tools" className="text-slate-600 hover:text-pool-700 hover:underline">
                  Calculators
                </Link>
              </li>
            </ul>
          </nav>

          <div className="space-y-8">
            <nav aria-label="Site information">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-pool-800">Site</p>
              <ul className="space-y-2 text-sm">
                {legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-slate-600 hover:text-pool-700 hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href="/feed.xml" className="text-slate-600 hover:text-pool-700 hover:underline">
                    RSS Feed
                  </a>
                </li>
              </ul>
            </nav>

            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-pool-800">
                Need a Pro?
              </p>
              <p className="text-sm leading-relaxed text-slate-600">
                Some jobs are not worth doing yourself. We will connect you with licensed local
                techs.
              </p>
              <Link
                href="/pool-repair"
                className="mt-4 inline-block rounded-lg bg-accent-700 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-800"
              >
                Get Repair Quotes
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-xs leading-relaxed text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="mt-2 max-w-3xl">
            {site.name} is a participant in the Amazon Services LLC Associates Program, an affiliate
            advertising program designed to provide a means for sites to earn advertising fees by
            advertising and linking to Amazon.com. As an Amazon Associate we earn from qualifying
            purchases. Information here is general guidance, not a substitute for a licensed
            professional, and chemical dosing should always follow the product label.
          </p>
        </div>
      </div>
    </footer>
  )
}
