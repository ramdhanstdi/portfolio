export default function Hero({ site, onCtaClick }) {
  return (
    <header className="border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-center justify-between gap-6">
          <a href="#" className="font-semibold tracking-tight">
            {site?.name ?? 'Your Name'}
          </a>
          <nav aria-label="Primary">
            <ul className="flex items-center gap-4 text-sm text-slate-300">
              <li>
                <a className="hover:text-white" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#portfolio">
                  Portfolio
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium text-slate-300">Hi, I'm</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {site?.name ?? 'Your Name'}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-200">
              {site?.headline ?? 'A short headline describing what you do.'}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onCtaClick}
                className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                See my work
              </button>
              <a
                href="#about"
                className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Learn more
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/10 to-cyan-500/10 blur-2xl" />
            <img
              src={site?.heroImage ?? '/images/hero.svg'}
              alt={`${site?.name ?? 'Person'} hero image`}
              className="aspect-[4/3] w-full rounded-3xl border border-slate-800 bg-slate-900/40 object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
