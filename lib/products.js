/**
 * PRODUCT SLOTS — identity only.
 *
 * Deliberately carries NO asin, NO price, NO image, NO affiliate URL. Those
 * get filled in one sweep later; until then a card renders as a named
 * recommendation with its constraint line and no buy link. The build warns
 * with the full list of unfilled ids, which doubles as the fill-in worklist.
 *
 * IDS DESCRIBE A PRODUCT CLASS, NOT A BRAND MODEL. `drop-test-kit`, not
 * `taylor-k2006`. That way one id can be pointed at whatever product wins the
 * comparison later without touching a single article.
 *
 * Shape:
 *   id          stable kebab-case product class. Never reuse or repurpose.
 *   title       display name
 *   summary     one line: what it is and who it's for
 *   constraint  optional hard limit that belongs on the card, not buried in
 *               prose — "not for vinyl or fiberglass" is a wrecked liner if
 *               someone misses it
 *   category    loose grouping for filtering
 *
 * KEEP THIS LIST ALPHABETICAL BY ID. The eventual ASIN pass is one sweep down
 * the file; an unsorted list turns that into a search-and-scroll job.
 *
 * Prices live in prose as bands ("under $30"), never as figures. The Associates
 * agreement restricts displaying prices that aren't current, so a stored price
 * is a compliance problem as well as a staleness one.
 */
export const products = [
  {
    id: 'cal-hypo-shock',
    title: 'Calcium Hypochlorite Shock (73%)',
    summary: 'Granular shock for clearing a bloom. Adds no cyanuric acid, and ships far better than liquid chlorine.',
    constraint: 'Raises calcium hardness. Skip it if yours is already high or your fill water is hard.',
    category: 'chemicals',
  },
  {
    id: 'clarifier',
    title: 'Pool Water Clarifier',
    summary: 'Coagulant that gathers fine particulate into pieces big enough for the filter to catch.',
    constraint: 'Works through the filter, unlike flocculant. Useless if the filter itself is the problem.',
    category: 'chemicals',
  },
  {
    id: 'drop-test-kit',
    title: 'FAS-DPD Drop Test Kit',
    summary: 'Titration kit that reads free and combined chlorine separately, plus pH, alkalinity, hardness and cyanuric acid.',
    constraint: 'Reagents expire. Replace them yearly or the readings drift low.',
    category: 'test-kits',
  },
  {
    id: 'flocculant',
    title: 'Pool Flocculant (Drop-Out)',
    summary: 'Sinks suspended debris to the floor in one go, for water too opaque to filter clear.',
    constraint: 'Must be vacuumed to waste, not through the filter. Costs a large volume of water.',
    category: 'chemicals',
  },
  {
    id: 'liquid-chlorine',
    title: 'Liquid Chlorine (Sodium Hypochlorite)',
    summary: 'Unstabilized chlorine for routine dosing and for clearing algae without raising cyanuric acid.',
    constraint: 'Loses strength in storage, fast in heat. Buy fresh and buy often rather than in bulk.',
    category: 'chemicals',
  },
  {
    id: 'mechanical-seal-kit',
    title: 'Pump Mechanical Seal Kit',
    summary: 'The shaft seal between the wet end and the motor. Replace it whenever you replace a motor for bearing noise.',
    constraint: 'Model-specific. Match it to your exact pump, not just the brand.',
    category: 'parts',
  },
  {
    id: 'nylon-pool-brush',
    title: 'Nylon Pool Brush',
    summary: 'General-purpose brush for weekly walls and waterline.',
    constraint: 'The correct brush for vinyl and fiberglass, where stainless would cause damage.',
    category: 'tools',
  },
  {
    id: 'pressure-gauge',
    title: 'Filter Pressure Gauge',
    summary: 'Replacement gauge for the filter. The cheapest diagnostic on the equipment pad.',
    constraint: 'A gauge reading zero at startup is usually a dead gauge, not a dead pump.',
    category: 'parts',
  },
  {
    id: 'pump-lid-oring',
    title: 'Pump Lid O-Ring',
    summary: 'The seal on the pump pot lid. The most common cause of a pump that will not hold prime.',
    constraint: 'Needs silicone lubricant, never petroleum jelly — petroleum swells the rubber.',
    category: 'parts',
  },
  {
    id: 'skimmer-sock',
    title: 'Skimmer Socks',
    summary: 'Fine mesh sleeve over the skimmer basket that catches pollen and fine debris the basket passes.',
    constraint: 'Restricts flow as it loads. Check it daily during pollen season.',
    category: 'tools',
  },
  {
    id: 'stainless-algae-brush',
    title: 'Stainless Steel Algae Brush',
    summary: 'Stiff stainless bristles for breaking the protective cap off algae on plaster and gunite.',
    constraint: 'Not for vinyl or fiberglass — stainless will damage both permanently.',
    category: 'tools',
  },
  {
    id: 'telescoping-pole',
    title: 'Telescoping Pool Pole',
    summary: 'The handle everything else attaches to: brush, vacuum head, skimmer net.',
    constraint: 'Cheap poles flex too much to brush properly, which is most of the job.',
    category: 'tools',
  },
  {
    id: 'test-strips',
    title: 'Pool Test Strips',
    summary: 'Fast routine check for chlorine, pH and alkalinity. Good enough for the twice-weekly habit.',
    constraint: 'Not precise enough for troubleshooting. Keep a drop kit for that.',
    category: 'test-kits',
  },
]

const productsById = Object.fromEntries(products.map((p) => [p.id, p]))

/** Look up one product. Returns undefined for unknown ids. */
export function getProduct(id) {
  return productsById[id]
}

/** Look up many, dropping unknown ids. Order preserved. */
export function getProducts(ids = []) {
  return ids.map((id) => productsById[id]).filter(Boolean)
}

/**
 * Every product is currently awaiting an ASIN. This drives the build warning
 * that doubles as the fill-in worklist.
 */
export const productsMissingAsin = products.map((p) => p.id)

/** Ids referenced in content that do not exist here. Used by the build check. */
export function unknownProductIds(ids = []) {
  return ids.filter((id) => !productsById[id])
}
