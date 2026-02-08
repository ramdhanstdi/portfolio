export default function Hero({ site, navItems, navLabel, onCtaClick, onContactClick }) {
  const hero = site?.hero
  const aiHighlightTitle = site?.ai?.highlight?.title
  const aiHighlightDescription = site?.ai?.highlight?.description

  return (
    <header className="border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-center justify-between gap-6">
          <a href="#" className="font-semibold tracking-tight">
            {hero?.name}
          </a>
          {Array.isArray(navItems) && navItems.length > 0 ? (
            <nav aria-label={navLabel}>
              <ul className="flex items-center gap-4 text-sm text-slate-300">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a className="hover:text-white" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            {site?.ui?.hero?.kicker ? (
              <p className="text-sm font-medium text-slate-300">{site.ui.hero.kicker}</p>
            ) : null}
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {hero?.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-200">{hero?.title}</p>
            <p className="mt-3 text-sm text-slate-300">{hero?.location}</p>
            <p className="mt-4 text-base leading-relaxed text-slate-200">{hero?.tagline}</p>

            {aiHighlightTitle && aiHighlightDescription ? (
              <div className="mt-6 max-w-xl rounded-2xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{aiHighlightTitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{aiHighlightDescription}</p>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              {hero?.ctas?.primary ? (
                <a
                  href={hero.ctas.primary.href}
                  onClick={hero.ctas.primary.href === '#portfolio' ? onCtaClick : undefined}
                  className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white/60"
                >
                  {hero.ctas.primary.label}
                </a>
              ) : null}
              {hero?.ctas?.secondary ? (
                hero.ctas.secondary.href === '#contact' ? (
                  <button
                    type="button"
                    onClick={onContactClick}
                    className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    {hero.ctas.secondary.label}
                  </button>
                ) : (
                  <a
                    href={hero.ctas.secondary.href}
                    className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    {hero.ctas.secondary.label}
                  </a>
                )
              ) : null}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/10 to-cyan-500/10 blur-2xl" />
            <div className="mx-auto w-full max-w-sm">
              <img
                src={hero?.profileImage?.src}
                alt={hero?.profileImage?.alt}
                className="mx-auto h-60 w-60 rounded-full border border-slate-800 bg-slate-900/40 object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
