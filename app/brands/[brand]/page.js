import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { compatBrands } from '@/lib/taxonomy'
import { getLiveArticles } from '@/lib/content'
import { breadcrumbSchema } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return compatBrands.map((b) => ({ brand: b.slug }))
}

const find = (slug) => compatBrands.find((b) => b.slug === slug)

export function generateMetadata({ params }) {
  const brand = find(params.brand)
  if (!brand) return {}
  return buildMetadata({
    title: `${brand.label} Pool Equipment & Parts`,
    description: `Reviews of ${brand.label} pool equipment and replacement parts, plus the compatible alternatives worth considering.`,
    path: `/brands/${brand.slug}`,
  })
}

export default function BrandPage({ params }) {
  const brand = find(params.brand)
  if (!brand) notFound()

  const articles = getLiveArticles().filter((a) =>
    (a.products ?? []).some((p) => p.compat === brand.slug),
  )

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Brands', href: '/brands' },
    { name: brand.label, href: `/brands/${brand.slug}` },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader
        eyebrow="Brand system"
        title={`${brand.label} Pool Equipment & Parts`}
        description={`Everything we have reviewed that fits a ${brand.label} system, plus compatible alternatives where one is genuinely worth considering.`}
      >
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        {articles.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={`${a.category}/${a.slug}`}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <p className="text-slate-600">Nothing reviewed for {brand.label} yet.</p>
            <Link href="/reviews" className="mt-4 inline-block text-sm font-semibold text-accent-700 hover:underline">
              Browse all reviews &rarr;
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
