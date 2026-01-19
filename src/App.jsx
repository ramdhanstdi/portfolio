import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Portfolio from './components/Portfolio.jsx'

function useJsonAsset(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) {
          throw new Error(`Failed to load ${url}: ${res.status} ${res.statusText}`)
        }
        const json = await res.json()
        setData(json)
      } catch (e) {
        if (e?.name === 'AbortError') return
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    load()

    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}

export default function App() {
  // NOTE: Using fetch + asset URLs means the app reads JSON at runtime.
  // In dev, editing JSON should reflect immediately (page reload may occur).
  const siteUrl = new URL('./data/site.json', import.meta.url).toString()
  const portfolioUrl = new URL('./data/portfolio.json', import.meta.url).toString()

  const site = useJsonAsset(siteUrl)
  const portfolio = useJsonAsset(portfolioUrl)

  const [activeTag, setActiveTag] = useState(null)

  const allTags = useMemo(() => {
    const items = Array.isArray(portfolio.data) ? portfolio.data : []
    const tags = new Set()
    for (const item of items) {
      for (const t of item?.tags ?? []) tags.add(t)
    }
    return Array.from(tags).sort((a, b) => a.localeCompare(b))
  }, [portfolio.data])

  const filteredItems = useMemo(() => {
    const items = Array.isArray(portfolio.data) ? portfolio.data : []
    if (!activeTag) return items
    return items.filter((i) => (i?.tags ?? []).includes(activeTag))
  }, [portfolio.data, activeTag])

  function handleCtaClick() {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (site.loading || portfolio.loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center px-6">
        <p className="text-slate-200">Loading…</p>
      </div>
    )
  }

  if (site.error || portfolio.error) {
    return (
      <div className="min-h-dvh flex items-center justify-center px-6">
        <div className="max-w-xl">
          <h1 className="text-2xl font-semibold">Could not load content</h1>
          <p className="mt-3 text-slate-200">
            Check that <code className="text-slate-100">src/data/site.json</code> and{' '}
            <code className="text-slate-100">src/data/portfolio.json</code> are valid JSON.
          </p>
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-900/60 p-4 text-sm text-slate-200">
            {String(site.error ?? portfolio.error)}
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded bg-white px-4 py-2 text-slate-900"
      >
        Skip to content
      </a>

      <Hero site={site.data} onCtaClick={handleCtaClick} />

      <main id="main">
        <About site={site.data} />
        <Portfolio
          items={filteredItems}
          allTags={allTags}
          activeTag={activeTag}
          onChangeTag={setActiveTag}
        />
      </main>

      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-300">
                {site.data?.contactEmail ? (
                  <>
                    Contact:{' '}
                    <a
                      className="underline underline-offset-4 hover:text-white"
                      href={`mailto:${site.data.contactEmail}`}
                    >
                      {site.data.contactEmail}
                    </a>
                  </>
                ) : (
                  <>Thanks for visiting.</>
                )}
              </p>
              <p className="mt-2 text-xs text-slate-400">© {new Date().getFullYear()} {site.data?.name ?? 'Portfolio'}</p>
            </div>

            {Array.isArray(site.data?.social) && site.data.social.length > 0 ? (
              <nav aria-label="Social links">
                <ul className="flex flex-wrap gap-4">
                  {site.data.social.map((s) => (
                    <li key={s.url}>
                      <a
                        className="text-sm text-slate-300 underline underline-offset-4 hover:text-white"
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </div>
      </footer>
    </div>
  )
}
