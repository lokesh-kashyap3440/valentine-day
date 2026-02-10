import React, { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      const isDark = saved === 'dark'
      setDark(isDark)
      apply(isDark)
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      setDark(prefersDark)
      apply(prefersDark)
    }
  }, [])

  function apply(isDark) {
    if (isDark) document.documentElement.classList.add('theme-dark')
    else document.documentElement.classList.remove('theme-dark')
  }

  function toggle() {
    const next = !dark
    setDark(next)
    apply(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? '☾ Dark' : '☀️ Light'}
    </button>
  )
}
