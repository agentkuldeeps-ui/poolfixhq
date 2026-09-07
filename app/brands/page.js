import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import AnswerBlock from '@/components/AnswerBlock'
import { compatBrands } from '@/lib/taxonomy'
import { getLiveArticles } from '@/lib/content'
import { breadcrumbSchema } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Shop Pool Parts by Brand System',
  description:
    'Replacement cells, cartridges and parts have to match the equipment already on your pad. Reviews grouped by brand system.',
  path: '/brands',
})

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Brands', href: '/brands' },
]

export default function BrandsPage() {
  const live = getLiveArticles()

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader
        eyebrow="Brands"
        title="Shop by Brand System"
        description="Most parts decisions are made for you by whatever is already installed."
      >
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        <div className="mx-auto max-w-3xl">
          <AnswerBlock answer="Replacement salt cells, filter cartridges and pump parts are largely brand-specific. Check the badge on the equipment housing first, because it eliminates most of the market before you start comparing anything." />
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {compatBrands.map((b) => {
            const count = live.filter((a) =>
              (a.products ?? []).some((p) => p.compat === b.slug),
            ).length

            return (
              <li key={b.slug}>
                <Link
                  href={`/brands/${b.slug}`}
                  className="card group flex items-center justify-between gap-3 px-5 py-4"
                >
                  <span className="text-lg font-bold text-pool-900 group-hover:underline">
                    {b.label}
                  </span>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {count ? `${count} review${count === 1 ? '' : 's'}` : 'soon'}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
