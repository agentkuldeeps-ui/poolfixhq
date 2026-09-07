/**
 * The 13 product categories.
 *
 * `dir` maps 1:1 to a folder under /content and to a top-level route segment.
 * Adding a category means adding a folder, an entry here, and an app/<route>/
 * directory -- the same contract the editorial taxonomy used before the
 * conversion to product reviews.
 *
 * `subcategories` drive the "Which type do you need?" decision box and the
 * subcategory blocks on each category page. A review may set `subcategory` in
 * frontmatter to any slug listed here for its category; frontmatter validation
 * rejects anything else, so a typo cannot silently create an orphan section.
 *
 * `navGroup` groups categories in the header dropdown -- thirteen items is too
 * many for a flat menu.
 *
 * `chemical: true` marks categories where the label-literal rules bite hardest:
 * dosing comes from the product label, never from a listing, and hazmat
 * shipping limits are noted as availability, never as stock or price.
 * See CLAUDE.md.
 */
export const categories = [
  {
    slug: 'pool-cleaners',
    dir: 'pool-cleaners',
    label: 'Pool Cleaners',
    navGroup: 'Equipment',
    title: 'Pool Cleaners',
    heading: 'Robotic, Suction and Pressure Pool Cleaners',
    description:
      'The three types fail differently and suit different pools. Work out which one your pool actually wants before you compare models.',
    metaDescription:
      'Pool cleaner reviews and comparisons: robotic, suction-side and pressure-side. Which type fits your pool, and the models worth the money.',
    subcategories: [
      { slug: 'robotic-inground', label: 'Robotic (inground)' },
      { slug: 'robotic-above-ground', label: 'Robotic (above-ground)' },
      { slug: 'suction-side', label: 'Suction-side' },
      { slug: 'pressure-side', label: 'Pressure-side' },
      { slug: 'cordless-handheld', label: 'Cordless handheld vacuums' },
      { slug: 'manual-vacuum', label: 'Manual vacuum heads & hoses' },
    ],
  },
  {
    slug: 'pool-pumps',
    dir: 'pool-pumps',
    label: 'Pool Pumps',
    navGroup: 'Equipment',
    title: 'Pool Pumps',
    heading: 'Variable-Speed, Single-Speed and Replacement Pumps',
    description:
      'Flow rate matters more than horsepower, and an oversized pump costs you twice. Sizing first, models second.',
    metaDescription:
      'Pool pump reviews: variable-speed, single-speed and above-ground. How to size a pump to your filter, and which models are worth it.',
    subcategories: [
      { slug: 'variable-speed', label: 'Variable-speed pumps' },
      { slug: 'single-dual-speed', label: 'Single & dual-speed pumps' },
      { slug: 'above-ground-pumps', label: 'Above-ground pumps' },
      { slug: 'replacement-motors', label: 'Replacement motors' },
      { slug: 'pump-parts', label: 'Pump parts (lids, o-rings, baskets, seals)' },
    ],
  },
  {
    slug: 'chlorine-shock',
    dir: 'chlorine-shock',
    label: 'Chlorine & Shock',
    navGroup: 'Chemicals',
    chemical: true,
    title: 'Chlorine & Shock',
    heading: 'Tabs, Shock and Liquid Chlorine',
    description:
      'Available chlorine, and what each product does to your stabilizer level, are the two numbers that decide this. Both are on the label.',
    metaDescription:
      'Pool chlorine and shock reviews: trichlor tabs, cal-hypo, dichlor, liquid chlorine and non-chlorine shock. Available chlorine and CYA impact compared.',
    subcategories: [
      { slug: 'trichlor-tabs', label: 'Trichlor tablets' },
      { slug: 'cal-hypo-shock', label: 'Cal-hypo shock' },
      { slug: 'dichlor', label: 'Dichlor' },
      { slug: 'liquid-chlorine', label: 'Liquid chlorine' },
      { slug: 'non-chlorine-shock', label: 'Non-chlorine shock (MPS)' },
    ],
  },
  {
    slug: 'test-kits',
    dir: 'test-kits',
    label: 'Test Kits & Monitors',
    navGroup: 'Chemicals',
    title: 'Test Kits & Monitors',
    heading: 'Drop Kits, Strips and Digital Testers',
    description:
      'Every dosing decision starts with a number you measured. The kit that produces it is among the cheapest things you will buy and the most consequential.',
    metaDescription:
      'Pool test kit reviews: drop kits, test strips, digital photometers and smart monitors. Which testing method is accurate enough for what.',
    subcategories: [
      { slug: 'drop-test-kits', label: 'Drop test kits' },
      { slug: 'test-strips', label: 'Test strips' },
      { slug: 'digital-photometers', label: 'Digital photometers' },
      { slug: 'smart-monitors', label: 'Smart floating monitors' },
      { slug: 'salt-testers', label: 'Salt testers' },
    ],
  },
  {
    slug: 'pool-filters',
    dir: 'pool-filters',
    label: 'Pool Filters',
    navGroup: 'Equipment',
    title: 'Pool Filters',
    heading: 'Cartridge, Sand and DE Filters',
    description:
      'Filter area has to match the pump, not the pool. Get that pairing wrong and pressure reads high the day it is installed.',
    metaDescription:
      'Pool filter reviews: cartridge, sand and DE. How to match filter area to your pump, plus replacement cartridges, media and gauges.',
    subcategories: [
      { slug: 'cartridge-filters', label: 'Cartridge filters' },
      { slug: 'sand-filters', label: 'Sand filters' },
      { slug: 'de-filters', label: 'DE filters' },
      { slug: 'replacement-cartridges', label: 'Replacement cartridges' },
      { slug: 'filter-media', label: 'Filter media (sand, glass, DE, zeolite)' },
      { slug: 'pressure-gauges', label: 'Pressure gauges' },
    ],
  },
  {
    slug: 'salt-systems',
    dir: 'salt-systems',
    label: 'Salt Systems',
    navGroup: 'Equipment',
    title: 'Salt Systems & Chlorinators',
    heading: 'Salt Chlorine Generators, Cells and Feeders',
    description:
      'A salt system is a chlorine generator, not a chlorine alternative. Cell size and expected cell life are what separate the models.',
    metaDescription:
      'Salt chlorine generator reviews, replacement salt cells, tab feeders and pool salt. Cell sizing, expected life, and what the error lights mean.',
    subcategories: [
      { slug: 'salt-chlorine-generators', label: 'Salt chlorine generators' },
      { slug: 'replacement-cells', label: 'Replacement salt cells' },
      { slug: 'tab-feeders', label: 'Inline & offline tab feeders' },
      { slug: 'floating-dispensers', label: 'Floating dispensers' },
      { slug: 'pool-salt', label: 'Pool salt' },
    ],
  },
  {
    slug: 'algaecides-treatments',
    dir: 'algaecides-treatments',
    label: 'Algaecides & Treatments',
    navGroup: 'Chemicals',
    chemical: true,
    title: 'Algaecides & Water Treatments',
    heading: 'Algaecides, Clarifiers, Flocculants and Stain Removers',
    description:
      'Most of these are the second step, not the first. Sanitizer and filtration do the work; these fix what those two cannot reach.',
    metaDescription:
      'Pool algaecide, clarifier, flocculant, phosphate remover and stain remover reviews. What each one actually does, and when it is the wrong product.',
    subcategories: [
      { slug: 'algaecides', label: 'Algaecides (poly-quat, copper)' },
      { slug: 'clarifiers', label: 'Clarifiers' },
      { slug: 'flocculants', label: 'Flocculants' },
      { slug: 'phosphate-removers', label: 'Phosphate removers' },
      { slug: 'enzymes', label: 'Enzymes' },
      { slug: 'sequestrants', label: 'Metal sequestrants' },
      { slug: 'stain-removers', label: 'Stain removers' },
    ],
  },
]

categories.push(
  {
    slug: 'pool-balancers',
    dir: 'pool-balancers',
    label: 'Balancers',
    navGroup: 'Chemicals',
    chemical: true,
    title: 'Pool Balancers',
    heading: 'pH, Alkalinity, Stabilizer and Calcium',
    description:
      'Balancers are commodity chemicals sold at wildly different cost per pound of active ingredient. That comparison is most of what a review can honestly tell you.',
    metaDescription:
      'Pool balancer reviews: pH up and down, alkalinity increaser, cyanuric acid stabilizer and calcium hardness increaser, compared by active ingredient.',
    subcategories: [
      { slug: 'ph-adjusters', label: 'pH up & pH down' },
      { slug: 'alkalinity-increaser', label: 'Alkalinity increaser' },
      { slug: 'cyanuric-acid', label: 'Cyanuric acid (stabilizer)' },
      { slug: 'calcium-hardness', label: 'Calcium hardness increaser' },
      { slug: 'acid-alternatives', label: 'Muriatic acid alternatives' },
    ],
  },
  {
    slug: 'pool-covers',
    dir: 'pool-covers',
    label: 'Covers & Reels',
    navGroup: 'Gear & Seasonal',
    title: 'Pool Covers & Reels',
    heading: 'Winter, Safety and Solar Covers',
    description:
      'A safety cover and a winter cover are different products with different jobs, and only one of them is rated to hold weight.',
    metaDescription:
      'Pool cover reviews: winter covers, safety covers, solar covers, reels, leaf nets and cover pumps. Which type your pool and climate need.',
    subcategories: [
      { slug: 'winter-covers', label: 'Winter covers' },
      { slug: 'safety-covers', label: 'Safety covers' },
      { slug: 'solar-covers', label: 'Solar covers' },
      { slug: 'cover-reels', label: 'Cover reels' },
      { slug: 'leaf-nets', label: 'Leaf nets' },
      { slug: 'cover-pumps', label: 'Cover pumps' },
    ],
  },
  {
    slug: 'pool-heaters',
    dir: 'pool-heaters',
    label: 'Heaters',
    navGroup: 'Equipment',
    title: 'Pool Heaters & Heating',
    heading: 'Gas Heaters, Heat Pumps and Solar',
    description:
      'The three technologies have completely different running costs and completely different climates where they make sense.',
    metaDescription:
      'Pool heater reviews: gas heaters, heat pumps, solar heaters and solar covers. BTU sizing, running cost, and which suits your climate.',
    subcategories: [
      { slug: 'gas-heaters', label: 'Gas heaters' },
      { slug: 'heat-pumps', label: 'Heat pumps' },
      { slug: 'solar-heaters', label: 'Solar heaters' },
      { slug: 'solar-covers-rings', label: 'Solar covers & rings' },
      { slug: 'above-ground-heaters', label: 'Above-ground heaters' },
    ],
  },
  {
    slug: 'winterizing',
    dir: 'winterizing',
    label: 'Winterizing & Opening',
    navGroup: 'Gear & Seasonal',
    chemical: true,
    title: 'Winterizing & Opening',
    heading: 'Closing Kits, Antifreeze, Plugs and Start-Up Chemicals',
    description:
      'Freeze damage is the most expensive failure a pool can have and the most preventable. What you need depends entirely on how hard your winter gets.',
    metaDescription:
      'Pool winterizing and opening product reviews: winter chemical kits, antifreeze, air pillows, plugs, gizmos and start-up chemicals.',
    subcategories: [
      { slug: 'winter-chem-kits', label: 'Winter chemical kits' },
      { slug: 'pool-antifreeze', label: 'Pool antifreeze' },
      { slug: 'air-pillows', label: 'Air pillows' },
      { slug: 'plugs-gizmos', label: 'Winter plugs & gizmos' },
      { slug: 'opening-kits', label: 'Opening kits' },
      { slug: 'start-up-chems', label: 'Start-up chemicals' },
    ],
  },
  {
    slug: 'cleaning-tools',
    dir: 'cleaning-tools',
    label: 'Cleaning Tools',
    navGroup: 'Gear & Seasonal',
    title: 'Pool Cleaning Tools',
    heading: 'Poles, Nets, Brushes and Waterline Cleaners',
    description:
      'The cheapest category on the site, and the one where buying twice is most common. Pole and brush choice is decided by your pool surface.',
    metaDescription:
      'Pool cleaning tool reviews: telescopic poles, skimmer nets, brushes, leaf rakes, tile and waterline cleaners, matched to your pool surface.',
    subcategories: [
      { slug: 'telescopic-poles', label: 'Telescopic poles' },
      { slug: 'skimmer-nets', label: 'Skimmer nets' },
      { slug: 'brushes', label: 'Brushes (nylon & stainless)' },
      { slug: 'leaf-rakes', label: 'Leaf rakes' },
      { slug: 'waterline-cleaners', label: 'Tile & waterline cleaners' },
      { slug: 'pumice', label: 'Pumice' },
    ],
  },
  {
    slug: 'above-ground',
    dir: 'above-ground',
    label: 'Above-Ground Pools',
    navGroup: 'Gear & Seasonal',
    title: 'Above-Ground Pools & Parts',
    heading: 'Pool Sets, Ladders, Liners and Replacement Parts',
    description:
      'Above-ground kits ship with undersized pumps and filters more often than not. The upgrade path matters more than the kit.',
    metaDescription:
      'Above-ground pool reviews: Intex and Bestway sets, ladders, steps, liners and replacement pumps and filters for above-ground kits.',
    subcategories: [
      { slug: 'pool-sets', label: 'Pool sets (Intex, Bestway)' },
      { slug: 'ladders-steps', label: 'Ladders & steps' },
      { slug: 'liners', label: 'Liners' },
      { slug: 'ag-pumps-filters', label: 'Replacement pumps & filters' },
      { slug: 'skimmer-attachments', label: 'Skimmer attachments' },
    ],
  }
)

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))
export const categorySlugs = categories.map((c) => c.slug)

/** Header dropdown order. Every category belongs to exactly one group. */
export const navGroups = ['Equipment', 'Chemicals', 'Gear & Seasonal']

export const categoriesByNavGroup = navGroups.map((group) => ({
  group,
  items: categories.filter((c) => c.navGroup === group),
}))

/**
 * Retained for call sites that used the old editorial split. Every product
 * category is an article hub now, so this is simply `categories`.
 */
export const articleCategories = categories

export function subcategoriesFor(slug) {
  return categoryBySlug[slug]?.subcategories ?? []
}

export function isValidSubcategory(categorySlug, subSlug) {
  return subcategoriesFor(categorySlug).some((s) => s.slug === subSlug)
}

/* ------------------------------------------------------------------------ */
/* Cross-cut tag vocabulary.                                                */
/*                                                                          */
/* These drive the "Your pool" filter bar on every comparison table.        */
/* Frontmatter validation rejects any value not listed here, so a filter    */
/* can never silently match nothing.                                        */
/* ------------------------------------------------------------------------ */

/** Brand systems. Owners buy cells, cartridges and parts inside their brand. */
export const compatBrands = [
  { slug: 'hayward', label: 'Hayward' },
  { slug: 'pentair', label: 'Pentair' },
  { slug: 'jandy', label: 'Jandy' },
  { slug: 'polaris', label: 'Polaris' },
  { slug: 'dolphin', label: 'Dolphin' },
  { slug: 'intex', label: 'Intex' },
  { slug: 'bestway', label: 'Bestway' },
]

export const poolTypes = [
  { slug: 'inground', label: 'In-ground' },
  { slug: 'above-ground', label: 'Above-ground' },
  { slug: 'both', label: 'Either' },
]

export const sanitizers = [
  { slug: 'chlorine', label: 'Chlorine' },
  { slug: 'salt', label: 'Salt' },
  { slug: 'both', label: 'Either' },
]

export const filterTypes = [
  { slug: 'cartridge', label: 'Cartridge' },
  { slug: 'sand', label: 'Sand' },
  { slug: 'de', label: 'DE' },
  { slug: 'any', label: 'Any' },
]

/** Bands match the volume calculator's output so it can hand off directly. */
export const gallonBands = [
  { slug: 'lt10k', label: 'Under 10,000 gal' },
  { slug: '10-20k', label: '10,000-20,000 gal' },
  { slug: '20-35k', label: '20,000-35,000 gal' },
  { slug: '35k+', label: 'Over 35,000 gal' },
  { slug: 'any', label: 'Any size' },
]

/** Volume calculator result -> band, for the "Products sized for this" handoff. */
export function bandForGallons(gallons) {
  if (!Number.isFinite(gallons) || gallons <= 0) return null
  if (gallons < 10000) return 'lt10k'
  if (gallons < 20000) return '10-20k'
  if (gallons < 35000) return '20-35k'
  return '35k+'
}

/** The three global listing pages under /product-reviews. */
export const reviewIndexes = [
  {
    slug: 'best-of',
    label: 'Best Of',
    title: 'Best-Of Roundups',
    description: 'Our top picks in every category, with the comparison tables behind them.',
  },
  {
    slug: 'comparisons',
    label: 'Comparisons',
    title: 'Head-to-Head Comparisons',
    description:
      'Two products, five rounds, one recommendation. For when you have narrowed it to a pair.',
  },
  {
    slug: 'individual-reviews',
    label: 'All Reviews',
    title: 'All Product Reviews',
    description: 'Every individual review on the site, newest first.',
  },
]

export const contentTypes = ['review', 'roundup', 'comparison']
export const priceTiers = ['budget', 'mid', 'premium']
export const badges = ['best-overall', 'best-budget', 'best-premium', 'also-great']
