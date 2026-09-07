import CategoryHub from '@/components/CategoryHub'
import { categoryBySlug } from '@/lib/taxonomy'
import { buildMetadata } from '@/lib/seo'

const category = categoryBySlug['chlorine-shock']

export const metadata = buildMetadata({
  title: category.title,
  description: category.metaDescription,
  path: '/chlorine-shock',
})

export default function Page() {
  return <CategoryHub category={category} />
}
