export default function TagFilter({ tags, activeTag, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Portfolio tag filter">
      <button
        type="button"
        className={
          activeTag
            ? 'rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-xs text-slate-100 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-white/30'
            : 'rounded-full border border-white/30 bg-white px-3 py-1 text-xs font-semibold text-slate-950 focus:outline-none focus:ring-2 focus:ring-white/60'
        }
        onClick={() => onChange?.(null)}
        aria-pressed={!activeTag}
      >
        All
      </button>

      {tags.map((t) => {
        const isActive = activeTag === t
        return (
          <button
            key={t}
            type="button"
            className={
              isActive
                ? 'rounded-full border border-white/30 bg-white px-3 py-1 text-xs font-semibold text-slate-950 focus:outline-none focus:ring-2 focus:ring-white/60'
                : 'rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-xs text-slate-100 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-white/30'
            }
            onClick={() => onChange?.(t)}
            aria-pressed={isActive}
          >
            {t}
          </button>
        )
      })}
    </div>
  )
}
