/**
 * THE TAXONOMY. Categories, subcategories and the cross-cut tags.
 *
 * `dir` maps 1:1 to a folder under /content and to a top-level route segment.
 * Adding a category means: add a folder, add an entry here, add an
 * app/<slug>/ directory. Nothing else.
 *
 * `subcategories` drive the "Which type do you need?" decision box, the
 * on-page section anchors, and frontmatter validation -- a review may only
 * claim a subcategory listed under its own category, so a typo cannot create
 * an orphan section that nothing links to.
 *
 * `buyingCriteria` is the load-bearing field for both SEO and E-E-A-T. It is
 * the fixed set of things a category is judged on, which means:
 *   - every product in a category is scored against the SAME criteria, so the
 *     ratings actually compare
 *   - the "How to choose" section on each hub writes itself from real
 *     decision factors rather than filler
 *   - answer engines get a clean, extractable list of what matters
 *
 * `chemical: true` marks categories where label-literal rules bite: dosing
 * comes from the product label, never from a listing, and hazmat shipping
 * limits are described as availability, never as stock or price.
 */
export const categories = [
  {
    slug: 'pool-cleaners',
    dir: 'pool-cleaners',
    label: 'Pool Cleaners',
    navGroup: 'Equipment',
    title: 'Pool Cleaners',
    heading: 'Robotic, Suction and Pressure Pool Cleaners',
    shortAnswer:
      'Robotic cleaners are self-contained and do not touch your plumbing. Suction cleaners run off the pump and need flow. Pressure cleaners need a booster pump. Pick the type by your pool surface and debris load first, then compare models within that type.',
    description:
      'Three different machines that share a job title and almost nothing else. Which type suits your pool decides more than which model you buy.',
    metaDescription:
      'Pool cleaner reviews: robotic, suction-side and pressure-side. How to pick the right type for your pool surface and debris, then the models worth buying.',
    buyingCriteria: [
      'Pool surface and shape — waterline climbing and corner coverage vary hugely',
      'Debris type — fine silt needs different filtration from leaves',
      'Cycle time and coverage pattern, not just "cleans in 90 minutes"',
      'Filter access — top-load baskets get emptied, awkward ones do not',
      'Cable or hose length against your pool length plus the deck',
      'Replaceable wear parts: brushes, tracks, impeller, shoes',
    ],
    subcategories: [
      { slug: 'robotic-inground', label: 'Robotic (in-ground)' },
      { slug: 'robotic-above-ground', label: 'Robotic (above-ground)' },
      { slug: 'suction-side', label: 'Suction-side' },
      { slug: 'pressure-side', label: 'Pressure-side' },
      { slug: 'cordless-handheld', label: 'Cordless handheld vacuums' },
      { slug: 'manual-vacuum', label: 'Manual heads & hoses' },
    ],
  },
  {
    slug: 'pool-pumps',
    dir: 'pool-pumps',
    label: 'Pool Pumps',
    navGroup: 'Equipment',
    title: 'Pool Pumps',
    heading: 'Variable-Speed, Single-Speed and Replacement Pumps',
    shortAnswer:
      'Size a pump to your filter and plumbing, not to your pool. Flow rate at your system head is the number that matters; horsepower on the box is not. An oversized pump raises filter pressure, wastes power, and can outrun the filter it feeds.',
    description:
      'Flow rate matters more than horsepower, and an oversized pump costs you twice — once at purchase, then every month on the power bill.',
    metaDescription:
      'Pool pump reviews: variable-speed, single-speed and above-ground. How to size a pump to your filter and plumbing, and which models are worth it.',
    buyingCriteria: [
      'Flow rate at your actual system head, from the pump curve',
      'Filter area it will be paired with — the pump must not outrun the filter',
      'Variable vs single speed, and whether local code now requires VS',
      'Union and port sizing against existing plumbing',
      'Motor type and serviceability: shaft seal, bearings, capacitor access',
      'Noise, which is what owners actually complain about',
    ],
    subcategories: [
      { slug: 'variable-speed', label: 'Variable-speed pumps' },
      { slug: 'single-dual-speed', label: 'Single & dual-speed pumps' },
      { slug: 'above-ground-pumps', label: 'Above-ground pumps' },
      { slug: 'replacement-motors', label: 'Replacement motors' },
      { slug: 'pump-parts', label: 'Lids, o-rings, baskets & seals' },
    ],
  },
  {
    slug: 'chlorine-shock',
    dir: 'chlorine-shock',
    label: 'Chlorine & Shock',
    navGroup: 'Chemicals',
    chemical: true,
    title: 'Chlorine & Shock',
    heading: 'Tablets, Shock and Liquid Chlorine',
    shortAnswer:
      'Two numbers decide this and both are on the label: available chlorine percentage, and what the product does to your stabilizer level. Trichlor tablets add cyanuric acid every time you use them. Cal-hypo adds calcium. Liquid chlorine adds neither but is weaker by weight.',
    description:
      'Every chlorine product adds something besides chlorine. Which side effect you can live with is the whole decision.',
    metaDescription:
      'Pool chlorine and shock reviews: trichlor tablets, cal-hypo, dichlor, liquid chlorine and non-chlorine shock, compared on available chlorine and CYA impact.',
    buyingCriteria: [
      'Available chlorine percentage — the actual active ingredient',
      'What else it adds: cyanuric acid, calcium, or nothing',
      'Cost per pound of available chlorine, not per pound of product',
      'Dissolve behaviour and whether it needs pre-dissolving',
      'Shelf stability — liquid chlorine degrades in storage',
      'Hazmat shipping restrictions, which vary by state',
    ],
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
    label: 'Test Kits',
    navGroup: 'Chemicals',
    title: 'Test Kits & Monitors',
    heading: 'Drop Kits, Strips and Digital Testers',
    shortAnswer:
      'A drop-based kit with a FAS-DPD chlorine test gives the most reliable numbers a homeowner can get. Strips are fast and approximate. Digital testers remove colour-matching but inherit whatever reagent accuracy they are built on.',
    description:
      'Every dosing decision on a pool depends on a number you measured. The kit producing that number is the cheapest consequential thing you will buy.',
    metaDescription:
      'Pool test kit reviews: drop kits, test strips, digital photometers and smart monitors. Which testing method is accurate enough for which decision.',
    buyingCriteria: [
      'Which tests it actually covers — free vs total chlorine, CYA, calcium',
      'FAS-DPD versus OTO for chlorine, which is an accuracy gap not a preference',
      'Reagent shelf life and replacement cost',
      'Resolution: 0.2 ppm steps versus 0.5 ppm steps changes decisions',
      'Colour matching versus digital readout, and lighting sensitivity',
      'Whether refills are available separately or you rebuy the whole kit',
    ],
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
    shortAnswer:
      'Filter area has to match the pump, not the pool. Cartridge filters trap the finest particles and need no backwash line. Sand is the lowest-maintenance and coarsest. DE filters the finest of all but requires recharging after every backwash.',
    description:
      'Match filter area to pump flow and the rest follows. Get that pairing wrong and pressure reads high the day it is installed.',
    metaDescription:
      'Pool filter reviews: cartridge, sand and DE. How to match filter area to pump flow, plus replacement cartridges, media and pressure gauges.',
    buyingCriteria: [
      'Filter area in square feet against the pump flow rate',
      'Backwash requirement, and whether you have a line for it',
      'Particle size it actually captures',
      'Cost and lifespan of the media or cartridge over a season',
      'Cleaning frequency and how unpleasant the job is',
      'Tank access: clamp band design decides whether servicing is a nightmare',
    ],
    subcategories: [
      { slug: 'cartridge-filters', label: 'Cartridge filters' },
      { slug: 'sand-filters', label: 'Sand filters' },
      { slug: 'de-filters', label: 'DE filters' },
      { slug: 'replacement-cartridges', label: 'Replacement cartridges' },
      { slug: 'filter-media', label: 'Media: sand, glass, DE, zeolite' },
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
    shortAnswer:
      'A salt system generates chlorine — it is not a chlorine alternative. Size the cell above your pool volume, not to it: a cell run at full output all season wears out faster than a larger one loafing.',
    description:
      'Cell output and expected cell life separate these, and the cell is the most expensive replaceable part on the equipment pad.',
    metaDescription:
      'Salt chlorine generator reviews, replacement cells, tab feeders and pool salt. Cell sizing, expected lifespan, and what the error lights really mean.',
    buyingCriteria: [
      'Rated cell output against your pool volume, with headroom',
      'Published cell lifespan in hours, and replacement cell cost',
      'Flow switch design and how it fails',
      'Whether the cell is cleanable and how easily it comes apart',
      'Display: does it report salt level and cell condition, or just fault lights',
      'Compatibility with your existing automation, if any',
    ],
    subcategories: [
      { slug: 'salt-chlorine-generators', label: 'Salt chlorine generators' },
      { slug: 'replacement-cells', label: 'Replacement salt cells' },
      { slug: 'tab-feeders', label: 'Inline & offline feeders' },
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
    shortAnswer:
      'Almost everything in this category is the second step. Sanitizer and filtration do the actual work; these products fix what those two cannot reach. Buying one to substitute for correct chlorine levels does not work and is the most common way money gets wasted on a pool.',
    description:
      'The second step, not the first. Useful products, routinely sold as a replacement for the thing that would have actually fixed it.',
    metaDescription:
      'Pool algaecide, clarifier, flocculant, phosphate remover and stain remover reviews. What each product actually does, and when it is the wrong purchase.',
    buyingCriteria: [
      'Active ingredient and concentration — poly-quat vs copper vs silver',
      'Whether it foams, stains, or adds metals to the water',
      'What the label actually claims, versus what the marketing implies',
      'Clarifier vs flocculant: one filters out, one drops to the floor to vacuum',
      'Dose per 10,000 gallons and therefore real cost per treatment',
      'Compatibility with salt systems and with your sanitizer',
    ],
    subcategories: [
      { slug: 'algaecides', label: 'Algaecides' },
      { slug: 'clarifiers', label: 'Clarifiers' },
      { slug: 'flocculants', label: 'Flocculants' },
      { slug: 'phosphate-removers', label: 'Phosphate removers' },
      { slug: 'enzymes', label: 'Enzymes' },
      { slug: 'sequestrants', label: 'Metal sequestrants' },
      { slug: 'stain-removers', label: 'Stain removers' },
    ],
  },
  {
    slug: 'pool-balancers',
    dir: 'pool-balancers',
    label: 'Balancers',
    navGroup: 'Chemicals',
    chemical: true,
    title: 'Pool Balancers',
    heading: 'pH, Alkalinity, Stabilizer and Calcium',
    shortAnswer:
      'These are commodity chemicals sold at wildly different prices for the same active ingredient. Sodium bicarbonate is sodium bicarbonate. Compare cost per pound of active ingredient and the decision is usually obvious.',
    description:
      'Single-ingredient commodities with branded pricing. The useful review is the one that names the ingredient and does the arithmetic.',
    metaDescription:
      'Pool balancer reviews: pH up and down, alkalinity increaser, cyanuric acid and calcium hardness increaser, compared by cost per pound of active ingredient.',
    buyingCriteria: [
      'The actual active ingredient, named on the label',
      'Cost per pound of active ingredient, not per package',
      'Purity and whether it contains fillers',
      'Dissolve rate — some stabilizer takes days',
      'Package size against how much your pool will realistically use',
      'Handling hazard, especially for acids',
    ],
    subcategories: [
      { slug: 'ph-adjusters', label: 'pH up & pH down' },
      { slug: 'alkalinity-increaser', label: 'Alkalinity increaser' },
      { slug: 'cyanuric-acid', label: 'Cyanuric acid (stabilizer)' },
      { slug: 'calcium-hardness', label: 'Calcium hardness increaser' },
      { slug: 'acid-alternatives', label: 'Muriatic acid alternatives' },
    ],
  },
  {
    slug: 'pool-heaters',
    dir: 'pool-heaters',
    label: 'Heaters',
    navGroup: 'Equipment',
    title: 'Pool Heaters & Heating',
    heading: 'Gas Heaters, Heat Pumps and Solar',
    shortAnswer:
      'Gas heats fast and costs the most to run. A heat pump costs least to run but only works above roughly 50°F ambient and heats slowly. Solar is cheapest to run and least predictable. Your climate and how fast you need heat decide this, not the model.',
    description:
      'Three technologies with completely different running costs and completely different climates where each makes sense.',
    metaDescription:
      'Pool heater reviews: gas heaters, heat pumps, solar heaters and solar covers. BTU sizing, real running cost, and which technology suits your climate.',
    buyingCriteria: [
      'BTU or COP rating against pool volume and your target temperature rise',
      'Ambient temperature floor — heat pumps stop being useful below it',
      'Running cost per degree, using local gas and electricity rates',
      'Venting, gas line sizing or electrical service required',
      'Heat exchanger material and warranty, which is where these fail',
      'Whether installation is legally a licensed job where you live (usually yes)',
    ],
    subcategories: [
      { slug: 'gas-heaters', label: 'Gas heaters' },
      { slug: 'heat-pumps', label: 'Heat pumps' },
      { slug: 'solar-heaters', label: 'Solar heaters' },
      { slug: 'solar-covers-rings', label: 'Solar covers & rings' },
      { slug: 'above-ground-heaters', label: 'Above-ground heaters' },
    ],
  },
  {
    slug: 'pool-covers',
    dir: 'pool-covers',
    label: 'Covers & Reels',
    navGroup: 'Gear & Seasonal',
    title: 'Pool Covers & Reels',
    heading: 'Winter, Safety and Solar Covers',
    shortAnswer:
      'A safety cover and a winter cover are different products. Only a safety cover is engineered and rated to hold weight, and only a safety cover is a drowning barrier. A solar cover does neither — it retains heat and reduces evaporation.',
    description:
      'Three products that get called the same thing, one of which is a life-safety device.',
    metaDescription:
      'Pool cover reviews: winter covers, safety covers, solar covers, reels, leaf nets and cover pumps. Which type your pool, climate and family actually need.',
    buyingCriteria: [
      'Safety rating — is it an actual tested barrier or a debris cover',
      'Material weight and warranty length, which track together',
      'Anchoring method against your deck material',
      'Fit: rectangular, freeform, or custom-measured',
      'Water removal: does it need a cover pump',
      'Storage bulk, which decides whether it gets used next year',
    ],
    subcategories: [
      { slug: 'safety-covers', label: 'Safety covers' },
      { slug: 'winter-covers', label: 'Winter covers' },
      { slug: 'solar-covers', label: 'Solar covers' },
      { slug: 'cover-reels', label: 'Cover reels' },
      { slug: 'leaf-nets', label: 'Leaf nets' },
      { slug: 'cover-pumps', label: 'Cover pumps' },
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
    shortAnswer:
      'What you need depends entirely on whether your plumbing freezes. In freeze country, water left in a line is the most expensive failure a pool can have. In warm climates most closing kits are optional and a cover plus balanced water does the job.',
    description:
      'The most preventable expensive failure on a pool, and a category where half the products are unnecessary in half the country.',
    metaDescription:
      'Pool winterizing and opening reviews: winter chemical kits, antifreeze, air pillows, plugs, gizmos and start-up chemicals, sorted by whether you freeze.',
    buyingCriteria: [
      'Whether your climate actually freezes plumbing — decides most of this',
      'What is in the kit versus what you would buy separately',
      'Antifreeze type: propylene glycol only, never automotive',
      'Plug sizing against your specific skimmer and return fittings',
      'Slow-release versus dump-in chemistry for a closed pool',
      'Whether the kit is sized for your actual volume',
    ],
    subcategories: [
      { slug: 'winter-chem-kits', label: 'Winter chemical kits' },
      { slug: 'pool-antifreeze', label: 'Pool antifreeze' },
      { slug: 'air-pillows', label: 'Air pillows' },
      { slug: 'plugs-gizmos', label: 'Plugs & gizmos' },
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
    shortAnswer:
      'Brush choice is decided by your pool surface, not preference: stainless bristles on plaster and gunite only, nylon on vinyl and fiberglass. A stainless brush on a vinyl liner will damage it.',
    description:
      'The cheapest category on the site and the one where buying twice is most common, usually because the tool did not suit the surface.',
    metaDescription:
      'Pool cleaning tool reviews: telescopic poles, skimmer nets, brushes, leaf rakes and waterline cleaners, matched to your pool surface.',
    buyingCriteria: [
      'Pool surface — this decides brush bristle material outright',
      'Pole locking mechanism, which is what actually fails',
      'Pole reach against pool width plus deck standing position',
      'Net depth and frame rigidity for leaf loads',
      'Whether the head fits standard pole clips',
      'Whether replacement heads are sold separately',
    ],
    subcategories: [
      { slug: 'telescopic-poles', label: 'Telescopic poles' },
      { slug: 'skimmer-nets', label: 'Skimmer nets & leaf rakes' },
      { slug: 'brushes', label: 'Brushes' },
      { slug: 'waterline-cleaners', label: 'Tile & waterline cleaners' },
      { slug: 'pumice', label: 'Pumice & scale tools' },
    ],
  },
  {
    slug: 'above-ground',
    dir: 'above-ground',
    label: 'Above-Ground',
    navGroup: 'Gear & Seasonal',
    title: 'Above-Ground Pools & Parts',
    heading: 'Pool Sets, Ladders, Liners and Replacement Parts',
    shortAnswer:
      'Above-ground kits almost always ship with an undersized pump and filter. The upgrade path matters more than the kit: budget for a larger cartridge filter early, because the supplied one will need cleaning every few days.',
    description:
      'Kits judged on what they ship with, and on what you will end up replacing in the first season.',
    metaDescription:
      'Above-ground pool reviews: Intex and Bestway sets, ladders, steps, liners and replacement pumps and filters. What the kits skimp on and what to upgrade.',
    buyingCriteria: [
      'Supplied pump flow and filter area against the pool volume',
      'Wall and liner gauge, which decides how many seasons it survives',
      'Frame material and corrosion resistance',
      'Ladder weight rating and whether it has a barrier',
      'Availability of replacement liners in that exact size',
      'Whether standard fittings adapt to it, or only proprietary ones',
    ],
    subcategories: [
      { slug: 'pool-sets', label: 'Pool sets' },
      { slug: 'ladders-steps', label: 'Ladders & steps' },
      { slug: 'liners', label: 'Liners' },
      { slug: 'ag-pumps-filters', label: 'Replacement pumps & filters' },
      { slug: 'skimmer-attachments', label: 'Skimmer attachments' },
    ],
  },
]

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))
export const categorySlugs = categories.map((c) => c.slug)

/** Header dropdown order. Every category belongs to exactly one group. */
export const navGroups = ['Equipment', 'Chemicals', 'Gear & Seasonal']

export const categoriesByNavGroup = navGroups.map((group) => ({
  group,
  items: categories.filter((c) => c.navGroup === group),
}))

export function subcategoriesFor(slug) {
  return categoryBySlug[slug]?.subcategories ?? []
}

export function isValidSubcategory(categorySlug, subSlug) {
  return subcategoriesFor(categorySlug).some((s) => s.slug === subSlug)
}

export function subcategoryLabel(categorySlug, subSlug) {
  return subcategoriesFor(categorySlug).find((s) => s.slug === subSlug)?.label ?? subSlug
}

/* ------------------------------------------------------------------------ *
 * Cross-cut tags -- the "Your pool" filter.
 *
 * These are what make a comparison table useful rather than decorative: a
 * 15,000-gallon vinyl above-ground pool on a cartridge filter has a different
 * shortlist from a 40,000-gallon plaster in-ground on salt, and a table that
 * cannot express that is just a spec dump.
 *
 * Frontmatter validation rejects any value not listed here, so a filter can
 * never silently match nothing.
 * ------------------------------------------------------------------------ */

/** Brand systems. Replacement parts are mostly chosen by what is already installed. */
export const compatBrands = [
  { slug: 'hayward', label: 'Hayward' },
  { slug: 'pentair', label: 'Pentair' },
  { slug: 'jandy', label: 'Jandy' },
  { slug: 'polaris', label: 'Polaris' },
  { slug: 'dolphin', label: 'Dolphin' },
  { slug: 'intex', label: 'Intex' },
  { slug: 'bestway', label: 'Bestway' },
]
export const compatSlugs = compatBrands.map((b) => b.slug)

export const poolTypes = [
  { slug: 'inground', label: 'In-ground' },
  { slug: 'above-ground', label: 'Above-ground' },
  { slug: 'both', label: 'Either' },
]

export const surfaces = [
  { slug: 'plaster', label: 'Plaster / gunite' },
  { slug: 'vinyl', label: 'Vinyl liner' },
  { slug: 'fiberglass', label: 'Fiberglass' },
  { slug: 'tile', label: 'Tile' },
  { slug: 'any', label: 'Any surface' },
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

/** Bands are coarse on purpose: nobody knows their volume to the gallon. */
export const gallonBands = [
  { slug: 'lt10k', label: 'Under 10,000 gal' },
  { slug: '10-20k', label: '10,000 - 20,000 gal' },
  { slug: '20-35k', label: '20,000 - 35,000 gal' },
  { slug: '35k+', label: 'Over 35,000 gal' },
  { slug: 'any', label: 'Any size' },
]

export function bandForGallons(gallons) {
  if (!Number.isFinite(gallons) || gallons <= 0) return null
  if (gallons < 10000) return 'lt10k'
  if (gallons < 20000) return '10-20k'
  if (gallons < 35000) return '20-35k'
  return '35k+'
}

/** The filter bar renders from this, so adding a facet is a one-line change. */
export const filterFacets = [
  { key: 'pool_type', label: 'Pool type', options: poolTypes, neutral: 'both' },
  { key: 'sanitizer', label: 'Sanitizer', options: sanitizers, neutral: 'both' },
  { key: 'filter_type', label: 'Filter', options: filterTypes, neutral: 'any' },
  { key: 'surface', label: 'Surface', options: surfaces, neutral: 'any' },
  { key: 'gallons', label: 'Pool size', options: gallonBands, neutral: 'any' },
]

/* --------------------------------------------------------------- formats */

export const contentTypes = ['review', 'roundup', 'comparison', 'guide']
export const priceTiers = ['budget', 'mid', 'premium']
export const badges = ['best-overall', 'best-budget', 'best-premium', 'also-great']

export const priceTierLabel = {
  budget: 'Budget',
  mid: 'Mid-range',
  premium: 'Premium',
}

export const badgeLabel = {
  'best-overall': 'Best overall',
  'best-budget': 'Best budget',
  'best-premium': 'Best premium',
  'also-great': 'Also great',
}

/** The listing pages under /reviews. */
export const reviewIndexes = [
  {
    slug: 'best-of',
    type: 'roundup',
    label: 'Best Of',
    title: 'Best-Of Roundups',
    description:
      'Our top pick in each category, with the comparison table and the reasoning behind it.',
  },
  {
    slug: 'comparisons',
    type: 'comparison',
    label: 'Comparisons',
    title: 'Head-to-Head Comparisons',
    description: 'Two products, judged on the same criteria. For when you have it down to a pair.',
  },
  {
    slug: 'all',
    type: 'review',
    label: 'All Reviews',
    title: 'All Product Reviews',
    description: 'Every individual product review on the site, most recently updated first.',
  },
]
