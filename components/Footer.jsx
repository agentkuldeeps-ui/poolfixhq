import Link from 'next/link'
import { categories, reviewIndexes } from '@/lib/taxonomy'
import { site } from '@/lib/site'

const TRUST = [
  { href: '/how-we-test', label: 'How We Evaluate' },
  { href: '/team', label: 'Who Writes These' },
  { href: '/about', label: 'About' },
  { href: '/editorial-policy', label: 'Editorial Policy' },
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
            <a
              href="/feed.xml"
              className="mt-4 inline-block text-sm text-slate-500 hover:text-pool-700 hover:underline"
            >
              RSS feed
            </a>
          </div>

          {/* Thirteen categories need two columns or the footer becomes a wall. */}
          <nav aria-label="Categories" className="sm:col-span-2">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-pool-800">
              Categories
            </p>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="text-slate-600 hover:text-pool-700 hover:underline">
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
                  <Link href={`/reviews/${i.slug}`} className="text-slate-600 hover:text-pool-700 hover:underline">
                    {i.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/brands" className="text-slate-600 hover:text-pool-700 hover:underline">
                  Shop by Brand
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Trust and policies">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-pool-800">Trust</p>
            <ul className="space-y-2 text-sm">
              {TRUST.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-600 hover:text-pool-700 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 space-y-2 border-t border-slate-200 pt-6 text-xs leading-relaxed text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          {/* Required by the Associates operating agreement. The near-identical
              wording is deliberate -- Amazon specifies it. Do not paraphrase. */}
          <p className="max-w-3xl">
            {site.name} is a participant in the Amazon Services LLC Associates Program, an
            affiliate advertising program designed to provide a means for sites to earn advertising
            fees by advertising and linking to Amazon.com. As an Amazon Associate we earn from
            qualifying purchases.
          </p>
          <p className="max-w-3xl">
            Information here is general guidance and not a substitute for a licensed professional.
            Always follow the product label for chemical handling and dosing; where this site and a
            product label disagree, the label is correct.
          </p>
        </div>
      </div>
    </footer>
  )
}
