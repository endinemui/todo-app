/**
 * Thin, crash-proof wrapper around localStorage.
 * The app must keep working when storage is unavailable (private mode, quota, disabled cookies).
 */

export function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch (error) {
    console.warn(`[storage] could not read "${key}"`, error)
    return fallback
  }
}

export function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.warn(`[storage] could not write "${key}"`, error)
    return false
  }
}
