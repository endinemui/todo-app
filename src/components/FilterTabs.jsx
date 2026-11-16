import { FILTERS } from '../constants'

export function FilterTabs({ value, onChange }) {
  const activeIndex = Math.max(
    0,
    FILTERS.findIndex((filter) => filter.id === value),
  )

  return (
    <div
      role="tablist"
      aria-label="Фильтр задач"
      className="relative mb-4 grid grid-cols-3 rounded-full border border-line/80 bg-line/30 p-1"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-1 left-1 rounded-full bg-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-line/70 transition-transform duration-300 ease-spring"
        style={{
          width: 'calc((100% - 0.5rem) / 3)',
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />

      {FILTERS.map((filter) => {
        const isActive = filter.id === value
        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter.id)}
            className={`relative z-10 truncate rounded-full px-1 py-1.5 text-[12.5px] font-medium transition-colors duration-200 ${
              isActive ? 'text-ink' : 'text-muted hover:text-ink'
            }`}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
