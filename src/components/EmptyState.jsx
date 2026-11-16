import { InboxIcon } from './icons'

const MESSAGES = {
  all: {
    title: 'Пока ни одной задачи',
    hint: 'Добавьте первую задачу выше — и список оживёт.',
  },
  active: {
    title: 'Активных задач нет',
    hint: 'Всё выполнено. Можно выдохнуть.',
  },
  completed: {
    title: 'Завершённых пока нет',
    hint: 'Отметьте задачу галочкой — она появится здесь.',
  },
}

export function EmptyState({ filter }) {
  const { title, hint } = MESSAGES[filter] ?? MESSAGES.all

  return (
    <div className="animate-fade-in rounded-2xl border border-dashed border-line bg-surface/40 px-6 py-12 text-center">
      <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
        <InboxIcon className="h-5 w-5" />
      </span>
      <p className="text-[14.5px] font-medium text-ink">{title}</p>
      <p className="mx-auto mt-1.5 max-w-[22rem] text-[13px] leading-relaxed text-muted">
        {hint}
      </p>
    </div>
  )
}
