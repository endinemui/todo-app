import { FILTERS } from '../constants'

const PREDICATES = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
}

export function filterTasks(tasks, filterId) {
  const predicate = PREDICATES[filterId] ?? PREDICATES.all
  return tasks.filter(predicate)
}

export function filterLabel(filterId) {
  return FILTERS.find((filter) => filter.id === filterId)?.label ?? ''
}
