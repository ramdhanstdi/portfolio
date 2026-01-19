export default function About({ site }) {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">About</h2>
        <p className="mt-4 max-w-3xl text-slate-200 leading-relaxed">
          {site?.bio ?? 'Write a short bio in src/data/site.json.'}
        </p>

        <div className="mt-10">
          <h3 className="text-sm font-semibold text-slate-300">Skills</h3>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Skills">
            {(site?.skills ?? []).map((skill) => (
              <li key={skill}>
                <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1 text-sm text-slate-100">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
