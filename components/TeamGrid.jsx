import { team, initials } from '@/lib/team'

/**
 * Team grid for the About page.
 *
 * Photos are optional by design: a member with `photo: null` renders an
 * initials avatar at the same dimensions, so the grid never shows a broken
 * image and never shifts layout when photos are added later.
 *
 * Plain <img> with explicit width/height rather than next/image — same
 * reasoning as ProductBlock. Square crop is enforced with aspect-square +
 * object-cover so mixed source dimensions still line up.
 */
export default function TeamGrid() {
  if (!team.length) return null

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member) => (
        <li
          key={member.id}
          className="flex flex-col rounded-xl border border-slate-200 bg-white p-5"
        >
          <div className="mb-4 w-24">
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                width={240}
                height={240}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-full bg-slate-100 object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex aspect-square w-full items-center justify-center rounded-full bg-pool-100 text-2xl font-bold text-pool-700"
              >
                {initials(member.name)}
              </div>
            )}
          </div>

          <h3 className="text-lg font-bold text-pool-900">
            {member.name}
            {member.placeholder && (
              <span className="ml-2 align-middle rounded bg-accent-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-800">
                placeholder
              </span>
            )}
          </h3>

          <p className="mt-0.5 text-sm font-semibold text-pool-600">{member.role}</p>

          {member.credential && (
            <p className="mt-1 text-sm text-slate-500">{member.credential}</p>
          )}

          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{member.bio}</p>
        </li>
      ))}
    </ul>
  )
}
