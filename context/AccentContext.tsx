'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type ThemeName = 'jade' | 'cobalt' | 'amber' | 'coral' | 'violet'

export const THEMES: Record<ThemeName, { label: string; accent: string; hover: string; rgb: string }> = {
  jade:    { label: 'Jade',      accent: '#10b981', hover: '#059669', rgb: '16,185,129'  },
  cobalt:  { label: 'Cobalt',    accent: '#3b82f6', hover: '#2563eb', rgb: '59,130,246'  },
  amber:   { label: 'Ambre',     accent: '#d97706', hover: '#b45309', rgb: '217,119,6'   },
  coral:   { label: 'Corail',    accent: '#f97316', hover: '#ea580c', rgb: '249,115,22'  },
  violet:  { label: 'Améthyste', accent: '#8b5cf6', hover: '#7c3aed', rgb: '139,92,246'  },
}

const KEY = 'chd-accent'

export function apply(name: ThemeName) {
  const { accent, hover, rgb } = THEMES[name]
  const r = document.documentElement
  r.style.setProperty('--accent',        accent)
  r.style.setProperty('--accent-hover',  hover)
  r.style.setProperty('--accent-rgb',    rgb)
  r.style.setProperty('--accent-bg',     `rgba(${rgb},.08)`)
  r.style.setProperty('--accent-border', `rgba(${rgb},.22)`)
  r.style.setProperty('--accent-strong', `rgba(${rgb},.35)`)
  r.style.setProperty('--accent-grid',   `rgba(${rgb},.025)`)
}

interface Ctx {
  theme: ThemeName
  setTheme: (t: ThemeName) => void
  needsPick: boolean          // true on first visit
  showPicker: boolean         // navbar-triggered
  openPicker: () => void
  closePicker: () => void
}

const AccentContext = createContext<Ctx>({
  theme: 'jade', setTheme: () => {}, needsPick: false,
  showPicker: false, openPicker: () => {}, closePicker: () => {},
})

export function AccentProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState]    = useState<ThemeName>('jade')
  const [needsPick, setNeedsPick] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as ThemeName | null
    if (saved && THEMES[saved]) {
      setThemeState(saved)
      apply(saved)
    } else {
      apply('jade')
      setNeedsPick(true)
    }
  }, [])

  const setTheme = (t: ThemeName) => {
    localStorage.setItem(KEY, t)
    if (needsPick) {
      // First visit — apply without reload
      setThemeState(t)
      apply(t)
      setNeedsPick(false)
    } else {
      // Post-load change — reload for full consistency
      window.location.reload()
    }
    setShowPicker(false)
  }

  return (
    <AccentContext.Provider value={{
      theme, setTheme, needsPick,
      showPicker,
      openPicker:  () => setShowPicker(true),
      closePicker: () => setShowPicker(false),
    }}>
      {children}
    </AccentContext.Provider>
  )
}

export const useAccent = () => useContext(AccentContext)
