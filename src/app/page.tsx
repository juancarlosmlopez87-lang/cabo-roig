'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { apartments, formatEur } from '@/lib/apartments'
import { useI18n } from '@/lib/i18n'

/* ══════════════════════════════════════════════════════════════
   REAL DIAMANT BLUE PHOTOS from costablanca-hotels.com
   ══════════════════════════════════════════════════════════════ */
const CB = 'https://apart-diamant-blue.costablanca-hotels.com/data/Pics/OriginalPhoto'
const REAL = {
  lobby:    `${CB}/15804/1580457/1580457955/aparthotel-diamant-blue-orihuela-pic-1.JPEG`,
  bathroom: `${CB}/6976/697608/697608759/aparthotel-diamant-blue-orihuela-pic-48.JPEG`,
  bedroom1: `${CB}/6976/697608/697608579/aparthotel-diamant-blue-orihuela-pic-43.JPEG`,
  seaView:  `${CB}/1928/192890/192890386/aparthotel-diamant-blue-orihuela-pic-12.JPEG`,
  pool:     `${CB}/6976/697608/697608798/aparthotel-diamant-blue-orihuela-pic-35.JPEG`,
  terrace:  `${CB}/6976/697609/697609272/aparthotel-diamant-blue-orihuela-pic-13.JPEG`,
  bedroom2: `${CB}/6976/697609/697609743/aparthotel-diamant-blue-orihuela-pic-7.JPEG`,
  living:   `${CB}/5161/516151/516151083/aparthotel-diamant-blue-orihuela-pic-58.JPEG`,
  marina:   `${CB}/1761/176133/176133465/aparthotel-diamant-blue-orihuela-pic-20.JPEG`,
  dining:   `${CB}/2917/291798/291798236/aparthotel-diamant-blue-orihuela-pic-57.JPEG`,
}

/* getaroom exterior */
const GA = 'https://images.getaroom-cdn.com/image/upload/s--'
const DB_EXTERIOR = `${GA}KtAwSW2U--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1769578125/864f5fdbb97a797431477845b405cdd0ab6475a5`

/* diamantblue.com zone photos */
const ZONE = 'https://diamantblue.com/images/stories'
const ZONE_IMGS = {
  strip:   `${ZONE}/xslide1.jpg.pagespeed.ic.I4M4sKQsVM.jpg`,
  coast:   `${ZONE}/xslide2.jpg.pagespeed.ic.EpjPHoTJLa.jpg`,
  beach:   `${ZONE}/xslide3.jpg.pagespeed.ic.e3LlOtwGma.jpg`,
  calas:   `${ZONE}/xslide5.jpg.pagespeed.ic.7Lv0k7I5Or.jpg`,
  diver:   `${ZONE}/xslide6.jpg.pagespeed.ic.TA9tra7WhO.jpg`,
  nautico: `${ZONE}/xslide11.jpg.pagespeed.ic.pfYgG3DoMn.jpg`,
}

/* Unsplash — aspirational luxury interiors (supplement real photos) */
const UNS = 'https://images.unsplash.com'
const LUXURY = {
  hero:      `${UNS}/photo-1507525428034-b723cf961d3e?w=1920&q=85`,
  living1:   `${UNS}/photo-1600585154340-be6161a56a0c?w=940&q=80`,
  living2:   `${UNS}/photo-1600596542815-ffad4c1539a9?w=940&q=80`,
  kitchen:   `${UNS}/photo-1600566753086-00f18fb6b3ea?w=940&q=80`,
  bedroom:   `${UNS}/photo-1616594039964-ae9021a400a0?w=940&q=80`,
  bath:      `${UNS}/photo-1600607687939-ce8a6c25118c?w=940&q=80`,
  terrace:   `${UNS}/photo-1600607687644-c7171b42498f?w=940&q=80`,
  sunset:    `${UNS}/photo-1559827260-dc66d52bef19?w=1920&q=85`,
  coast:     `${UNS}/photo-1544550581-5f7ceaf7f992?w=1920&q=85`,
  bars:      `${UNS}/photo-1566417713940-fe7c737a9ef2?w=940&q=80`,
  nightlife: `${UNS}/photo-1514933651103-005eec06c04b?w=940&q=80`,
}

/* Per-apartment card images — mix of real + luxury */
const aptImages: Record<string, string> = {
  '3a': LUXURY.living1,
  '3b': REAL.seaView,
  '3c': LUXURY.bedroom,
  '3d': LUXURY.terrace,
  '3e': LUXURY.living2,
  '3f': REAL.dining,
  '4a': LUXURY.kitchen,
  '4b': REAL.marina,
  '4c': LUXURY.bath,
  '4d': REAL.seaView,
  '4e': LUXURY.living1,
  '4f': REAL.terrace,
}

/* ══════════════════════════════════════════════════════════════
   HOOKS
   ══════════════════════════════════════════════════════════════ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(c => observer.observe(c))
    return () => observer.disconnect()
  }, [])
  return ref
}

function useCounter(target: number, duration = 2000) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return { value, ref }
}

/* ══════════════════════════════════════════════════════════════
   HERO CAROUSEL IMAGES
   ══════════════════════════════════════════════════════════════ */
const heroSlides = [
  { img: REAL.seaView, label: 'Vista al Mediterraneo desde Diamant Blue' },
  { img: DB_EXTERIOR, label: 'Apartahotel Diamant Blue - Fachada' },
  { img: ZONE_IMGS.beach, label: 'Playa de Cabo Roig' },
  { img: REAL.pool, label: 'Piscina comunitaria' },
  { img: ZONE_IMGS.beach, label: 'Playa de Cabo Roig - Bandera Azul' },
]

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════ */
export default function Home() {
  const { t } = useI18n()
  const floor3 = apartments.filter(a => a.floor === 3)
  const floor4 = apartments.filter(a => a.floor === 4)
  const avgPrice = Math.round(apartments.reduce((s, a) => s + a.price, 0) / apartments.length)
  const available = apartments.filter(a => a.status === 'available').length
  const revealRef = useReveal()

  /* Hero carousel state */
  const [heroIdx, setHeroIdx] = useState(0)
  const heroTimerRef = useRef<ReturnType<typeof setInterval>>()
  useEffect(() => {
    heroTimerRef.current = setInterval(() => setHeroIdx(i => (i + 1) % heroSlides.length), 5000)
    return () => clearInterval(heroTimerRef.current)
  }, [])

  /* Video */
  const [videoOpen, setVideoOpen] = useState(false)
  const VIDEO_URL = 'https://assets.mixkit.co/videos/51500/51500-1080.mp4'

  /* Gallery lightbox */
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null)

  /* Counters */
  const c1 = useCounter(12)
  const c2 = useCounter(300)
  const c3 = useCounter(200)
  const c4 = useCounter(166)

  return (
    <div ref={revealRef}>
      {/* ============ HERO — FULL SCREEN CAROUSEL ============ */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Carousel images */}
        {heroSlides.map((slide, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-[2000ms] ${i === heroIdx ? 'opacity-100' : 'opacity-0'}`}>
            <img src={slide.img} alt={slide.label}
              className="w-full h-full object-cover"
              style={{ animation: i === heroIdx ? 'slowZoom 12s ease-in-out forwards' : 'none' }} />
          </div>
        ))}
        <div className="hero-overlay absolute inset-0 z-[1]" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-12 h-px bg-[#c9a96e]" />
            <span className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-[#c9a96e] font-medium">{t.hero_exclusive}</span>
            <div className="w-12 h-px bg-[#c9a96e]" />
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light mb-4 sm:mb-6 leading-[0.92] tracking-tight" style={{ fontFamily: 'Playfair Display' }}>
            {t.hero_title_1}<br />
            <span className="italic gold-shimmer">{t.hero_title_2}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#d4d4d4] font-light max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">{t.hero_desc}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
            <a href="#apartamentos" className="btn-gold w-full sm:w-auto">{t.hero_discover}</a>
            <a href="/reservar" className="btn-outline w-full sm:w-auto">{t.hero_reserve}</a>
          </div>

          {/* Play video button */}
          <button onClick={() => setVideoOpen(true)}
            className="group inline-flex items-center gap-3 text-[#c9a96e] hover:text-white transition-colors mt-2">
            <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#c9a96e] group-hover:border-white flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-white/10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><polygon points="5,3 19,12 5,21" /></svg>
            </span>
            <span className="text-xs sm:text-sm tracking-[0.15em] uppercase font-medium">Ver Video</span>
          </button>
        </div>

        {/* Hero carousel indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => { setHeroIdx(i); clearInterval(heroTimerRef.current) }}
              className={`transition-all duration-500 ${i === heroIdx ? 'w-10 h-1 bg-[#c9a96e]' : 'w-4 h-1 bg-white/30 hover:bg-white/60'}`} />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#c9a96e]">{t.hero_scroll}</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#c9a96e] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ============ URGENCY BAR ============ */}
      <section className="bg-[#c9a96e] py-3 sm:py-4">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 text-black text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase">
            Solo {available} apartamentos disponibles
          </p>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-black/30" />
          <p className="text-xs sm:text-sm font-medium">
            Precio medio: {formatEur(avgPrice)} &middot; Primera linea de playa
          </p>
          <a href="#apartamentos" className="text-xs font-bold underline underline-offset-2 hover:no-underline">
            VER APARTAMENTOS &rarr;
          </a>
        </div>
      </section>

      {/* ============ KEY FIGURES (animated counters) ============ */}
      <section className="section-darker py-16 sm:py-20 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {[
            { ref: c1.ref, value: c1.value, suffix: '', label: t.fig_apartments },
            { ref: c4.ref, value: c4.value, suffix: '.000 \u20AC', label: t.fig_avg_price },
            { ref: c3.ref, value: c3.value, suffix: 'm', label: t.fig_beachfront },
            { ref: c2.ref, value: c2.value, suffix: '+', label: 'Dias de sol/ano' },
          ].map((s, i) => (
            <div key={i} ref={s.ref} className="reveal">
              <p className="text-3xl sm:text-4xl md:text-5xl font-light text-[#c9a96e] mb-2 tabular-nums" style={{ fontFamily: 'Playfair Display' }}>
                {s.value}{s.suffix}
              </p>
              <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#888]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ABOUT — REAL PHOTOS ============ */}
      <section className="section-dark py-16 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="reveal-left">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-[#c9a96e]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e]">Diamant Blue</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 leading-tight" style={{ fontFamily: 'Playfair Display' }}>
              {t.about_title_1} <span className="italic text-gold-gradient">{t.about_title_2}</span>
            </h2>
            <div className="space-y-4 text-[#b8b8b8] leading-relaxed text-sm sm:text-base">
              <p>{t.about_p1}</p>
              <p>{t.about_p2}</p>
              <p>{t.about_p3} <strong className="text-[#c9a96e]">INMOBANCA</strong>.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
              <a href="#apartamentos" className="btn-gold text-xs">{t.about_see_apts}</a>
              <a href="/contrato-exclusividad" className="btn-outline text-xs">{t.about_contract}</a>
            </div>
          </div>
          <div className="grid grid-cols-12 grid-rows-2 gap-3 reveal-right h-[400px] sm:h-[500px]">
            <div className="col-span-7 row-span-2 relative overflow-hidden group cursor-pointer"
              onClick={() => setLightbox({ src: DB_EXTERIOR, label: 'Fachada Diamant Blue' })}>
              <img src={DB_EXTERIOR} alt="Apartahotel Diamant Blue - Exterior" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white font-medium">Fachada Principal</p>
              </div>
            </div>
            <div className="col-span-5 relative overflow-hidden group cursor-pointer"
              onClick={() => setLightbox({ src: REAL.seaView, label: 'Vista al Mediterraneo' })}>
              <img src={REAL.seaView} alt="Vista al Mediterraneo desde Diamant Blue" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white font-medium">Vista al Mar</p>
              </div>
            </div>
            <div className="col-span-5 relative overflow-hidden group cursor-pointer"
              onClick={() => setLightbox({ src: REAL.pool, label: 'Piscina comunitaria' })}>
              <img src={REAL.pool} alt="Piscina comunitaria Diamant Blue" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white font-medium">Piscina</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CINEMATIC VIDEO SECTION ============ */}
      <section className="relative py-0 overflow-hidden">
        <div className="relative h-[50vh] sm:h-[65vh] min-h-[400px]">
          <video
            src={VIDEO_URL}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay muted loop playsInline
            poster={REAL.seaView}
            style={{ filter: 'brightness(0.7)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 max-w-3xl">
              {/* Play button */}
              <button onClick={() => setVideoOpen(true)}
                className="group mb-8 inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white/80 hover:border-[#c9a96e] transition-all hover:scale-110 hover:bg-[#c9a96e]/20 pulse-gold-subtle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="ml-1 group-hover:fill-[#c9a96e] transition-colors"><polygon points="5,3 19,12 5,21" /></svg>
              </button>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 leading-tight" style={{ fontFamily: 'Playfair Display' }}>
                Descubre <span className="italic text-gold-gradient">Cabo Roig</span>
              </h2>
              <p className="text-sm sm:text-lg text-[#ddd] font-light leading-relaxed max-w-xl mx-auto">
                Playas de Bandera Azul, aguas cristalinas del Mediterraneo y mas de 300 dias de sol al ano. Un paraiso en la costa de Alicante.
              </p>
              <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-sm sm:max-w-md mx-auto mt-8">
                {[
                  { val: '300+', label: 'Dias de sol' },
                  { val: '200m', label: 'A la playa' },
                  { val: '20\u00B0C', label: 'Temp. media' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl sm:text-3xl text-[#c9a96e] font-light" style={{ fontFamily: 'Playfair Display' }}>{s.val}</p>
                    <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#aaa] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ APARTMENTS ============ */}
      <section id="apartamentos" className="section-darker py-16 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20 reveal">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-[#c9a96e]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e]">Portafolio</span>
              <div className="w-10 h-px bg-[#c9a96e]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>
              {t.apts_title_1} <span className="italic text-gold-gradient">{t.apts_title_2}</span>
            </h2>
            <p className="text-[#888] max-w-xl mx-auto text-sm sm:text-base">{t.apts_subtitle}</p>
          </div>

          {[{ floor: 3, apts: floor3 }, { floor: 4, apts: floor4 }].map(({ floor, apts }) => (
            <div key={floor} className={floor === 3 ? 'mb-14 sm:mb-20' : ''}>
              <div className="flex items-center gap-4 mb-8 sm:mb-10 reveal">
                <div className="w-12 h-12 sm:w-14 sm:h-14 border border-[#c9a96e]/50 flex items-center justify-center">
                  <span className="text-[#c9a96e] text-lg sm:text-xl font-light" style={{ fontFamily: 'Playfair Display' }}>{floor}</span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-light" style={{ fontFamily: 'Playfair Display' }}>{t.apts_plant} {floor}</h3>
                  <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#666]">6 {t.fig_apartments.toLowerCase()} &middot; {t.apts_from} {formatEur(Math.min(...apts.map(a => a.price)))}</p>
                </div>
                <div className="ml-auto hidden sm:block">
                  <span className="text-xs text-[#c9a96e] border border-[#c9a96e]/30 px-3 py-1.5">{apts.filter(a => a.status === 'available').length} disponibles</span>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 stagger-children">
                {apts.map(apt => <ApartmentCard key={apt.id} apt={apt} t={t} />)}
              </div>
            </div>
          ))}

          <div className="mt-12 sm:mt-16 p-6 sm:p-8 border border-[#c9a96e]/20 text-center reveal glass">
            <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-2">Precio medio de todos los apartamentos</p>
            <p className="text-3xl sm:text-4xl text-[#c9a96e] font-light" style={{ fontFamily: 'Playfair Display' }}>{formatEur(avgPrice)}</p>
            <p className="text-xs text-[#666] mt-2">IVA no incluido &middot; Financiacion disponible</p>
          </div>
        </div>
      </section>

      {/* ============ REAL PHOTOS GALLERY ============ */}
      <section id="galeria" className="section-dark py-16 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20 reveal">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-[#c9a96e]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e]">Galeria</span>
              <div className="w-10 h-px bg-[#c9a96e]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>
              {t.gal_title_1} <span className="italic text-gold-gradient">{t.gal_title_2}</span>
            </h2>
            <p className="text-[#888] max-w-xl mx-auto text-sm sm:text-base">{t.gal_subtitle}</p>
          </div>

          {/* Masonry-style gallery with REAL photos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 reveal-scale">
            {/* Large: Exterior */}
            <GalleryItem src={DB_EXTERIOR} label="Apartahotel Diamant Blue" sub="Fachada principal" large onClick={setLightbox} />
            {/* Small items */}
            <GalleryItem src={REAL.seaView} label="Vista al Mediterraneo" sub="Desde planta 4" onClick={setLightbox} />
            <GalleryItem src={REAL.pool} label="Piscina Comunitaria" sub="Agua climatizada" onClick={setLightbox} />
            <GalleryItem src={REAL.terrace} label="Terraza Lounge" sub="Zona de relax" onClick={setLightbox} />
            <GalleryItem src={REAL.lobby} label="Lobby" sub="Recepcion decorada" onClick={setLightbox} />
            {/* Real interior photos */}
            <GalleryItem src={REAL.dining} label="Comedor" sub="Mesa preparada" onClick={setLightbox} />
            <GalleryItem src={REAL.living} label="Salon" sub="Con terraza acristalada" onClick={setLightbox} />
            {/* Zone photos */}
            <GalleryItem src={ZONE_IMGS.beach} label="Playa Cabo Roig" sub="Bandera Azul - 200m" onClick={setLightbox} />
            <GalleryItem src={REAL.marina} label="Marina" sub="Puerto deportivo" onClick={setLightbox} />
            <GalleryItem src={ZONE_IMGS.nautico} label="Club Nautico" sub="Cabo Roig" onClick={setLightbox} />
          </div>
        </div>
      </section>

      {/* ============ FULL BUILDING SHOWCASE ============ */}
      <section className="relative py-0 overflow-hidden">
        <div className="relative h-[60vh] sm:h-[75vh] min-h-[450px]">
          <img src={DB_EXTERIOR} alt="Apartahotel Diamant Blue - Fachada" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
          <div className="absolute inset-0 flex items-end pb-16 sm:pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-10 h-px bg-[#c9a96e]" />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e]">{t.hero_exclusive}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-light mb-4 leading-tight" style={{ fontFamily: 'Playfair Display' }}>
                  Residencial <span className="italic text-gold-gradient">Diamant Blue</span>
                </h2>
                <p className="text-sm sm:text-base text-[#ccc] font-light leading-relaxed mb-6">{t.apts_subtitle}</p>
                <p className="text-xs text-[#888] mb-6">Calle Agua n 5, Cabo Roig, Orihuela Costa, Alicante</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="/reservar" className="btn-gold">{t.hero_reserve}</a>
                  <a href="#contacto" className="btn-outline">{t.nav_contact}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LIFESTYLE — ZONA ============ */}
      <section className="section-darker py-16 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 reveal">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-[#c9a96e]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e]">Lifestyle</span>
              <div className="w-10 h-px bg-[#c9a96e]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>
              Un estilo de <span className="italic text-gold-gradient">vida unico</span>
            </h2>
            <p className="text-[#888] max-w-xl mx-auto text-sm sm:text-base">Playas de bandera azul, paseo maritimo con restaurantes, La Zenia Boulevard y deportes nauticos todo el ano</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 reveal-scale">
            {[
              { img: ZONE_IMGS.beach, title: 'Playa de Cabo Roig', sub: 'Bandera Azul - 200m' },
              { img: ZONE_IMGS.strip, title: 'Strip de Cabo Roig', sub: 'Restaurantes y bares - 5 min' },
              { img: ZONE_IMGS.calas, title: 'Calas y playas', sub: 'Aguas cristalinas' },
              { img: LUXURY.bars, title: 'Terrazas y Restaurantes', sub: 'Gastronomia mediterranea' },
              { img: ZONE_IMGS.coast, title: 'Costa Mediterranea', sub: 'La Zenia Boulevard - 5 min' },
              { img: ZONE_IMGS.nautico, title: 'Club Nautico', sub: 'Deportes acuaticos' },
            ].map(item => (
              <div key={item.title} className="relative group overflow-hidden cursor-pointer"
                onClick={() => setLightbox({ src: item.img, label: item.title })}>
                <img src={item.img} alt={item.title} className="w-full h-44 sm:h-60 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                  <p className="text-xs sm:text-sm font-medium">{item.title}</p>
                  <p className="text-[10px] sm:text-xs text-[#c9a96e]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ REAL INTERIORS SHOWCASE ============ */}
      <section className="section-dark py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 reveal">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-[#c9a96e]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e]">Interiores</span>
              <div className="w-10 h-px bg-[#c9a96e]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>
              Conoce los <span className="italic text-gold-gradient">espacios</span>
            </h2>
            <p className="text-[#888] max-w-xl mx-auto text-sm sm:text-base">Fotos reales del interior de los apartamentos del Diamant Blue</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 reveal-scale">
            {[
              { img: REAL.living, label: 'Salon con terraza' },
              { img: REAL.bedroom2, label: 'Dormitorio principal' },
              { img: REAL.bathroom, label: 'Bano completo' },
              { img: REAL.dining, label: 'Comedor' },
              { img: REAL.terrace, label: 'Terraza lounge' },
              { img: REAL.lobby, label: 'Lobby del hotel' },
              { img: REAL.bedroom1, label: 'Dormitorio' },
              { img: REAL.pool, label: 'Zona piscina' },
            ].map((item, i) => (
              <div key={i} className="relative group overflow-hidden cursor-pointer aspect-square"
                onClick={() => setLightbox({ src: item.img, label: item.label })}>
                <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs tracking-widest uppercase bg-black/50 px-3 py-1.5">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LOCATION ============ */}
      <section id="ubicacion" className="section-darker py-16 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="reveal-left">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-[#c9a96e]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e]">Ubicacion</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light mb-8" style={{ fontFamily: 'Playfair Display' }}>
              {t.loc_title_1} <span className="italic text-gold-gradient">{t.loc_title_2}</span>
            </h2>
            <div className="space-y-5 sm:space-y-6">
              {[
                { icon: '\uD83C\uDFD6\uFE0F', title: t.loc_beach, desc: t.loc_beach_desc },
                { icon: '\uD83C\uDF7D\uFE0F', title: t.loc_strip, desc: t.loc_strip_desc },
                { icon: '\uD83D\uDED2', title: t.loc_boulevard, desc: t.loc_boulevard_desc },
                { icon: '\u2708\uFE0F', title: t.loc_airport, desc: t.loc_airport_desc },
                { icon: '\u26F3', title: t.loc_golf, desc: t.loc_golf_desc },
                { icon: '\uD83C\uDFE5', title: t.loc_services, desc: t.loc_services_desc },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-4 group">
                  <span className="text-xl sm:text-2xl mt-0.5 group-hover:scale-110 transition-transform">{item.icon}</span>
                  <div>
                    <p className="font-medium text-sm group-hover:text-[#c9a96e] transition-colors">{item.title}</p>
                    <p className="text-xs sm:text-sm text-[#888]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-right space-y-4">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.0!2d-0.736011!3d37.914426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63029d27ef1c53%3A0x5e0d4e3b2c8a9f0!2sAparthotel%20Diamant%20Blue!5e0!3m2!1ses!2ses!4v1"
              className="w-full h-72 sm:h-96 border border-[#c9a96e]/20" allowFullScreen loading="lazy" />
            <p className="text-xs text-[#888] text-center">Calle Agua n 5, Cabo Roig, Orihuela Costa, Alicante</p>
          </div>
        </div>
      </section>

      {/* ============ WHY INVEST ============ */}
      <section className="section-dark py-16 sm:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 mb-6 reveal">
            <div className="w-10 h-px bg-[#c9a96e]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e]">Inversion</span>
            <div className="w-10 h-px bg-[#c9a96e]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-light mb-12 sm:mb-16 reveal" style={{ fontFamily: 'Playfair Display' }}>
            {t.inv_title_1} <span className="italic text-gold-gradient">{t.inv_title_2}</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 stagger-children">
            {[
              { title: t.inv_rental, desc: t.inv_rental_desc, icon: '\uD83D\uDCCA', val: '6-8%' },
              { title: t.inv_growth, desc: t.inv_growth_desc, icon: '\uD83D\uDCC8', val: '+12%' },
              { title: t.inv_lifestyle, desc: t.inv_lifestyle_desc, icon: '\u2600\uFE0F', val: '300+' },
            ].map(item => (
              <div key={item.title} className="reveal p-8 sm:p-10 border border-[#c9a96e]/15 hover:border-[#c9a96e]/50 transition-all duration-500 group hover:-translate-y-3">
                <p className="text-4xl sm:text-5xl text-[#c9a96e] font-light mb-3" style={{ fontFamily: 'Playfair Display' }}>{item.val}</p>
                <h3 className="text-base sm:text-lg text-white mb-3 sm:mb-4" style={{ fontFamily: 'Playfair Display' }}>{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#888] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contacto" className="section-darker py-16 sm:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 mb-6 reveal">
            <div className="w-10 h-px bg-[#c9a96e]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e]">Contacto</span>
            <div className="w-10 h-px bg-[#c9a96e]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-light mb-4 reveal" style={{ fontFamily: 'Playfair Display' }}>
            <span className="italic text-gold-gradient">{t.cnt_title_1}</span>
          </h2>
          <p className="text-[#888] mb-10 sm:mb-12 text-sm sm:text-base reveal">{t.cnt_subtitle}</p>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-10 sm:mb-12 reveal">
            <Link href="/reservar" className="btn-gold w-full justify-center">{t.cnt_reserve_apt}</Link>
            <Link href="/crm" className="btn-outline w-full justify-center">{t.cnt_interested}</Link>
          </div>
          <div className="p-8 sm:p-10 border border-[#c9a96e]/15 glass reveal">
            <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-4">{t.cnt_exclusive}</p>
            <p className="text-2xl sm:text-3xl font-light mb-6" style={{ fontFamily: 'Playfair Display' }}>INMOBANCA</p>
            <div className="grid sm:grid-cols-2 gap-6 text-sm text-[#888] text-left max-w-md mx-auto">
              <div className="p-4 border border-white/5 hover:border-[#c9a96e]/30 transition-colors">
                <p className="text-white font-medium mb-1">Juan Carlos Martinez</p>
                <a href="tel:+34620300647" className="hover:text-[#c9a96e] transition-colors block">+34 620 300 647</a>
                <a href="https://wa.me/34620300647" target="_blank" rel="noopener" className="text-[#25D366] text-xs mt-1 block">WhatsApp</a>
              </div>
              <div className="p-4 border border-white/5 hover:border-[#c9a96e]/30 transition-colors">
                <p className="text-white font-medium mb-1">Belen Ceron</p>
                <a href="tel:+34662600893" className="hover:text-[#c9a96e] transition-colors block">+34 662 600 893</a>
                <a href="https://wa.me/34662600893" target="_blank" rel="noopener" className="text-[#25D366] text-xs mt-1 block">WhatsApp</a>
              </div>
            </div>
            <a href="mailto:inmobancamurcia@gmail.com" className="text-sm text-[#888] mt-6 block hover:text-[#c9a96e] transition-colors">inmobancamurcia@gmail.com</a>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs text-[#888]">
                <span className="text-base">{'\uD83C\uDDEA\uD83C\uDDF8'}</span> Espanol
              </div>
              <div className="flex items-center gap-2 text-xs text-[#888]">
                <span className="text-base">{'\uD83C\uDDEC\uD83C\uDDE7'}</span> English
              </div>
              <div className="flex items-center gap-2 text-xs text-white font-medium bg-[#c9a96e]/10 px-3 py-1.5 border border-[#c9a96e]/30 pulse-gold">
                <span className="text-base">{'\uD83C\uDDF7\uD83C\uDDFA'}</span> {'\u0413\u043E\u0432\u043E\u0440\u0438\u043C \u043F\u043E-\u0440\u0443\u0441\u0441\u043A\u0438'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ VIDEO MODAL ============ */}
      {videoOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4" onClick={() => setVideoOpen(false)}>
          <button onClick={() => setVideoOpen(false)} className="absolute top-6 right-6 text-white text-3xl hover:text-[#c9a96e] z-10 transition-colors">&times;</button>
          <div className="w-full max-w-5xl" onClick={e => e.stopPropagation()}>
            <video
              src={VIDEO_URL}
              className="w-full max-h-[80vh]"
              controls
              autoPlay
              playsInline
            />
            <p className="text-center text-xs text-[#888] mt-4">Playa mediterranea &middot; Cabo Roig, Costa Blanca</p>
          </div>
        </div>
      )}

      {/* ============ LIGHTBOX ============ */}
      {lightbox && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 cursor-pointer" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-white text-3xl hover:text-[#c9a96e] z-10 transition-colors">&times;</button>
          <div className="max-w-5xl max-h-[85vh]" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.label} className="max-w-full max-h-[80vh] object-contain mx-auto" />
            <p className="text-center text-sm text-[#888] mt-4">{lightbox.label}</p>
          </div>
        </div>
      )}

      {/* Slow zoom keyframe */}
      <style jsx>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   GALLERY ITEM
   ══════════════════════════════════════════════════════════════ */
function GalleryItem({ src, label, sub, large, onClick }: {
  src: string; label: string; sub?: string; large?: boolean;
  onClick: (item: { src: string; label: string }) => void
}) {
  return (
    <div className={`relative group overflow-hidden cursor-pointer ${large ? 'col-span-2 row-span-2' : ''}`}
      onClick={() => onClick({ src, label })}>
      <img src={src} alt={label}
        className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${large ? 'h-full min-h-[280px] sm:min-h-[350px]' : 'h-36 sm:h-48'}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <p className="text-xs sm:text-sm font-medium text-white">{label}</p>
        {sub && <p className="text-[10px] sm:text-xs text-[#c9a96e]">{sub}</p>}
      </div>
      {/* Zoom icon */}
      <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v6M8 11h6" />
        </svg>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   APARTMENT CARD
   ══════════════════════════════════════════════════════════════ */
function ApartmentCard({ apt, t }: { apt: typeof apartments[0]; t: ReturnType<typeof useI18n>['t'] }) {
  const img = aptImages[apt.id] || aptImages['3a']
  const statusBadge = apt.status === 'available' ? 'badge-available' : apt.status === 'reserved' ? 'badge-reserved' : 'badge-sold'
  const statusLabel = apt.status === 'available' ? t.apts_available : apt.status === 'reserved' ? t.apts_reserved : t.apts_sold

  return (
    <Link href={`/apartamento/${apt.id}`} className="luxury-card overflow-hidden group reveal block">
      <div className="relative h-44 sm:h-52 overflow-hidden">
        <img src={img} alt={`Apartamento ${apt.unit}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4"><span className={statusBadge}>{statusLabel}</span></div>
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/60 backdrop-blur-sm px-2 sm:px-3 py-1">
          <span className="text-[10px] sm:text-xs text-[#c9a96e] font-medium">{apt.area} m&sup2;</span>
        </div>
        {/* Price overlay */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-[#c9a96e] text-black text-xs font-bold px-3 py-1.5">{formatEur(apt.price)}</span>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-base sm:text-lg font-light" style={{ fontFamily: 'Playfair Display' }}>Apartamento {apt.unit}</h3>
            <p className="text-[10px] sm:text-xs text-[#666] mt-1">{t.apts_plant} {apt.floor} &middot; {apt.orientation}</p>
          </div>
          <p className="text-lg sm:text-xl text-[#c9a96e] font-light" style={{ fontFamily: 'Playfair Display' }}>{formatEur(apt.price)}</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#555] mb-3">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12h18M3 12v6a2 2 0 002 2h14a2 2 0 002-2v-6M3 12V8a4 4 0 014-4h1m0 0V2m0 2h8m0-2v2m0 0a4 4 0 014 4v4" /></svg>
            {apt.bedrooms} {t.apts_bed}
          </span>
          <span>&middot;</span>
          <span>{apt.bathrooms} {t.apts_bath}</span>
          <span>&middot;</span>
          <span>{t.apts_terrace} {apt.terrace}m&sup2;</span>
        </div>
        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex gap-1.5">
            {apt.features.slice(0, 2).map(f => (
              <span key={f} className="text-[9px] px-2 py-0.5 border border-white/10 text-[#888]">{f}</span>
            ))}
          </div>
          <span className="text-[#c9a96e] text-xs group-hover:translate-x-1 transition-transform">{t.apts_view_detail} &rarr;</span>
        </div>
      </div>
    </Link>
  )
}
