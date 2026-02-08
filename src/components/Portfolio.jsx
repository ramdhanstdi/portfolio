import PortfolioCard from './PortfolioCard.jsx'
import TagFilter from './TagFilter.jsx'

export default function Portfolio({ items, allTags, activeTag, onChangeTag, content, a11y }) {
  return (
    <section id="portfolio" className="scroll-mt-24 border-t border-slate-800">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{content?.sectionTitle}</h2>
            <p className="mt-2 text-slate-300">{content?.intro}</p>
          </div>
          <TagFilter
            tags={allTags}
            activeTag={activeTag}
            onChange={onChangeTag}
            label={a11y?.portfolioTagFilterLabel ?? content?.filter?.label}
            allLabel={content?.filter?.allLabel}
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <PortfolioCard key={item.id} item={item} onTagClick={onChangeTag} links={content?.links} />
          ))}
        </div>

        {items.length === 0 ? (
          <p className="mt-10 text-slate-300">{content?.emptyState}</p>
        ) : null}
      </div>
    </section>
  )
}
