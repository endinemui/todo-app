import { useRef, useState } from 'react'
import { MAX_TASK_LENGTH } from '../constants'
import { PlusIcon } from './icons'

const COUNTER_THRESHOLD = 160

export function TaskComposer({ onAdd }) {
  const [title, setTitle] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  const canSubmit = title.trim().length > 0

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!onAdd(title)) return
    setTitle('')
    inputRef.current?.focus()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`mb-6 flex items-center gap-2 rounded-2xl border bg-surface py-2 pl-4 pr-2 shadow-card transition duration-300 ease-spring sm:mb-7 sm:pl-5 ${
        isFocused ? 'border-accent/55 shadow-lift' : 'border-line'
      }`}
    >
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={MAX_TASK_LENGTH}
        placeholder="Что нужно сделать?"
        aria-label="Новая задача"
        autoComplete="off"
        enterKeyHint="done"
        className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] text-ink placeholder:text-muted/75 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      {title.length >= COUNTER_THRESHOLD && (
        <span className="shrink-0 text-[11px] tabular-nums text-muted/80">
          {title.length}/{MAX_TASK_LENGTH}
        </span>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        aria-label="Добавить задачу"
        className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-accent px-3.5 text-[13px] font-medium text-accent-ink transition duration-200 ease-spring hover:bg-accent/90 active:scale-[0.96] disabled:pointer-events-none disabled:opacity-35 disabled:saturate-50"
      >
        <PlusIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Добавить</span>
      </button>
    </form>
  )
}
