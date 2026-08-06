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
 *
 * NO PRICE FIELD, deliberately. Amazon prices move constantly and the
 * Associates Operating Agreement restricts displaying prices that aren't
 * current. A hardcoded price is stale within days and is a compliance problem,
 * not just an accuracy one. Prices belong in prose as ranges ("under $30"), or
 * come from the Product Advertising API if we ever wire it up.
 *
 * asin: null means the product is identified but its ASIN has not been
 * verified. The build warns, the card renders without a buy link rather than
 * linking somewhere wrong. Never guess an ASIN -- a wrong one sends readers to
 * an unrelated product and earns nothing.
 */

export const products = [
  {
    id: 'taylor-k2006',
    asin: null, // NEEDS ASIN
    title: 'Taylor K-2006 FAS-DPD Test Kit',
    image: '/products/placeholder.svg',
    features: [
      'Reads free and combined chlorine separately by titration',
      'Also covers pH, total alkalinity, calcium hardness and cyanuric acid',
      'Reagents are replaceable individually rather than by whole kit',
    ],
    bestFor: 'Anyone troubleshooting rather than spot-checking. The FAS-DPD titration is what separates free from combined chlorine.',
    category: 'test-kits',
    badge: 'Best Overall',
  },
  {
    id: 'cal-hypo-shock',
    asin: null, // NEEDS ASIN
    title: 'Calcium Hypochlorite Pool Shock (73%)',
    image: '/products/placeholder.svg',
    features: [
      'Roughly 73% available chlorine by weight',
      'Adds no cyanuric acid, unlike dichlor or trichlor',
      'Raises calcium hardness as a side effect',
    ],
    bestFor: 'Clearing an algae bloom when liquid chlorine is hard to get. Ships far better than liquid.',
    category: 'chemicals',
  },
  {
    id: 'stainless-algae-brush',
    asin: null, // NEEDS ASIN
    title: 'Stainless Steel Pool Algae Brush',
    image: '/products/placeholder.svg',
    features: [
      'Stainless bristles for plaster, gunite and concrete',
      'Not for vinyl or fiberglass -- stainless will damage both',
      'Standard threaded collar fits a telescoping pole',
    ],
    bestFor: 'Breaking the protective cap off algae on plaster so chlorine can actually reach it.',
    category: 'tools',
  },
  {
    id: 'pool-flocculant',
    asin: null, // NEEDS ASIN
    title: 'Pool Flocculant (Drop-Out Clarifier)',
    image: '/products/placeholder.svg',
    features: [
      'Clumps suspended particulate and sinks it to the floor',
      'Requires vacuuming to waste, not through the filter',
      'Costs a significant volume of water to use properly',
    ],
    bestFor: 'Opaque water only. For an ordinary green pool, brushing and filtration get there for less money.',
    category: 'chemicals',
  },
]

/** Products identified but still missing a verified ASIN. */
export const productsMissingAsin = products.filter((p) => !p.asin).map((p) => p.id)

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
