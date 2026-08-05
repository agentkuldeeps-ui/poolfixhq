export const site = {
  name: 'PoolFixHQ',
  tagline: 'Diagnose it. Fix it. Get back in the water.',
  description:
    'Straight answers to pool problems from working service techs. Diagnose green water, cloudy water, pump failures, and chemistry issues, then fix them the cheapest way that actually works.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://poolfixhq.com').replace(/\/$/, ''),
  locale: 'en_US',
  twitter: '@poolfixhq',
  publisher: {
    name: 'PoolFixHQ',
    logo: '/logo.png',
  },
  defaultOgImage: '/og-default.png',
}

export function absoluteUrl(path = '/') {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}
