import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { breadcrumbSchema } from '@/lib/schema'

/** Shell for the static prose pages: about, policies, legal. */
export default function ProsePage({ title, description, path, updated, children }) {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: title, href: path },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader title={title} description={description}>
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        <div className="prose prose-slate mx-auto w-full max-w-3xl">
          {updated && (
            <p className="text-sm text-slate-500">
              Last updated <time dateTime={updated}>{updated}</time>
            </p>
          )}
          {children}
        </div>
      </div>
    </>
  )
}
