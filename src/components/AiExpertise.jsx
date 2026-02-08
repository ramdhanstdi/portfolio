export default function AiExpertise({ content }) {
  const title = content?.sectionTitle ?? ''
  const intro = content?.intro ?? ''
  const areas = Array.isArray(content?.areas) ? content.areas : []

  return (
    <section id="ai" className="scroll-mt-24 border-t border-slate-800">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 max-w-3xl text-slate-300 leading-relaxed">{intro}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {areas.map((area) => (
            <article key={area.title} className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
              <h3 className="text-base font-semibold text-white">{area.title}</h3>
              {Array.isArray(area.items) && area.items.length > 0 ? (
                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  {area.items.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
