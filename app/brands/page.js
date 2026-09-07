import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { compatBrands } from '@/lib/categories'
import { getAllArticles } from '@/lib/content'
import { breadcrumbSchema } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Shop by Brand System',
  description:
    'Replacement cells, cartridges and parts have to match the equipment you already own. Reviews grouped by brand system.',
  path: '/brands',
})

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Brands', href: '/brands' },
]

export default function BrandsIndexPage() {
  const all = getAllArticles()

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader
        eyebrow="Brands"
        title="Shop by Brand System"
        description="Most parts decisions are made for you by whatever is already bolted to the equipment pad. Start from the badge on the housing."
      >
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {compatBrands.map((brand) => {
            const count = all.filter((a) =>
              (a.products ?? []).some((p) => p.compat === brand.slug),
            ).length

            return (
              <li key={brand.slug}>
                <Link
                  href={`/brands/${brand.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border-2 border-pool-100 bg-white px-5 py-4 transition-colors hover:border-pool-400 hover:bg-pool-50"
                >
                  <span className="text-lg font-bold text-pool-900 group-hover:underline">
                    {brand.label}
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
