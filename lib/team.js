/**
 * TEAM — single source of truth for the About page grid and Person schema.
 *
 * ⚠️ EVERY ENTRY BELOW IS A PLACEHOLDER. Names are deliberately obvious
 * ("Team Member One") rather than realistic, because a live site listing
 * invented people is far worse than one that's visibly unfinished.
 *
 * To publish a real person:
 *   1. Replace name / role / bio with real, verifiable detail.
 *   2. Drop a square photo (600x600+, jpg or webp) in /public/team/ and set
 *      `photo: '/team/their-file.jpg'`. Leave null and the card renders an
 *      initials avatar instead — no broken image, no layout shift.
 *   3. Set `placeholder: false`. ONLY entries with placeholder:false are
 *      emitted as Person structured data. Fabricated people must never reach
 *      schema.org markup.
 *   4. `credential` is optional and must be real. No certification numbers,
 *      no invented years of service. Omit rather than guess.
 */
export const team = [
  {
    id: 'member-1',
    name: 'Team Member One',
    role: 'Placeholder role — e.g. Founder, lead author',
    credential: null,
    bio: 'Placeholder bio. Two sentences: what they actually do here, and the specific thing that qualifies them for it. Concrete beats impressive.',
    photo: null,
    placeholder: true,
  },
  {
    id: 'member-2',
    name: 'Team Member Two',
    role: 'Placeholder role — e.g. Equipment editor',
    credential: null,
    bio: 'Placeholder bio. Name the hardware they actually work on, not "years of experience".',
    photo: null,
    placeholder: true,
  },
  {
    id: 'member-3',
    name: 'Team Member Three',
    role: 'Placeholder role — e.g. Water chemistry review',
    credential: null,
    bio: 'Placeholder bio. If this person reviews chemistry, their credential belongs here — and it must be real.',
    photo: null,
    placeholder: true,
  },
  {
    id: 'member-4',
    name: 'Team Member Four',
    role: 'Placeholder role — e.g. Regional contributor',
    credential: null,
    bio: 'Placeholder bio. Regional contributors should say which climate they actually work in.',
    photo: null,
    placeholder: true,
  },
  {
    id: 'member-5',
    name: 'Team Member Five',
    role: 'Placeholder role — e.g. Testing and photography',
    credential: null,
    bio: 'Placeholder bio. Keep it to what they do, not how they feel about pools.',
    photo: null,
    placeholder: true,
  },
]

/** True while any team entry is still a placeholder. Drives the on-page notice. */
export const teamHasPlaceholders = team.some((m) => m.placeholder)

/** Only real people become Person structured data. */
export const realTeam = team.filter((m) => !m.placeholder)

/** "Jane Miller" -> "JM". Used for the no-photo avatar fallback. */
export function initials(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}
