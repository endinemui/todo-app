import { useCallback, useEffect, useRef, useState } from 'react'
import { STORAGE_KEYS } from '../constants'
import { writeJson } from '../lib/storage'

const THEME_FADE_MS = 450
const THEME_COLORS = { light: '#f6f3ec', dark: '#11100f' }

/** The inline boot script in index.html already resolved the theme — trust it to avoid a flash. */
function readInitialTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme)
  const fadeTimeoutRef = useRef(0)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', THEME_COLORS[theme])
  }, [theme])

  useEffect(() => () => window.clearTimeout(fadeTimeoutRef.current), [])

  const toggleTheme = useCallback(() => {
    const root = document.documentElement
    root.classList.add('theme-fade')
    window.clearTimeout(fadeTimeoutRef.current)
    fadeTimeoutRef.current = window.setTimeout(
      () => root.classList.remove('theme-fade'),
      THEME_FADE_MS,
    )

    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    writeJson(STORAGE_KEYS.theme, nextTheme)
  }, [theme])

  return { theme, isDark: theme === 'dark', toggleTheme }
}
