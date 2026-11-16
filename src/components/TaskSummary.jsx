import { remainingLabel } from '../lib/text'

export function TaskSummary({ counts, onClearCompleted }) {
  const hasTasks = counts.total > 0
  const hasCompleted = counts.completed > 0

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-1">
      <p className="text-[12.5px] text-muted">
        {remainingLabel(counts.active, counts.total)}
      </p>

      {hasTasks && (
        <button
          type="button"
          onClick={onClearCompleted}
          disabled={!hasCompleted}
          className="rounded-full px-2.5 py-1 text-[12.5px] text-muted transition duration-200 ease-spring hover:bg-line/60 hover:text-ink active:scale-[0.97] disabled:pointer-events-none disabled:opacity-35"
        >
          Очистить завершённые
          {hasCompleted && (
            <span className="ml-1 tabular-nums text-muted/70">({counts.completed})</span>
          )}
        </button>
      )}
    </div>
  )
}
