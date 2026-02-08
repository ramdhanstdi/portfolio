import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import AiExpertise from './components/AiExpertise.jsx'
import ContactModal from './components/ContactModal.jsx'
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
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const portfolioItems = useMemo(() => {
    const items = Array.isArray(portfolio.data) ? portfolio.data : []
    return items.map((item) => {
      const imageSrc = item?.image
      return {
        ...item,
        image: {
          src: imageSrc,
          alt: `${item?.title ?? 'Project'} preview`,
        },
      }
    })
  }, [portfolio.data])

  const allTags = useMemo(() => {
    const items = portfolioItems
    const tags = new Set()
    for (const item of items) {
      for (const t of item?.tags ?? []) tags.add(t)
    }
    return Array.from(tags).sort((a, b) => a.localeCompare(b))
  }, [portfolioItems])

  const filteredItems = useMemo(() => {
    if (!activeTag) return portfolioItems
    return portfolioItems.filter((i) => (i?.tags ?? []).includes(activeTag))
  }, [portfolioItems, activeTag])

  function handleCtaClick() {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleOpenContactModal() {
    setIsContactModalOpen(true)
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

  const skipLabel = site.data?.a11y?.skipToContentLabel
  const primaryNavLabel = site.data?.a11y?.primaryNavLabel
  const headerNav = Array.isArray(site.data?.header?.nav) ? site.data.header.nav : []
  const footerLinks = Array.isArray(site.data?.footer?.links) ? site.data.footer.links : []
  const footerText = site.data?.footer?.text ?? ''

  const year = new Date().getFullYear()
  const copyrightTemplate = site.data?.footer?.copyrightTemplate ?? ''
  const copyrightText = copyrightTemplate
    ? copyrightTemplate.replace('{year}', String(year)).replace('{name}', site.data?.hero?.name ?? '')
    : ''

  return (
    <div className="min-h-dvh">
      <ContactModal
        open={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        contact={site.data?.contact}
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded bg-white px-4 py-2 text-slate-900"
      >
        {skipLabel}
      </a>

      <Hero
        site={site.data}
        navItems={headerNav}
        navLabel={primaryNavLabel}
        onCtaClick={handleCtaClick}
        onContactClick={handleOpenContactModal}
      />

      <main id="main">
        <About site={site.data} />
        <AiExpertise content={site.data?.ai} />
        <Portfolio
          items={filteredItems}
          allTags={allTags}
          activeTag={activeTag}
          onChangeTag={setActiveTag}
          content={site.data?.portfolio}
          a11y={site.data?.a11y}
        />
      </main>

      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-300">{footerText}</p>
              {copyrightText ? <p className="mt-2 text-xs text-slate-400">{copyrightText}</p> : null}
            </div>

            {footerLinks.length > 0 ? (
              <nav aria-label={site.data?.a11y?.socialLinksLabel}>
                <ul className="flex flex-wrap gap-4">
                  {footerLinks.map((s) => (
                    <li key={s.href}>
                      <a
                        className="text-sm text-slate-300 underline underline-offset-4 hover:text-white"
                        href={s.href}
                        target={s.external ? '_blank' : undefined}
                        rel={s.external ? 'noreferrer' : undefined}
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
