import Link from 'next/link'
import { categoriesByNavGroup } from '@/lib/taxonomy'

/**
 * 404. Deliberately useful rather than decorative: someone landing here
 * followed a link that no longer resolves, and the fastest recovery is a full
 * category map, not a sad-face illustration.
 *
 * Next serves this with a real 404 status, which is what we want -- a soft
 * 404 (200 status on a "not found" page) is a crawl-quality problem.
 */
export default function NotFound() {
  return (
    <div className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mx-auto mb-4">Error 404</p>
        <h1>This page doesn&rsquo;t exist</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          The link may be out of date, or the page may have moved. Everything we publish is one of
          the categories below.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/reviews" className="btn-primary">
            All reviews
          </Link>
          <Link href="/" className="btn-secondary">
            Home
          </Link>
        </div>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categoriesByNavGroup.map(({ group, items }) => (
          <div key={group}>
            <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-widest text-pool-700">
              {group}
            </h2>
            <ul className="mt-3 space-y-1">
              {items.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="block rounded-md px-2 py-1.5 text-[15px] font-medium text-pool-800 hover:bg-pool-50 hover:underline"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
