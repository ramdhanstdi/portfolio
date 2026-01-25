export default function About({ site }) {
  const aboutTitle = site?.about?.sectionTitle ?? ''
  const aboutParagraphs = Array.isArray(site?.about?.paragraphs)
    ? site.about.paragraphs
    : site?.bio
      ? [site.bio]
      : []

  const skillsTitle = site?.skills?.sectionTitle ?? ''
  const skillsGroups = Array.isArray(site?.skills?.groups) ? site.skills.groups : []
  const flatSkills = skillsGroups.flatMap((g) => (Array.isArray(g?.items) ? g.items : []))

  return (
    <section id="about" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">{aboutTitle}</h2>

        {aboutParagraphs.map((p) => (
          <p key={p} className="mt-4 max-w-3xl text-slate-200 leading-relaxed">
            {p}
          </p>
        ))}

        <div className="mt-10">
          <h3 className="text-sm font-semibold text-slate-300">{skillsTitle}</h3>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={site?.a11y?.skillsListLabel}>
            {flatSkills.map((skill) => (
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
