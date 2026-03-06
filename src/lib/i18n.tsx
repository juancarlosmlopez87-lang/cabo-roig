'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Lang, T } from './translations'

interface I18nContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: T
  langName: string
}

const I18nContext = createContext<I18nContextType>({
  lang: 'es',
  setLang: () => {},
  t: translations.es,
  langName: 'Español',
})

export const langNames: Record<Lang, string> = {
  es: 'Español',
  en: 'English',
  ru: 'Русский',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  nl: 'Nederlands',
  ro: 'Română',
  uk: 'Українська',
  pt: 'Português',
  sv: 'Svenska',
  no: 'Norsk',
  da: 'Dansk',
  fi: 'Suomi',
  pl: 'Polski',
  cs: 'Čeština',
  ar: 'العربية',
  zh: '中文',
}

export const langFlags: Record<Lang, string> = {
  es: '🇪🇸', en: '🇬🇧', ru: '🇷🇺', de: '🇩🇪', fr: '🇫🇷', it: '🇮🇹',
  nl: '🇳🇱', ro: '🇷🇴', uk: '🇺🇦', pt: '🇵🇹', sv: '🇸🇪', no: '🇳🇴',
  da: '🇩🇰', fi: '🇫🇮', pl: '🇵🇱', cs: '🇨🇿', ar: '🇸🇦', zh: '🇨🇳',
}

export function I18nProvider({ children, forceLang }: { children: ReactNode; forceLang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(forceLang || 'es')

  useEffect(() => {
    if (forceLang) return
    const saved = localStorage.getItem('lang') as Lang
    if (saved && translations[saved]) setLangState(saved)
  }, [forceLang])

  function setLang(l: Lang) {
    if (forceLang) return
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  const t = translations[lang] || translations.es

  return (
    <I18nContext.Provider value={{ lang, setLang, t, langName: langNames[lang] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
