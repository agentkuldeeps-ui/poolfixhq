/**
 * THE SCORING SYSTEM.
 *
 * A rating nobody can audit is decoration. So this file publishes, per
 * category, the exact dimensions a product is scored on AND the weight each
 * one carries — before any product is scored against them — and the headline
 * rating is COMPUTED from that breakdown rather than asserted separately.
 *
 * lib/frontmatter.js fails the build if a page's `rating` does not match the
 * weighted mean of its `scores`. That is the mechanism that makes the
 * transparency real: you cannot quietly round a product up because the number
 * looked bad next to a competitor's page. If you want a higher rating you have
 * to change a dimension score and defend it in the text.
 *
 * Dimensions are per-category because the things that decide a pump are not
 * the things that decide a test kit. Weights are fixed for the whole category
 * and applied identically to every product in it.
 *
 * Scores are 0-10. The headline rating is 0-5, so rating = weighted mean / 2.
 */

/** Weights within a category must sum to 1. Enforced below at module load. */
export const scoreDimensions = {
  'pool-pumps': [
    { key: 'efficiency', label: 'Efficiency', weight: 0.2, blurb: 'WEF, real turndown, and what it costs to run at the speed you will actually use.' },
    { key: 'flowControl', label: 'Flow control', weight: 0.15, blurb: 'Usable speed and flow range, programmability, and how precisely output can be held.' },
    { key: 'noise', label: 'Noise', weight: 0.1, blurb: 'At the speeds the pump will spend most of its life running.' },
    { key: 'controls', label: 'Controls', weight: 0.1, blurb: 'On-pump interface, app, and whether the readouts match how pool advice is written.' },
    { key: 'installation', label: 'Installation', weight: 0.05, blurb: 'Electrical and plumbing demands, retrofit fit, and what is not in the box.' },
    { key: 'compatibility', label: 'Compatibility', weight: 0.1, blurb: 'Automation, existing equipment, and plumbing the pump will actually meet.' },
    { key: 'serviceability', label: 'Serviceability', weight: 0.1, blurb: 'What can be repaired, what has to be replaced whole, and parts availability.' },
    { key: 'warranty', label: 'Warranty', weight: 0.1, blurb: 'Length, what it covers, and how easily an ordinary buyer actually keeps it.' },
    { key: 'value', label: 'Value', weight: 0.1, blurb: 'What you get relative to the alternatives, over the life of the pump.' },
  ],
}

/**
 * Fallback for categories whose dimension list has not been written yet.
 * Deliberately generic and deliberately awkward to use — a category that
 * matters should get its own dimensions rather than lean on this.
 */
export const DEFAULT_DIMENSIONS = [
  { key: 'performance', label: 'Performance', weight: 0.3, blurb: 'Does the core job well.' },
  { key: 'buildQuality', label: 'Build quality', weight: 0.2, blurb: 'Materials, assembly, expected life.' },
  { key: 'easeOfUse', label: 'Ease of use', weight: 0.2, blurb: 'How much the product fights you.' },
  { key: 'warranty', label: 'Warranty', weight: 0.15, blurb: 'Coverage, and how easily it is kept.' },
  { key: 'value', label: 'Value', weight: 0.15, blurb: 'What you get relative to the alternatives.' },
]

export function dimensionsFor(categorySlug) {
  return scoreDimensions[categorySlug] ?? DEFAULT_DIMENSIONS
}

/** Weighted mean of the dimension scores, on the 0-10 scale. */
export function weightedScore(categorySlug, scores = {}) {
  const dims = dimensionsFor(categorySlug)
  let total = 0
  let weightUsed = 0
  for (const d of dims) {
    const v = scores[d.key]
    if (v === undefined || v === null) continue
    total += Number(v) * d.weight
    weightUsed += d.weight
  }
  if (!weightUsed) return null
  // Renormalise so a partially-scored product still produces a sane number,
  // though frontmatter validation requires all dimensions anyway.
  return total / weightUsed
}

/** The headline 0-5 rating implied by a breakdown. */
export function ratingFromScores(categorySlug, scores) {
  const w = weightedScore(categorySlug, scores)
  return w === null ? null : Math.round((w / 2) * 10) / 10
}

/** Sanity check at module load: a category's weights must sum to 1. */
for (const [slug, dims] of Object.entries(scoreDimensions)) {
  const sum = dims.reduce((a, d) => a + d.weight, 0)
  if (Math.abs(sum - 1) > 0.0001) {
    throw new Error(
      `[scoring] weights for "${slug}" sum to ${sum.toFixed(4)}, must be exactly 1`,
    )
  }
}

/** Plain-language band for a 0-10 dimension score, used in the UI. */
export function scoreBand(value) {
  const n = Number(value)
  if (n >= 8.5) return 'excellent'
  if (n >= 7) return 'good'
  if (n >= 5.5) return 'adequate'
  if (n >= 4) return 'weak'
  return 'poor'
}
