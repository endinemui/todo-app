import { useCallback, useMemo } from 'react'
import { STORAGE_KEYS } from '../constants'
import { createTask, sanitizeTasks } from '../lib/tasks'
import { useLocalStorage } from './useLocalStorage'

export function useTasks() {
  const [storedTasks, setStoredTasks] = useLocalStorage(STORAGE_KEYS.tasks, [])

  const tasks = useMemo(() => sanitizeTasks(storedTasks), [storedTasks])

  const addTask = useCallback(
    (title) => {
      const trimmed = title.trim()
      if (!trimmed) return false

      // Build the task outside the updater so the state function stays pure.
      const task = createTask(trimmed)
      setStoredTasks((current) => [task, ...sanitizeTasks(current)])
      return true
    },
    [setStoredTasks],
  )

  const toggleTask = useCallback(
    (id) => {
      setStoredTasks((current) =>
        sanitizeTasks(current).map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      )
    },
    [setStoredTasks],
  )

  const removeTask = useCallback(
    (id) => {
      setStoredTasks((current) => sanitizeTasks(current).filter((task) => task.id !== id))
    },
    [setStoredTasks],
  )

  const clearCompleted = useCallback(() => {
    setStoredTasks((current) => sanitizeTasks(current).filter((task) => !task.completed))
  }, [setStoredTasks])

  const counts = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length
    return { total: tasks.length, completed, active: tasks.length - completed }
  }, [tasks])

  return { tasks, counts, addTask, toggleTask, removeTask, clearCompleted }
}
