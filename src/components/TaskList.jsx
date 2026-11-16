import { EmptyState } from './EmptyState'
import { TaskItem } from './TaskItem'

export function TaskList({ tasks, filter, onToggle, onRemove }) {
  if (tasks.length === 0) {
    return <EmptyState filter={filter} />
  }

  return (
    <ul className="divide-y divide-line/70 overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}
