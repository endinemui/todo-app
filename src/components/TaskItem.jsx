import { IconButton, TrashIcon } from './icons'
import { TaskCheckbox } from './TaskCheckbox'

const STAGGER_STEP_MS = 26
const MAX_STAGGER_STEPS = 10

export function TaskItem({ task, index, onToggle, onRemove }) {
  const checkboxLabel = task.completed
    ? `Снять отметку с задачи «${task.title}»`
    : `Отметить задачу «${task.title}» выполненной`

  return (
    <li
      className="group animate-item-in"
      style={{ animationDelay: `${Math.min(index, MAX_STAGGER_STEPS) * STAGGER_STEP_MS}ms` }}
    >
      <div className="flex items-start gap-3 px-4 py-3.5 sm:px-5">
        <TaskCheckbox
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          label={checkboxLabel}
        />

        {/* The inner span stays inline so the animated strike only spans the text. */}
        <span className="min-w-0 flex-1 pt-px text-[15px] leading-relaxed">
          <span
            className={`strike break-words transition-colors duration-300 ${
              task.completed ? 'strike-on text-muted' : 'text-ink'
            }`}
          >
            {task.title}
          </span>
        </span>

        <IconButton
          label="Удалить задачу"
          onClick={() => onRemove(task.id)}
          className="-my-1 -mr-1.5 h-8 w-8 shrink-0 text-muted/80 opacity-60 transition-opacity duration-200 hover:text-accent group-hover:opacity-100 group-focus-within:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <TrashIcon className="h-[15px] w-[15px]" />
        </IconButton>
      </div>
    </li>
  )
}
