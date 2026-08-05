/**
 * Author and trust data for the homepage credibility strip and /about.
 *
 * ⚠️ EVERY VALUE MARKED PLACEHOLDER IS FABRICATED AND MUST BE REPLACED BEFORE
 * LAUNCH. Do not publish invented credentials, years of experience, or pool
 * counts. For a site giving chemical-handling advice, a made-up credential is
 * the fastest way to lose both readers and search visibility.
 *
 * Replace the strings here and the homepage, about page, and article bylines
 * all update together.
 */
export const authors = {
  lead: {
    name: 'PLACEHOLDER — Lead Author Name',
    role: 'Lead author',
    credential: 'PLACEHOLDER — e.g. CPO-certified pool operator',
    years: 'PLACEHOLDER',
    shortBio:
      'PLACEHOLDER — one sentence: how long on service routes, what kind of pools, what they specialize in.',
  },
  reviewer: {
    name: 'PLACEHOLDER — Technical Reviewer Name',
    role: 'Technical reviewer',
    credential: 'PLACEHOLDER — license or certification',
    years: 'PLACEHOLDER',
    shortBio: 'PLACEHOLDER — one sentence.',
  },
}

/**
 * The trust strip under the hero. `verified: false` marks a claim that is not
 * yet true and must be substantiated or deleted before launch — those render
 * with a visible placeholder tag in development so they cannot ship unnoticed.
 */
export const trustPoints = [
  {
    stat: 'PLACEHOLDER',
    label: 'years on service routes',
    verified: false,
  },
  {
    stat: 'PLACEHOLDER',
    label: 'pools serviced, not researched',
    verified: false,
  },
  {
    stat: 'Every guide',
    label: 'reviewed by a certified operator',
    verified: false,
  },
  {
    stat: 'Cheap fix first',
    label: 'we say so when the $8 fix beats the $400 one',
    verified: true,
  },
]
