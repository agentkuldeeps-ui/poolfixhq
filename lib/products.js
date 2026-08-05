/**
 * SINGLE SOURCE OF TRUTH FOR PRODUCTS.
 *
 * MDX content references products by `id` ONLY:
 *     <ProductBlock id="taylor-k2006" />
 *     <ComparisonTable ids={['taylor-k2006', 'hth-6-way-strips']} />
 *
 * Never put an ASIN, an amazon.com URL, or a product image URL in a content
 * file. If a product needs to change -- new model, dead listing, better pick --
 * it changes here once and every article that references it updates.
 *
 * Shape:
 *   id       string   stable kebab-case key. Never reuse or repurpose.
 *   asin     string   Amazon ASIN. Link is built from this + NEXT_PUBLIC_AMAZON_TAG.
 *   title    string   display name, shown as the block heading
 *   image    string   absolute https URL or a path under /public
 *   features string[] 3-5 short bullets. Specifics, not adjectives.
 *   bestFor  string   one line: who should buy this and why
 *   category string   loose grouping used for filtering, e.g. 'test-kits'
 *   badge    string   optional ribbon, e.g. 'Best Overall'. Omit for most.
 */

export const products = [
  {
    id: 'placeholder-test-kit',
    asin: 'B0000PLACE1',
    title: 'Placeholder Drop-Test Kit',
    image: '/products/placeholder.svg',
    features: [
      'Placeholder feature: measures FC, CC, pH, TA, CH, CYA',
      'Placeholder feature: reagents replaceable individually',
      'Placeholder feature: roughly 100 tests per refill',
    ],
    bestFor: 'Owners who want real numbers instead of a strip color guess.',
    category: 'test-kits',
    badge: 'Best Overall',
  },
  {
    id: 'placeholder-pump',
    asin: 'B0000PLACE2',
    title: 'Placeholder Variable-Speed Pump',
    image: '/products/placeholder.svg',
    features: [
      'Placeholder feature: variable speed, 1.65 THP',
      'Placeholder feature: drop-in replacement for most single-speed pumps',
      'Placeholder feature: qualifies for most utility rebates',
    ],
    bestFor: 'Replacing a dying single-speed pump on an in-ground pool.',
    category: 'pumps',
  },
  {
    id: 'placeholder-robot-cleaner',
    asin: 'B0000PLACE3',
    title: 'Placeholder Robotic Cleaner',
    image: '/products/placeholder.svg',
    features: [
      'Placeholder feature: climbs walls and scrubs the waterline',
      'Placeholder feature: independent of pump and filter',
      'Placeholder feature: top-load filter basket',
    ],
    bestFor: 'Pools under heavy leaf load where manual vacuuming has gotten old.',
    category: 'cleaners',
    badge: 'Editor Pick',
  },
]

const productsById = Object.fromEntries(products.map((p) => [p.id, p]))

/** Look up one product. Returns undefined for unknown ids -- callers must handle it. */
export function getProduct(id) {
  return productsById[id]
}

/** Look up many, silently dropping unknown ids. Order is preserved. */
export function getProducts(ids = []) {
  return ids.map((id) => productsById[id]).filter(Boolean)
}

/**
 * Build the affiliate URL for a product. The tag comes from the environment so
 * it is never hardcoded in source or content.
 */
export function amazonUrl(product) {
  if (!product?.asin) return null
  const tag = process.env.NEXT_PUBLIC_AMAZON_TAG
  const base = `https://www.amazon.com/dp/${product.asin}`
  return tag ? `${base}?tag=${encodeURIComponent(tag)}` : base
}

/** Ids referenced in content that do not exist here. Used by the build-time check. */
export function unknownProductIds(ids = []) {
  return ids.filter((id) => !productsById[id])
}
