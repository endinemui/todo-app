import { progressLabel } from '../lib/text'
import { SparkIcon } from './icons'
import { ThemeToggle } from './ThemeToggle'

export function AppHeader({ counts, isDark, onToggleTheme }) {
  const progress = counts.total === 0 ? 0 : Math.round((counts.completed / counts.total) * 100)

  return (
    <header className="mb-7 animate-rise-in sm:mb-9">
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="mb-3 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent">
            <SparkIcon className="h-3.5 w-3.5" />
            <span>Список задач</span>
          </p>
          <h1 className="font-display text-[2.55rem] leading-[1.04] tracking-[-0.015em] text-ink sm:text-[3.15rem]">
            Мои дела<span className="text-accent">.</span>
          </h1>
        </div>

        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div
          className="h-[3px] flex-1 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Прогресс выполнения"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-500 ease-spring"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="shrink-0 text-[11.5px] tabular-nums text-muted">
          {progressLabel(counts.completed, counts.total)}
        </span>
      </div>
    </header>
  )
}
