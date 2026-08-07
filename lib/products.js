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
    id: 'enzyme-cleaner',
    title: 'Pool Enzyme Cleaner',
    summary: 'Breaks the carbon chains in oils and non-living organics so chlorine can finish them. Aimed at the supply of a scum ring rather than the ring itself.',
    constraint: 'Will not remove a ring already on the wall — that still comes off with a cloth. Does nothing for metals, calcium or inorganic ammonia.',
    category: 'chemicals',
  },
  {
    id: 'calcium-hardness-increaser',
    title: 'Calcium Hardness Increaser',
    summary: 'Calcium chloride. Raises calcium hardness, which is what stops foam persisting and stops soft water attacking plaster.',
    constraint: 'Cannot be removed once added except by draining and diluting. Add in small increments and retest between doses — overshooting trades foam for scale.',
    category: 'chemicals',
  },
  {
    id: 'non-chlorine-shock',
    title: 'Non-Chlorine Shock (MPS)',
    summary: 'Oxidises the organics that cause foam without adding chlorine, raising free chlorine, or adding calcium or CYA.',
    constraint: 'Oxidiser only — it does not sanitise and is not a substitute for chlorine. Use it when the job is breaking down organics rather than killing anything.',
    category: 'chemicals',
  },
  {
    id: 'ascorbic-acid',
    title: 'Ascorbic Acid (Vitamin C) Stain Treatment',
    summary: 'Reduces iron staining off plaster. The same chemistry as the vitamin C field test, in a dose that treats a whole pool.',
    constraint: 'Chlorine destroys it — bring free chlorine down to roughly 1-2 ppm and switch the chlorinator off before dosing, or the treatment does nothing. It removes the stain, not the metal: follow with a sequestrant or it comes back.',
    category: 'chemicals',
  },
  {
    id: 'metal-test-kit',
    title: 'Metal Test Kit',
    summary: 'Reads iron and copper in the water. The test that tells you whether a stain has a live source still feeding it.',
    constraint: 'Test the fill water as well as the pool — well water is a common source, and a clean pool reading right after a treatment does not mean the metal is gone.',
    category: 'test-kits',
  },
  {
    id: 'sequestrant',
    title: 'Metal Sequestrant',
    summary: 'Binds dissolved metal so it stays in solution instead of plating onto the surface. The step that stops a treated stain returning.',
    constraint: 'Binds metal in solution to prevent re-staining; it does not remove a stain that has already formed. Needs re-dosing — it degrades over time and on every top-off.',
    category: 'chemicals',
  },
  {
    id: 'algaecide',
    title: 'Pool Algaecide',
    summary: 'Preventative for after a bloom is dead. Keeps a treated pool from re-establishing between chlorine doses.',
    constraint: 'Prevention after treatment, not a primary kill — it will not clear an active bloom on its own. Copper-based formulas can stain plaster, especially where the water already carries metals.',
    category: 'chemicals',
  },
  {
    id: 'cal-hypo-shock',
    title: 'Calcium Hypochlorite Shock (73%)',
    summary: 'Granular shock for clearing a bloom. Adds no cyanuric acid, and ships far better than liquid chlorine.',
    constraint: 'Raises calcium hardness. Skip it if yours is already high or your fill water is hard.',
    category: 'chemicals',
  },
  {
    id: 'capacitor',
    title: 'Pool Pump Start Capacitor',
    summary: 'The starting capacitor for a single-phase pool pump motor. The cheap part people replace a whole motor over.',
    constraint: 'Holds a charge after power is off and can injure you. Discharge it before touching the terminals, and match microfarad and voltage exactly.',
    category: 'parts',
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
    id: 'muriatic-acid',
    title: 'Muriatic Acid (Pool Grade)',
    summary: 'The standard acid for lowering pH and total alkalinity. The highest-leverage tool against calcium falling out of solution.',
    constraint: 'Always add acid to water, never water to acid. Never mix with chlorine — the combination produces chlorine gas. Fumes damage metal on the equipment pad.',
    category: 'chemicals',
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
    id: 'scale-inhibitor',
    title: 'Scale Inhibitor / Sequestrant',
    summary: 'Holds calcium and metals in solution so they do not crystallize out onto surfaces and equipment.',
    constraint: 'Prevents precipitation, does not dissolve existing haze. It will not clear a pool that has already gone milky.',
    category: 'chemicals',
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
  {
    id: 'trichlor-tablets',
    title: 'Trichlor Tablets',
    summary: 'Stabilized chlorine tablets. Rubbed directly on a brushed black algae spot, they deliver concentrated chlorine to the colony instead of diluting it across the pool.',
    constraint: 'Acidic — never store or mix with cal-hypo. Wear gloves, and never use on a vinyl liner: it will bleach the spot permanently.',
    category: 'chemicals',
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
