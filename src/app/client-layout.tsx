'use client'
import { useState } from 'react'
import { I18nProvider, useI18n, langNames, langFlags } from '@/lib/i18n'
import { Lang } from '@/lib/translations'
import Link from 'next/link'

function Navigation() {
  const { t, lang, setLang } = useI18n()
  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const allLangs = Object.keys(langNames) as Lang[]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#c9a96e] flex items-center justify-center relative">
              <span className="text-[#c9a96e] text-lg font-bold" style={{ fontFamily: 'Playfair Display' }}>D</span>
              {/* Diamond sparkle */}
              <span className="absolute -top-1 -right-1 text-[8px] text-[#c9a96e]">◆</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-white">Diamant Blue</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">Cabo Roig</p>
            </div>
          </a>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-xs tracking-[0.2em] uppercase text-[#b8b8b8] hover:text-[#c9a96e] transition-colors">Inicio</a>
              <a href="/apartamentos" className="text-xs tracking-[0.2em] uppercase text-[#b8b8b8] hover:text-[#c9a96e] transition-colors">{t.nav_apartments}</a>
              <a href="/#ubicacion" className="text-xs tracking-[0.2em] uppercase text-[#b8b8b8] hover:text-[#c9a96e] transition-colors">{t.nav_location}</a>
              <a href="/#contacto" className="text-xs tracking-[0.2em] uppercase text-[#b8b8b8] hover:text-[#c9a96e] transition-colors">{t.nav_contact}</a>
            </div>

            {/* Language selector */}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 border border-[#333] text-xs text-[#b8b8b8] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all">
                <span>{langFlags[lang]}</span>
                <span className="hidden sm:inline uppercase">{lang}</span>
                <span className="text-[10px]">▼</span>
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 z-50 bg-[#1a1a1a] border border-[#333] max-h-80 overflow-y-auto w-48 shadow-xl">
                    {allLangs.map(l => (
                      <button key={l} onClick={() => { setLang(l); setLangOpen(false) }}
                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-[#c9a96e]/10 transition-colors ${lang === l ? 'text-[#c9a96e] bg-[#c9a96e]/5' : 'text-[#ccc]'}`}>
                        <span>{langFlags[l]}</span>
                        <span>{langNames[l]}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link href="/reservar" className="btn-gold text-xs !px-5 !py-2.5 hidden sm:inline-flex">{t.nav_reserve}</Link>

            {/* Hamburger mobile */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2">
              <span className={`w-6 h-0.5 bg-[#c9a96e] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-[#c9a96e] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-[#c9a96e] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5" style={{ background: 'rgba(10,10,10,0.95)' }}>
          <div className="px-6 py-6 flex flex-col gap-4">
            <a href="/" onClick={() => setMenuOpen(false)} className="text-sm tracking-[0.15em] uppercase text-[#b8b8b8] hover:text-[#c9a96e] transition-colors">Inicio</a>
            <a href="/apartamentos" onClick={() => setMenuOpen(false)} className="text-sm tracking-[0.15em] uppercase text-[#b8b8b8] hover:text-[#c9a96e] transition-colors">{t.nav_apartments}</a>
            <a href="/#ubicacion" onClick={() => setMenuOpen(false)} className="text-sm tracking-[0.15em] uppercase text-[#b8b8b8] hover:text-[#c9a96e] transition-colors">{t.nav_location}</a>
            <a href="/#contacto" onClick={() => setMenuOpen(false)} className="text-sm tracking-[0.15em] uppercase text-[#b8b8b8] hover:text-[#c9a96e] transition-colors">{t.nav_contact}</a>
            <Link href="/reservar" onClick={() => setMenuOpen(false)} className="btn-gold text-xs text-center mt-2">{t.nav_reserve}</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function Footer() {
  const { t } = useI18n()

  return (
    <footer className="section-darker border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border border-[#c9a96e] flex items-center justify-center relative">
                <span className="text-[#c9a96e] text-lg font-bold" style={{ fontFamily: 'Playfair Display' }}>D</span>
                <span className="absolute -top-1 -right-1 text-[8px] text-[#c9a96e]">◆</span>
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] uppercase">◆ Diamant Blue</p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">Cabo Roig</p>
              </div>
            </div>
            <p className="text-sm text-[#888] leading-relaxed">{t.ftr_exclusive_apts}</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-4">{t.ftr_exclusive_comm}</p>
            <div className="space-y-2 text-sm text-[#888]">
              <p className="text-white font-semibold">INMOBANCA</p>
              <p>Juan Carlos Martínez · +34 620 300 647</p>
              <p>Belén Cerón · +34 662 600 893</p>
              <p>inmobancamurcia@gmail.com</p>
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-4">{t.ftr_legal}</p>
            <div className="space-y-2 text-sm text-[#888]">
              <a href="/contrato-exclusividad" className="block hover:text-[#c9a96e] transition-colors">{t.ftr_contract}</a>
              <p>{t.ftr_notice}</p>
              <p>{t.ftr_privacy}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#555]">&copy; 2026 INMOBANCA. {t.ftr_rights}</p>
          <p className="text-xs text-[#555]">{t.ftr_comm_of}</p>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      {open && (
        <div className="mb-3 bg-[#1a1a1a] border border-[#c9a96e]/20 shadow-2xl p-4 w-64">
          <p className="text-xs tracking-[0.15em] uppercase text-[#c9a96e] mb-3">Contactar por WhatsApp</p>
          <a href="https://wa.me/34620300647?text=Hola%2C%20me%20interesan%20los%20apartamentos%20de%20Diamant%20Blue%20Cabo%20Roig"
            target="_blank" rel="noopener" className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors">
            <span className="text-2xl">📱</span>
            <div><p className="text-sm text-white">Juan Carlos</p><p className="text-xs text-[#888]">+34 620 300 647</p></div>
          </a>
          <a href="https://wa.me/34662600893?text=Hola%2C%20me%20interesan%20los%20apartamentos%20de%20Diamant%20Blue%20Cabo%20Roig"
            target="_blank" rel="noopener" className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors">
            <span className="text-2xl">📱</span>
            <div><p className="text-sm text-white">Belen Ceron</p><p className="text-xs text-[#888]">+34 662 600 893</p></div>
          </a>
        </div>
      )}
      <button onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        style={{ background: '#25D366' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>
    </div>
  )
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <Navigation />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  )
}
