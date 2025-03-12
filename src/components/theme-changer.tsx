"use client"

import { useState, useEffect } from 'react'

export default function ThemeChanger() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme ] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTheme(false)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div>
      <p>The current theme is: {theme}</p>
      <button onClick={() => setTheme(false)}>Light Mode</button>
      <button onClick={() => setTheme(true)}>Dark Mode</button>
    </div>
  )
}
