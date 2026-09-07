/**
 * Safety warning. Rendering this on a page makes citing a real source
 * mandatory -- lib/frontmatter.js fails the build otherwise.
 *
 * Reserved for genuine injury risk: chemical handling, gas, electrical,
 * entrapment, drowning. Not for "this might void your warranty". Diluting a
 * safety component with warranty notes teaches readers to skip it, which is
 * the one outcome that actually costs someone.
 *
 * role="note" plus an explicit label so a screen reader announces this as a
 * distinct region rather than as body text.
 */
export default function SafetyWarning({ title = 'Safety', children }) {
  return (
    <aside
      role="note"
      aria-label={title}
      className="my-8 overflow-hidden rounded-xl border-2 border-verdict-bad/30 bg-verdict-badBg"
    >
      <div className="flex items-center gap-2 border-b border-verdict-bad/20 px-5 py-3">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-verdict-bad" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
        <p className="text-[11px] font-bold uppercase tracking-widest text-verdict-bad">{title}</p>
      </div>
      <div className="prose prose-slate max-w-none px-5 py-5 prose-p:text-[16px] prose-p:leading-relaxed prose-strong:text-verdict-bad">
        {children}
      </div>
    </aside>
  )
}
