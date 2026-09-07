import CategoryHub from '@/components/CategoryHub'
import { categoryBySlug } from '@/lib/taxonomy'
import { buildMetadata } from '@/lib/seo'

const category = categoryBySlug['salt-systems']

export const metadata = buildMetadata({
  title: category.title,
  description: category.metaDescription,
  path: '/salt-systems',
})

export default function Page() {
  return <CategoryHub category={category} />
}
