/**
 * States we publish regional guides for. `slug` is the URL segment and must
 * match the filename in /content/regional/<slug>.mdx.
 *
 * A state listed here without a matching MDX file simply will not render a
 * page -- the route is generated from content, not from this list. This list
 * controls display order and grouping on /regional.
 */
export const states = [
  { slug: 'arizona', name: 'Arizona', abbr: 'AZ', region: 'Southwest' },
  { slug: 'california', name: 'California', abbr: 'CA', region: 'West' },
  { slug: 'florida', name: 'Florida', abbr: 'FL', region: 'Southeast' },
  { slug: 'georgia', name: 'Georgia', abbr: 'GA', region: 'Southeast' },
  { slug: 'nevada', name: 'Nevada', abbr: 'NV', region: 'Southwest' },
  { slug: 'north-carolina', name: 'North Carolina', abbr: 'NC', region: 'Southeast' },
  { slug: 'ohio', name: 'Ohio', abbr: 'OH', region: 'Midwest' },
  { slug: 'south-carolina', name: 'South Carolina', abbr: 'SC', region: 'Southeast' },
  { slug: 'texas', name: 'Texas', abbr: 'TX', region: 'South' },
]

export const stateBySlug = Object.fromEntries(states.map((s) => [s.slug, s]))

export const regions = [...new Set(states.map((s) => s.region))]
