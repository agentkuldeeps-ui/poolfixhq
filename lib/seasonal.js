/**
 * The "right now" block on the homepage.
 *
 * Four seasons rather than twelve months: the advice genuinely does not change
 * week to week, and a twelve-entry table is twelve things to keep accurate.
 * The month name is interpolated into the headline so it still reads current.
 *
 * Northern hemisphere, continental US. Season length varies enormously by
 * climate, which is exactly why every entry links out to /regional.
 *
 * Nothing here is a statistic or a citation — it is practical sequencing
 * advice. Keep it that way. If a claim needs a source, it belongs in an
 * article, not in a homepage teaser.
 */
const SEASONS = {
  spring: {
    key: 'spring',
    label: 'Opening season',
    headline: 'Opening season. Do it in the right order.',
    body:
      'The mistake that costs people a week: dumping chemicals into a pool that is not circulating yet. Get water moving and the filter clean first, then chase numbers.',
    points: [
      'Circulation and filtration before chemistry. Always.',
      'Balance alkalinity before pH, or you will chase pH all month.',
      'Brush before you shock. Algae hiding in the plaster survives otherwise.',
    ],
  },
  summer: {
    key: 'summer',
    label: 'Peak season',
    headline: 'Peak season. Sun is eating your chlorine.',
    body:
      'Long days, heavy bather load, and UV burning off free chlorine faster than any other time of year. Most summer problems are a stabilizer or a run-time problem wearing a costume.',
    points: [
      'Test more often than feels necessary — twice a week minimum.',
      'Cloudy after a pool party is usually filtration, not chemistry.',
      'Check cyanuric acid before you blame the chlorine.',
    ],
  },
  fall: {
    key: 'fall',
    label: 'Closing season',
    headline: 'Closing season. What you skip now, you pay for in spring.',
    body:
      'A pool closed dirty opens green. The hour you spend on water chemistry and a proper blow-out in the fall is the cheapest hour in the pool calendar.',
    points: [
      'Balance the water before you cover it, not after.',
      'Leaves left on the cover become the stain you scrub in April.',
      'In freeze country, plumbing that holds water is plumbing that cracks.',
    ],
  },
  winter: {
    key: 'winter',
    label: 'Off season',
    headline: 'Off season. Quiet, but not zero.',
    body:
      'Whether you are running year round or fully closed depends entirely on where you live. Either way, this is the cheap time to deal with equipment you have been tolerating.',
    points: [
      'Check the cover after every storm. Standing water gets heavy fast.',
      'Off-season is the right time to replace a pump you nursed all summer.',
      'Warm climates: you are still sanitizing, just at lower demand.',
    ],
  },
}

const MONTH_TO_SEASON = [
  'winter', // Jan
  'winter', // Feb
  'spring', // Mar
  'spring', // Apr
  'spring', // May
  'summer', // Jun
  'summer', // Jul
  'summer', // Aug
  'fall', // Sep
  'fall', // Oct
  'fall', // Nov
  'winter', // Dec
]

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/**
 * Resolved at build/revalidate time, not in the browser — no client JS and no
 * hydration mismatch. app/page.js sets `revalidate` so this stays current
 * without a manual redeploy.
 */
export function currentSeason(date = new Date()) {
  const monthIndex = date.getUTCMonth()
  return {
    ...SEASONS[MONTH_TO_SEASON[monthIndex]],
    month: MONTH_NAMES[monthIndex],
  }
}

export { SEASONS }
