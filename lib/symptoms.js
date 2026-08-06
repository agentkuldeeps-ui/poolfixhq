/**
 * THE SYMPTOM INDEX -- the homepage's main differentiator.
 *
 * Competitors organise by topic ("Pool Chemistry", "Pool Equipment"). Nobody
 * arrives thinking "I have a chemistry question." They arrive thinking "the
 * water is cloudy" or "the pump is screaming." This index is the site in the
 * reader's own words.
 *
 * Each entry names a target article by `category` + `slug`. Entries whose
 * article does not exist yet render as plain muted text, not links -- so this
 * list can describe the finished site today without generating a single 404,
 * and each entry lights up automatically the day its MDX file lands.
 *
 * That makes this file double as the content roadmap. Add the symptom here
 * first, write the article second.
 */
export const symptomGroups = [
  {
    id: 'water',
    title: 'The water looks wrong',
    hubHref: '/problems',
    hubLabel: 'All problems',
    symptoms: [
      { label: 'Green water', category: 'problems', slug: 'green-pool-water' },
      { label: 'Cloudy or hazy water', category: 'problems', slug: 'cloudy-pool-water' },
      { label: 'Milky white water', category: 'problems', slug: 'milky-white-pool-water' },
      { label: 'Black or dark green spots', category: 'problems', slug: 'black-algae-in-pool' },
      { label: 'Yellow or mustard dust', category: 'problems', slug: 'mustard-algae' },
      { label: 'Stains on the plaster', category: 'problems', slug: 'pool-stains' },
      { label: 'Foam on the surface', category: 'problems', slug: 'foamy-pool-water' },
      { label: 'Scum ring at the waterline', category: 'problems', slug: 'waterline-scum-ring' },
    ],
  },
  {
    id: 'equipment',
    title: 'The equipment is acting up',
    hubHref: '/equipment',
    hubLabel: 'All equipment',
    symptoms: [
      { label: 'Pump will not prime', category: 'equipment', slug: 'pump-not-priming' },
      { label: 'Pump is dead silent, will not start', category: 'equipment', slug: 'pool-pump-not-turning-on' },
      { label: 'Pump is loud or screaming', category: 'equipment', slug: 'pool-pump-loud-noise' },
      { label: 'Weak flow from the returns', category: 'equipment', slug: 'low-pool-flow' },
      { label: 'Air bubbles in the returns', category: 'equipment', slug: 'air-in-pool-lines' },
      { label: 'Filter pressure is high', category: 'equipment', slug: 'high-filter-pressure' },
      { label: 'Heater will not fire', category: 'equipment', slug: 'pool-heater-not-heating' },
      { label: 'Salt cell throwing an error', category: 'equipment', slug: 'salt-cell-errors' },
      { label: 'Cleaner stopped moving', category: 'equipment', slug: 'pool-cleaner-not-moving' },
    ],
  },
  {
    id: 'chemistry',
    title: 'The numbers will not behave',
    hubHref: '/chemistry',
    hubLabel: 'All chemistry',
    symptoms: [
      { label: 'Chlorine will not hold', category: 'chemistry', slug: 'chlorine-basics' },
      { label: 'pH keeps climbing', category: 'chemistry', slug: 'high-pool-ph' },
      { label: 'pH keeps dropping', category: 'chemistry', slug: 'low-pool-ph' },
      { label: 'Total alkalinity is off', category: 'chemistry', slug: 'total-alkalinity' },
      { label: 'Cyanuric acid too high', category: 'chemistry', slug: 'high-cyanuric-acid' },
      { label: 'Calcium hardness too high', category: 'chemistry', slug: 'calcium-hardness' },
      { label: 'Strong chlorine smell, burning eyes', category: 'chemistry', slug: 'chloramines' },
      { label: 'Test kit vs strips disagree', category: 'chemistry', slug: 'pool-testing-accuracy' },
    ],
  },
]

/** Every symptom flattened, for counting and coverage reporting. */
export const allSymptoms = symptomGroups.flatMap((group) =>
  group.symptoms.map((symptom) => ({ ...symptom, groupId: group.id })),
)
