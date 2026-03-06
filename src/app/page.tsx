'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { apartments, formatEur } from '@/lib/apartments'
import { useI18n } from '@/lib/i18n'

/* -- Unsplash high-quality photos -- */
const UNS = 'https://images.unsplash.com'
const HERO_IMG = `${UNS}/photo-1519046904884-53103b34b206?w=1920&q=80`
const POOL_IMG = `${UNS}/photo-1575429198097-0414ec08e8cd?w=940&q=80`
const NIGHTLIFE_IMG = `${UNS}/photo-1514933651103-005eec06c04b?w=940&q=80`
const BARS_IMG = `${UNS}/photo-1566417713940-fe7c737a9ef2?w=940&q=80`
const LIVING_IMG = `${UNS}/photo-1600585154340-be6161a56a0c?w=940&q=80`
const KITCHEN_IMG = `${UNS}/photo-1600566753086-00f18fb6b3ea?w=940&q=80`

/* -- Per-apartment images (12 unique) -- */
const aptImages: Record<string, string> = {
  '3a': `${UNS}/photo-1502672260266-1c1ef2d93688?w=800&q=80`,
  '3b': `${UNS}/photo-1560448204-e02f11c3d0e2?w=800&q=80`,
  '3c': `${UNS}/photo-1522771739844-6a9f6d5f14af?w=800&q=80`,
  '3d': `${UNS}/photo-1600585154340-be6161a56a0c?w=800&q=80`,
  '3e': `${UNS}/photo-1556909114-f6e7ad7d3136?w=800&q=80`,
  '3f': `${UNS}/photo-1600607687939-ce8a6c25118c?w=800&q=80`,
  '4a': `${UNS}/photo-1600566753086-00f18fb6b3ea?w=800&q=80`,
  '4b': `${UNS}/photo-1600596542815-ffad4c1539a9?w=800&q=80`,
  '4c': `${UNS}/photo-1616594039964-ae9021a400a0?w=800&q=80`,
  '4d': `${UNS}/photo-1600607687644-c7171b42498f?w=800&q=80`,
  '4e': `${UNS}/photo-1493809842364-78817add7ffb?w=800&q=80`,
  '4f': `${UNS}/photo-1484154218962-a197022b5858?w=800&q=80`,
}

/* -- Diamant Blue real photos -- */
const GA = 'https://images.getaroom-cdn.com/image/upload/s--'
const DB_EXTERIOR = `${GA}KtAwSW2U--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1769578125/864f5fdbb97a797431477845b405cdd0ab6475a5`

/* -- Lifestyle zone -- */
const ZONE = 'https://diamantblue.com/images/stories'

/* -- Scroll reveal hook -- */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    const el = ref.current
    if (el) {
      el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(child => {
        observer.observe(child)
      })
    }
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function Home() {
  const { t } = useI18n()
  const floor3 = apartments.filter(a => a.floor === 3)
  const floor4 = apartments.filter(a => a.floor === 4)
  const avgPrice = Math.round(apartments.reduce((s, a) => s + a.price, 0) / apartments.length)
  const revealRef = useReveal()

  return (
    <div ref={revealRef}>
      {/* ============ HERO ============ */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Playa de Cabo Roig, Costa Blanca" className="w-full h-full object-cover scale-105" style={{ animation: 'slowZoom 20s ease-in-out infinite alternate' }} />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl animate-fade-in">
          <div className="gold-line-center mb-8" />
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-4 sm:mb-6 font-medium">{t.hero_exclusive}</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light mb-4 sm:mb-6 leading-[0.95]" style={{ fontFamily: 'Playfair Display' }}>
            {t.hero_title_1}<br /><span className="italic text-gold-gradient">{t.hero_title_2}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#ccc] font-light max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">{t.hero_desc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="#apartamentos" className="btn-gold w-full sm:w-auto">{t.hero_discover}</a>
            <a href="/reservar" className="btn-outline w-full sm:w-auto">{t.hero_reserve}</a>
          </div>
        </div>
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">{t.hero_scroll}</span>
          <div className="w-px h-10 sm:h-12 bg-gradient-to-b from-[#c9a96e] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ============ KEY FIGURES ============ */}
      <section className="section-darker py-16 sm:py-20 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center stagger-children">
          {[
            { value: '12', label: t.fig_apartments },
            { value: formatEur(avgPrice), label: t.fig_avg_price },
            { value: '45-72', label: t.fig_sqm },
            { value: t.fig_beachfront_val, label: t.fig_beachfront },
          ].map(s => (
            <div key={s.label} className="reveal">
              <p className="text-2xl sm:text-3xl md:text-4xl font-light text-[#c9a96e] mb-2" style={{ fontFamily: 'Playfair Display' }}>{s.value}</p>
              <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#888]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="section-dark py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="reveal-left">
            <div className="gold-line mb-6" />
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
          <div className="grid grid-cols-2 gap-3 reveal-right">
            <img src={DB_EXTERIOR} alt="Apartahotel Diamant Blue - Exterior" className="w-full h-48 sm:h-64 object-cover hover:scale-[1.02] transition-transform duration-700" />
            <img src={POOL_IMG} alt="Piscina comunitaria" className="w-full h-48 sm:h-64 object-cover mt-8 hover:scale-[1.02] transition-transform duration-700" />
            <img src={LIVING_IMG} alt="Interior apartamento" className="w-full h-48 sm:h-64 object-cover hover:scale-[1.02] transition-transform duration-700" />
            <img src={KITCHEN_IMG} alt="Cocina moderna equipada" className="w-full h-48 sm:h-64 object-cover mt-8 hover:scale-[1.02] transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* ============ APARTMENTS ============ */}
      <section id="apartamentos" className="section-darker py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 reveal">
            <div className="gold-line-center mb-6" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>
              {t.apts_title_1} <span className="italic text-gold-gradient">{t.apts_title_2}</span>
            </h2>
            <p className="text-[#888] max-w-xl mx-auto text-sm sm:text-base">{t.apts_subtitle}</p>
          </div>

          {[{ floor: 3, apts: floor3 }, { floor: 4, apts: floor4 }].map(({ floor, apts }) => (
            <div key={floor} className={floor === 3 ? 'mb-12 sm:mb-16' : ''}>
              <div className="flex items-center gap-4 mb-6 sm:mb-8 reveal">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#c9a96e] flex items-center justify-center text-[#c9a96e] text-base sm:text-lg font-light" style={{ fontFamily: 'Playfair Display' }}>{floor}</div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-light" style={{ fontFamily: 'Playfair Display' }}>{t.apts_plant} {floor}</h3>
                  <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#888]">6 {t.fig_apartments.toLowerCase()} — {t.apts_from} {formatEur(Math.min(...apts.map(a => a.price)))}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 stagger-children">
                {apts.map(apt => <ApartmentCard key={apt.id} apt={apt} t={t} />)}
              </div>
            </div>
          ))}

          <div className="mt-10 sm:mt-12 p-5 sm:p-6 border border-[#c9a96e]/20 text-center reveal glass">
            <p className="text-sm text-[#888]">{t.apts_avg_notice}: <span className="text-[#c9a96e] font-semibold text-lg">{formatEur(avgPrice)}</span></p>
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section id="galeria" className="section-dark py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 reveal">
            <div className="gold-line-center mb-6" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>
              {t.gal_title_1} <span className="italic text-gold-gradient">{t.gal_title_2}</span>
            </h2>
            <p className="text-[#888] max-w-xl mx-auto text-sm sm:text-base">{t.gal_subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 reveal-scale">
            <div className="col-span-2 row-span-2">
              <img src={DB_EXTERIOR} alt={t.gal_hotel} className="w-full h-full object-cover min-h-[250px] sm:min-h-[300px] hover:scale-[1.02] transition-transform duration-700" />
              <div className="mt-3"><p className="text-sm font-medium">{t.gal_hotel}</p><p className="text-xs text-[#888]">{t.gal_hotel_addr}</p></div>
            </div>
            <div>
              <img src={POOL_IMG} alt={t.gal_pool} className="w-full h-36 sm:h-48 object-cover hover:scale-[1.02] transition-transform duration-700" />
              <div className="mt-3"><p className="text-xs sm:text-sm font-medium">{t.gal_pool}</p><p className="text-[10px] sm:text-xs text-[#888]">{t.gal_pool_desc}</p></div>
            </div>
            <div>
              <img src={LIVING_IMG} alt={t.gal_interior} className="w-full h-36 sm:h-48 object-cover hover:scale-[1.02] transition-transform duration-700" />
              <div className="mt-3"><p className="text-xs sm:text-sm font-medium">{t.gal_interior}</p><p className="text-[10px] sm:text-xs text-[#888]">{t.gal_interior_desc}</p></div>
            </div>
            <div>
              <img src={`${ZONE}/xslide3.jpg.pagespeed.ic.e3LlOtwGma.jpg`} alt={t.gal_beach} className="w-full h-36 sm:h-48 object-cover hover:scale-[1.02] transition-transform duration-700" />
              <div className="mt-3"><p className="text-xs sm:text-sm font-medium">{t.gal_beach}</p><p className="text-[10px] sm:text-xs text-[#888]">{t.gal_beach_desc}</p></div>
            </div>
            <div>
              <img src={NIGHTLIFE_IMG} alt="Vida nocturna" className="w-full h-36 sm:h-48 object-cover hover:scale-[1.02] transition-transform duration-700" />
              <div className="mt-3"><p className="text-xs sm:text-sm font-medium">Vida Nocturna</p><p className="text-[10px] sm:text-xs text-[#888]">Bares y terrazas en Cabo Roig</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CINEMATIC ZONE SECTION ============ */}
      <section className="relative py-0 overflow-hidden">
        <div className="relative h-[50vh] sm:h-[60vh] min-h-[400px] sm:min-h-[450px]">
          <img src={`${ZONE}/xslide3.jpg.pagespeed.ic.e3LlOtwGma.jpg`} alt="Playa de Cabo Roig" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 max-w-3xl">
              <div className="gold-line-center mb-6 sm:mb-8" />
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-light mb-4 sm:mb-6 leading-tight" style={{ fontFamily: 'Playfair Display' }}>
                Cabo Roig, <span className="italic text-gold-gradient">Costa Blanca</span>
              </h2>
              <p className="text-sm sm:text-lg text-[#ddd] font-light leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto">
                Playas de Bandera Azul, aguas cristalinas del Mediterraneo y mas de 300 dias de sol al ano. Un paraiso en la costa de Alicante.
              </p>
              <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-sm sm:max-w-md mx-auto">
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

      {/* ============ LIFESTYLE ============ */}
      <section className="section-darker py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 reveal">
            <div className="gold-line-center mb-6" />
            <h2 className="text-3xl sm:text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>
              Un estilo de <span className="italic text-gold-gradient">vida unico</span>
            </h2>
            <p className="text-[#888] max-w-xl mx-auto text-sm sm:text-base">Playas de bandera azul, paseo maritimo con restaurantes, La Zenia Boulevard y deportes nauticos todo el ano</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 reveal-scale">
            {[
              { img: `${ZONE}/xslide3.jpg.pagespeed.ic.e3LlOtwGma.jpg`, title: 'Playa de Cabo Roig', sub: 'Bandera Azul - 200m' },
              { img: `${ZONE}/xslide1.jpg.pagespeed.ic.I4M4sKQsVM.jpg`, title: 'Strip de Cabo Roig', sub: 'Restaurantes y bares - 5 min' },
              { img: `${ZONE}/xslide5.jpg.pagespeed.ic.7Lv0k7I5Or.jpg`, title: 'Calas y playas', sub: 'Aguas cristalinas' },
              { img: BARS_IMG, title: 'Terrazas y Restaurantes', sub: 'Gastronomia mediterranea' },
              { img: `${ZONE}/xslide2.jpg.pagespeed.ic.EpjPHoTJLa.jpg`, title: 'La Zenia Boulevard', sub: 'Centro comercial - 5 min' },
              { img: NIGHTLIFE_IMG, title: 'Vida Nocturna', sub: 'Bares y copas - Cabo Roig Strip' },
            ].map(item => (
              <div key={item.title} className="relative group overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-40 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-medium">{item.title}</p>
                  <p className="text-[10px] sm:text-xs text-[#c9a96e]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FACHADA GRANDE ============ */}
      <section className="relative py-0 overflow-hidden">
        <div className="relative h-[60vh] sm:h-[70vh] min-h-[450px] sm:min-h-[500px]">
          <img src={DB_EXTERIOR} alt="Apartahotel Diamant Blue - Fachada" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 max-w-3xl">
              <div className="gold-line-center mb-6 sm:mb-8" />
              <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-4 sm:mb-6">{t.hero_exclusive}</p>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-light mb-4 sm:mb-6 leading-tight" style={{ fontFamily: 'Playfair Display' }}>
                Residencial <span className="italic text-gold-gradient">Diamant Blue</span>
              </h2>
              <p className="text-sm sm:text-lg text-[#ccc] font-light leading-relaxed mb-8 sm:mb-10">{t.apts_subtitle}</p>
              <p className="text-xs sm:text-sm text-[#888] italic mb-6 sm:mb-8">Calle Agua n 5, Cabo Roig, Orihuela Costa, Alicante</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a href="/reservar" className="btn-gold w-full sm:w-auto">{t.hero_reserve}</a>
                <a href="#contacto" className="btn-outline w-full sm:w-auto">{t.nav_contact}</a>
              </div>
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#c9a96e]/50 mt-8 sm:mt-10">{t.cnt_exclusive} INMOBANCA</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LOCATION ============ */}
      <section id="ubicacion" className="section-darker py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="reveal-left">
            <div className="gold-line mb-6" />
            <h2 className="text-3xl sm:text-4xl font-light mb-6" style={{ fontFamily: 'Playfair Display' }}>
              {t.loc_title_1} <span className="italic text-gold-gradient">{t.loc_title_2}</span>
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {[
                { icon: '\uD83C\uDFD6\uFE0F', title: t.loc_beach, desc: t.loc_beach_desc },
                { icon: '\uD83C\uDF7D\uFE0F', title: t.loc_strip, desc: t.loc_strip_desc },
                { icon: '\uD83D\uDED2', title: t.loc_boulevard, desc: t.loc_boulevard_desc },
                { icon: '\u2708\uFE0F', title: t.loc_airport, desc: t.loc_airport_desc },
                { icon: '\u26F3', title: t.loc_golf, desc: t.loc_golf_desc },
                { icon: '\uD83C\uDFE5', title: t.loc_services, desc: t.loc_services_desc },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-3 sm:gap-4">
                  <span className="text-xl sm:text-2xl">{item.icon}</span>
                  <div><p className="font-medium text-xs sm:text-sm">{item.title}</p><p className="text-xs sm:text-sm text-[#888]">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-right">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.0!2d-0.736011!3d37.914426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63029d27ef1c53%3A0x5e0d4e3b2c8a9f0!2sAparthotel%20Diamant%20Blue!5e0!3m2!1ses!2ses!4v1"
              className="w-full h-72 sm:h-96 border border-[#c9a96e]/20" allowFullScreen loading="lazy" />
            <p className="text-xs text-[#888] mt-3 text-center">Calle Agua n 5, Cabo Roig, Orihuela Costa, Alicante</p>
          </div>
        </div>
      </section>

      {/* ============ WHY INVEST ============ */}
      <section className="section-dark py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="gold-line-center mb-6 reveal" />
          <h2 className="text-3xl sm:text-4xl font-light mb-10 sm:mb-12 reveal" style={{ fontFamily: 'Playfair Display' }}>
            {t.inv_title_1} <span className="italic text-gold-gradient">{t.inv_title_2}</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 stagger-children">
            {[
              { title: t.inv_rental, desc: t.inv_rental_desc, icon: '\uD83D\uDCCA' },
              { title: t.inv_growth, desc: t.inv_growth_desc, icon: '\uD83D\uDCC8' },
              { title: t.inv_lifestyle, desc: t.inv_lifestyle_desc, icon: '\u2600\uFE0F' },
            ].map(item => (
              <div key={item.title} className="reveal p-6 sm:p-8 border border-[#c9a96e]/15 hover:border-[#c9a96e]/40 transition-all duration-500 group hover:-translate-y-2">
                <span className="text-3xl sm:text-4xl block mb-4 group-hover:scale-110 transition-transform">{item.icon}</span>
                <h3 className="text-lg sm:text-xl text-[#c9a96e] mb-3 sm:mb-4" style={{ fontFamily: 'Playfair Display' }}>{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#888] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contacto" className="section-darker py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="gold-line-center mb-6 reveal" />
          <h2 className="text-3xl sm:text-4xl font-light mb-4 reveal" style={{ fontFamily: 'Playfair Display' }}>
            <span className="italic text-gold-gradient">{t.cnt_title_1}</span>
          </h2>
          <p className="text-[#888] mb-10 sm:mb-12 text-sm sm:text-base reveal">{t.cnt_subtitle}</p>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-10 sm:mb-12 reveal">
            <Link href="/reservar" className="btn-gold w-full justify-center">{t.cnt_reserve_apt}</Link>
            <Link href="/crm" className="btn-outline w-full justify-center">{t.cnt_interested}</Link>
          </div>
          <div className="p-6 sm:p-8 border border-[#c9a96e]/15 glass reveal">
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4">{t.cnt_exclusive}</p>
            <p className="text-xl sm:text-2xl font-light mb-2" style={{ fontFamily: 'Playfair Display' }}>INMOBANCA</p>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 text-sm text-[#888] text-left max-w-md mx-auto">
              <div>
                <p className="text-white font-medium">Juan Carlos Martinez</p>
                <a href="tel:+34620300647" className="hover:text-[#c9a96e] transition-colors">+34 620 300 647</a>
              </div>
              <div>
                <p className="text-white font-medium">Belen Ceron</p>
                <a href="tel:+34662600893" className="hover:text-[#c9a96e] transition-colors">+34 662 600 893</a>
              </div>
            </div>
            <a href="mailto:inmobancamurcia@gmail.com" className="text-sm text-[#888] mt-4 block hover:text-[#c9a96e] transition-colors">inmobancamurcia@gmail.com - Cabo Roig, Orihuela Costa</a>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-4 border-t border-white/5">
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

      {/* Slow zoom keyframe */}
      <style jsx>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
      `}</style>
    </div>
  )
}

function ApartmentCard({ apt, t }: { apt: typeof apartments[0]; t: ReturnType<typeof useI18n>['t'] }) {
  const img = aptImages[apt.id] || aptImages['3a']
  const statusBadge = apt.status === 'available' ? 'badge-available' : apt.status === 'reserved' ? 'badge-reserved' : 'badge-sold'
  const statusLabel = apt.status === 'available' ? t.apts_available : apt.status === 'reserved' ? t.apts_reserved : t.apts_sold

  return (
    <Link href={`/apartamento/${apt.id}`} className="luxury-card overflow-hidden group reveal">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img src={img} alt={`Apartamento ${apt.unit}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4"><span className={statusBadge}>{statusLabel}</span></div>
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/60 backdrop-blur px-2 sm:px-3 py-1">
          <span className="text-[10px] sm:text-xs text-[#c9a96e] font-medium">{t.apts_plant} {apt.floor}</span>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <div>
            <h3 className="text-base sm:text-lg font-light" style={{ fontFamily: 'Playfair Display' }}>Apartamento {apt.unit}</h3>
            <p className="text-[10px] sm:text-xs text-[#888] mt-1">{apt.orientation} - {apt.bedrooms} {t.apts_bed} - {apt.bathrooms} {t.apts_bath}</p>
          </div>
          <p className="text-lg sm:text-xl text-[#c9a96e] font-light" style={{ fontFamily: 'Playfair Display' }}>{formatEur(apt.price)}</p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-[#666] border-t border-white/5 pt-2 sm:pt-3">
          <span>{apt.area} m2</span>
          <span>{t.apts_terrace} {apt.terrace} m2</span>
          <span className="ml-auto text-[#c9a96e] group-hover:translate-x-1 transition-transform">{t.apts_view_detail} &rarr;</span>
        </div>
      </div>
    </Link>
  )
}
