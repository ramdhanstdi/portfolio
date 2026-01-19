export default function PortfolioCard({ item, onTagClick }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30">
      <div className="relative">
        <img
          src={item.image}
          alt={`${item.title} preview`}
          className="h-44 w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold tracking-tight text-white">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${item.title} tags`}>
          {(item.tags ?? []).map((t) => (
            <li key={t}>
              <button
                type="button"
                onClick={() => onTagClick?.(t)}
                className="rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-xs text-slate-100 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label={`Filter by tag ${t}`}
              >
                {t}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-3">
          {item.liveUrl ? (
            <a
              className="text-sm font-semibold text-white underline underline-offset-4 hover:text-slate-200"
              href={item.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live
            </a>
          ) : null}
          {item.repoUrl ? (
            <a
              className="text-sm font-semibold text-white underline underline-offset-4 hover:text-slate-200"
              href={item.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Repo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
