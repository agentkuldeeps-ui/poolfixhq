import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { tools } from '@/lib/tools'
import { breadcrumbSchema } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Pool Calculators',
  description:
    'Free pool calculators: volume in gallons, chlorine dosage, and salt. Get the number before you pour anything in.',
  path: '/tools',
})

export default function ToolsIndexPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Calculators', href: '/tools' },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader
        eyebrow="Tools"
        title="Pool Calculators"
        description="Dosing is arithmetic, and most people guess. Do not guess."
      >
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tools/${tool.slug}`}
                className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <h2 className="text-lg font-bold text-pool-900 group-hover:underline">
                  {tool.title}
                </h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">
                  {tool.summary}
                </p>
                {tool.status === 'planned' && (
                  <span className="mt-4 inline-block w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    In development
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
