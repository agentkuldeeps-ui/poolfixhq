/**
 * THE SYMPTOM INDEX -- still the homepage's main differentiator, now pointed
 * at products instead of articles.
 *
 * Competitors organise a store by department ("Chemicals", "Equipment").
 * Nobody arrives thinking "I need to browse chemicals." They arrive thinking
 * "the water is green" or "the pump is screaming." This index is the catalog
 * in the reader's own words, and it is the reason symptom-intent traffic
 * lands here rather than on a generic "best pool pump" page.
 *
 * Each row is: the symptom, the thing that actually fixes it, and the category
 * that sells it. Every `href` must resolve to a real category route, so there
 * are no "soon" rows and no dead ends -- the categories all exist from day one
 * even when they are still filling up with reviews.
 *
 * `fix` is doing real work here. It is the site's voice in one line, and
 * several of these deliberately talk the reader OUT of a purchase ("clean it
 * before you replace it", "not more shock"). Keep that. A symptom index that
 * upsells every row is just a menu.
 */
export const symptomGroups = [
  {
    id: 'water',
    title: 'The water looks wrong',
    hubHref: '/algaecides-treatments',
    hubLabel: 'All water treatments',
    symptoms: [
      {
        label: 'Green water',
        fix: 'Cal-hypo shock, then a poly-quat algaecide',
        href: '/chlorine-shock',
      },
      {
        label: 'Cloudy or hazy water',
        fix: 'A clarifier — or a filter that is undersized',
        href: '/pool-filters',
      },
      {
        label: 'Milky white water',
        fix: 'Flocculant, and test calcium before you dose',
        href: '/algaecides-treatments',
      },
      {
        label: 'Black or dark green spots',
        fix: 'Stainless brush first, algaecide second',
        href: '/algaecides-treatments',
      },
      {
        label: 'Yellow or mustard dust',
        fix: 'Poly-quat algaecide plus chlorine held high',
        href: '/algaecides-treatments',
      },
      {
        label: 'Stains on the plaster',
        fix: 'Ascorbic acid or a metal sequestrant',
        href: '/algaecides-treatments',
      },
      {
        label: 'Foam on the surface',
        fix: 'An enzyme treatment, not more shock',
        href: '/algaecides-treatments',
      },
      {
        label: 'Scum ring at the waterline',
        fix: 'A waterline cleaner, applied by hand',
        href: '/cleaning-tools',
      },
    ],
  },
  {
    id: 'equipment',
    title: 'The equipment is acting up',
    hubHref: '/product-reviews',
    hubLabel: 'All equipment reviews',
    symptoms: [
      {
        label: 'Pump will not prime',
        fix: 'A lid o-ring, long before a new pump',
        href: '/pool-pumps',
      },
      {
        label: 'Pump is dead silent, will not start',
        fix: 'Usually the capacitor or the breaker',
        href: '/pool-pumps',
      },
      {
        label: 'Pump is loud or screaming',
        fix: 'Bearings — that is a replacement motor',
        href: '/pool-pumps',
      },
      {
        label: 'Weak flow from the returns',
        fix: 'Read the gauge before you buy anything',
        href: '/pool-filters',
      },
      {
        label: 'Air bubbles in the returns',
        fix: 'Lid o-ring, and a gauge you can trust',
        href: '/pool-pumps',
      },
      {
        label: 'Filter pressure is high',
        fix: 'Fresh media or a new cartridge',
        href: '/pool-filters',
      },
      {
        label: 'Heater will not fire',
        fix: 'Check flow first — gas work is a pro job',
        href: '/pool-heaters',
      },
      {
        label: 'Salt cell throwing an error',
        fix: 'Clean it before you replace it',
        href: '/salt-systems',
      },
      {
        label: 'Cleaner stopped moving',
        fix: 'Shoes, impeller or tracks — cheapest first',
        href: '/pool-cleaners',
      },
    ],
  },
  {
    id: 'chemistry',
    title: 'The numbers will not behave',
    hubHref: '/pool-balancers',
    hubLabel: 'All balancers',
    symptoms: [
      {
        label: 'Chlorine will not hold',
        fix: 'Test stabilizer — it is usually too high',
        href: '/test-kits',
      },
      {
        label: 'pH keeps climbing',
        fix: 'pH down, and look at your aeration',
        href: '/pool-balancers',
      },
      {
        label: 'pH keeps dropping',
        fix: 'Alkalinity increaser, not pH up',
        href: '/pool-balancers',
      },
      {
        label: 'Total alkalinity is off',
        fix: 'Alkalinity increaser, or acid to bring it down',
        href: '/pool-balancers',
      },
      {
        label: 'Cyanuric acid too high',
        fix: 'Only dilution lowers it — then change tabs',
        href: '/chlorine-shock',
      },
      {
        label: 'Calcium hardness too high',
        fix: 'A sequestrant. Hardness only leaves by dilution',
        href: '/algaecides-treatments',
      },
      {
        label: 'Strong chlorine smell, burning eyes',
        fix: 'That is too little chlorine, not too much',
        href: '/chlorine-shock',
      },
      {
        label: 'Test kit and strips disagree',
        fix: 'Trust the drop kit. Replace the strips',
        href: '/test-kits',
      },
    ],
  },
]

/** Every symptom flattened, for counting and coverage reporting. */
export const allSymptoms = symptomGroups.flatMap((group) =>
  group.symptoms.map((symptom) => ({ ...symptom, groupId: group.id })),
)

/** Every category the index points at, so a build check can verify they exist. */
export const symptomTargets = [
  ...new Set(allSymptoms.map((s) => s.href).concat(symptomGroups.map((g) => g.hubHref))),
]
