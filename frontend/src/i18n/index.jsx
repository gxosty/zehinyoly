import { createContext, useContext, useState, useCallback, useEffect } from 'react'

import en from './en.json'
import ru from './ru.json'
import tk from './tk.json'

const STORAGE_KEY = 'locale'
const FALLBACK_LOCALE = 'en'

const messages = { en, ru, tk }

export const LocaleContext = createContext(null)

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (messages[saved]) return saved
    } catch {}
    return FALLBACK_LOCALE
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const setLocale = useCallback((l) => {
    if (!messages[l]) return
    setLocaleState(l)
  }, [])

  const t = useCallback(
    (key, vars = {}) => {
      const msg = messages[locale]?.[key] ?? messages[FALLBACK_LOCALE]?.[key] ?? key
      return Object.entries(vars).reduce(
        (acc, [k, v]) => acc.replace(`{${k}}`, v),
        msg
      )
    },
    [locale]
  )

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
