import { MAX_TASK_LENGTH } from '../constants'

export function createTaskId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `t-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

export function createTask(title) {
  return {
    id: createTaskId(),
    title: title.trim().slice(0, MAX_TASK_LENGTH),
    completed: false,
    createdAt: Date.now(),
  }
}

/**
 * Stored data can be old, hand-edited or corrupted - normalise it to a known shape
 * so a bad entry can never crash rendering.
 */
export function sanitizeTasks(rawTasks) {
  if (!Array.isArray(rawTasks)) return []

  return rawTasks.reduce((tasks, raw) => {
    if (!raw || typeof raw.title !== 'string') return tasks

    const title = raw.title.trim()
    if (!title) return tasks

    tasks.push({
      id: typeof raw.id === 'string' && raw.id ? raw.id : createTaskId(),
      title: title.slice(0, MAX_TASK_LENGTH),
      completed: Boolean(raw.completed),
      createdAt: Number.isFinite(raw.createdAt) ? raw.createdAt : Date.now(),
    })
    return tasks
  }, [])
}
