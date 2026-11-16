import { useEffect, useState } from 'react'
import { readJson, writeJson } from '../lib/storage'

/**
 * useState that mirrors its value into localStorage.
 * Reads lazily so the stored value is used on the very first render.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = readJson(key, undefined)
    return stored === undefined ? initialValue : stored
  })

  useEffect(() => {
    writeJson(key, value)
  }, [key, value])

  return [value, setValue]
}
