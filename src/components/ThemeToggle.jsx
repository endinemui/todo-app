import { MoonIcon, SunIcon } from './icons'

export function ThemeToggle({ isDark, onToggle }) {
  const label = isDark ? 'Включить светлую тему' : 'Включить тёмную тему'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      aria-pressed={isDark}
      className="group relative mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-surface text-ink shadow-card transition duration-300 ease-spring hover:border-accent/50 hover:text-accent active:scale-95"
    >
      <span className="sr-only">{label}</span>
      <SunIcon
        className={`absolute h-[18px] w-[18px] transition-all duration-500 ease-spring ${
          isDark ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      />
      <MoonIcon
        className={`absolute h-[17px] w-[17px] transition-all duration-500 ease-spring ${
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
        }`}
      />
    </button>
  )
}
