import CategoryHub from '@/components/CategoryHub'
import { categoryBySlug } from '@/lib/categories'
import { buildMetadata } from '@/lib/seo'

const category = categoryBySlug['chemistry']

export const metadata = buildMetadata({
  title: category.title,
  description: category.metaDescription,
  path: '/chemistry',
})

export default function ChemistryHubPage() {
  return <CategoryHub category={category} />
}
