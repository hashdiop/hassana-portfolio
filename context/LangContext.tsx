'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Lang, T, TKey } from '@/lib/i18n'

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TKey) => string
}

const LangContext = createContext<LangContextType>({
  lang: 'fr',
  setLang: () => {},
  t: (k) => k,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr')
  const t = (key: TKey): string => T[lang][key]

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
