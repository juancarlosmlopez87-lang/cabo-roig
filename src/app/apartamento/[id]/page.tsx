'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { apartments, formatEur } from '@/lib/apartments'
import Link from 'next/link'

/* ══════════════════════════════════════════════════════════════
   REAL DIAMANT BLUE PHOTOS
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

const GA = 'https://images.getaroom-cdn.com/image/upload/s--'
const DB_EXTERIOR = `${GA}KtAwSW2U--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1769578125/864f5fdbb97a797431477845b405cdd0ab6475a5`

const ZONE = 'https://diamantblue.com/images/stories'
const UNS = 'https://images.unsplash.com'

/* Hero images per apartment — mix of real and aspirational */
const aptHeroImages: Record<string, string> = {
  '3a': `${UNS}/photo-1600585154340-be6161a56a0c?w=1400&q=80`,
  '3b': REAL.seaView,
  '3c': `${UNS}/photo-1616594039964-ae9021a400a0?w=1400&q=80`,
  '3d': REAL.seaView,
  '3e': `${UNS}/photo-1600596542815-ffad4c1539a9?w=1400&q=80`,
  '3f': REAL.dining,
  '4a': `${UNS}/photo-1600566753086-00f18fb6b3ea?w=1400&q=80`,
  '4b': REAL.seaView,
  '4c': `${UNS}/photo-1600607687939-ce8a6c25118c?w=1400&q=80`,
  '4d': REAL.seaView,
  '4e': `${UNS}/photo-1600607687644-c7171b42498f?w=1400&q=80`,
  '4f': REAL.marina,
}

/* Gallery photos — organized by category using REAL photos */
const galleryPhotos = {
  apartamento: [
    { src: REAL.living, label: 'Salon con terraza acristalada' },
    { src: REAL.bedroom2, label: 'Dormitorio principal' },
    { src: REAL.bedroom1, label: 'Dormitorio' },
    { src: REAL.bathroom, label: 'Bano completo con banera' },
    { src: REAL.dining, label: 'Comedor con champan' },
    { src: REAL.terrace, label: 'Terraza lounge exterior' },
  ],
  hotel: [
    { src: DB_EXTERIOR, label: 'Fachada Apartahotel Diamant Blue' },
    { src: REAL.pool, label: 'Piscina comunitaria' },
    { src: REAL.lobby, label: 'Lobby con pinturas originales' },
    { src: REAL.seaView, label: 'Vista al Mediterraneo desde el edificio' },
    { src: REAL.terrace, label: 'Zona chill-out jardin' },
    { src: REAL.marina, label: 'Vistas al puerto deportivo' },
  ],
  zona: [
    { src: `${ZONE}/xslide3.jpg.pagespeed.ic.e3LlOtwGma.jpg`, label: 'Playa de Cabo Roig - Bandera Azul' },
    { src: `${ZONE}/xslide11.jpg.pagespeed.ic.pfYgG3DoMn.jpg`, label: 'Club Nautico Cabo Roig' },
    { src: `${ZONE}/xslide1.jpg.pagespeed.ic.I4M4sKQsVM.jpg`, label: 'Paseo maritimo - Cabo Roig Strip' },
    { src: `${ZONE}/xslide5.jpg.pagespeed.ic.7Lv0k7I5Or.jpg`, label: 'Calas de aguas cristalinas' },
    { src: `${ZONE}/xslide2.jpg.pagespeed.ic.EpjPHoTJLa.jpg`, label: 'Costa mediterranea' },
    { src: `${ZONE}/xslide6.jpg.pagespeed.ic.TA9tra7WhO.jpg`, label: 'Escultura del buceador' },
  ],
}

type GalleryTab = 'apartamento' | 'hotel' | 'zona'

export default function ApartamentoPage() {
  const { id } = useParams<{ id: string }>()
  const apt = apartments.find(a => a.id === id)
  const [tab, setTab] = useState<GalleryTab>('apartamento')
  const [photoIdx, setPhotoIdx] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  if (!apt) return (
    <div className="pt-24 text-center text-[#888] min-h-screen flex flex-col items-center justify-center">
      <p className="text-2xl mb-4" style={{ fontFamily: 'Playfair Display' }}>Apartamento no encontrado</p>
      <Link href="/#apartamentos" className="btn-outline text-xs">Volver a apartamentos</Link>
    </div>
  )

  const heroImg = aptHeroImages[id] || aptHeroImages['3a']
  const reserva = Math.round(apt.price * 0.05)
  const iva = Math.round(reserva * 0.21)
  const totalReserva = reserva + iva
  const currentPhotos = galleryPhotos[tab]
  const currentPhoto = currentPhotos[photoIdx % currentPhotos.length]

  // Find similar apartments
  const similar = apartments.filter(a => a.id !== apt.id && a.bedrooms === apt.bedrooms).slice(0, 3)

  return (
    <div className="pt-20">
      {/* Hero image — full width with overlay info */}
      <div className="relative h-[55vh] min-h-[400px]">
        <img src={heroImg} alt={`Apartamento ${apt.unit}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 lg:px-8 pb-8">
          <div className="flex items-end justify-between">
            <div>
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-[#c9a96e]" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">Planta {apt.floor} &middot; {apt.orientation}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-light" style={{ fontFamily: 'Playfair Display' }}>
                Apartamento <span className="italic text-gold-gradient">{apt.unit}</span>
              </h1>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-3xl text-[#c9a96e] font-light" style={{ fontFamily: 'Playfair Display' }}>{formatEur(apt.price)}</p>
              <p className="text-xs text-[#888] mt-1">{apt.area} m&sup2; &middot; {apt.bedrooms} dorm &middot; {apt.bathrooms} bano</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: formatEur(apt.price), label: 'Precio' },
                { value: `${apt.area} m\u00B2`, label: 'Superficie' },
                { value: `${apt.bedrooms}`, label: `Dormitorio${apt.bedrooms > 1 ? 's' : ''}` },
                { value: `${apt.terrace} m\u00B2`, label: 'Terraza' },
              ].map(s => (
                <div key={s.label} className="p-5 border border-[#c9a96e]/15 text-center hover:border-[#c9a96e]/40 transition-colors">
                  <p className="text-xl sm:text-2xl text-[#c9a96e] font-light" style={{ fontFamily: 'Playfair Display' }}>{s.value}</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#888] mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Photo Gallery */}
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#c9a96e]" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">Fotos reales</span>
              </div>
              <h2 className="text-2xl font-light mb-6" style={{ fontFamily: 'Playfair Display' }}>Galeria de <span className="italic text-[#c9a96e]">fotos</span></h2>

              {/* Tabs */}
              <div className="flex gap-1 mb-6">
                {([
                  { key: 'apartamento' as GalleryTab, label: 'Apartamento' },
                  { key: 'hotel' as GalleryTab, label: 'Hotel' },
                  { key: 'zona' as GalleryTab, label: 'Zona' },
                ]).map(t => (
                  <button key={t.key} onClick={() => { setTab(t.key); setPhotoIdx(0) }}
                    className={`px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-all ${
                      tab === t.key
                        ? 'bg-[#c9a96e] text-black font-medium'
                        : 'border border-white/10 text-[#888] hover:border-[#c9a96e]/40 hover:text-[#c9a96e]'
                    }`}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Main photo */}
              <div className="relative cursor-pointer group" onClick={() => setLightbox(true)}>
                <img src={currentPhoto.src} alt={currentPhoto.label}
                  className="w-full h-[350px] sm:h-[450px] object-cover transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v6M8 11h6" />
                    </svg>
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1.5">
                  <p className="text-xs text-white">{currentPhoto.label}</p>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1.5">
                  <p className="text-xs text-[#c9a96e]">{(photoIdx % currentPhotos.length) + 1} / {currentPhotos.length}</p>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-6 gap-2 mt-2">
                {currentPhotos.map((p, i) => (
                  <button key={i} onClick={() => setPhotoIdx(i)}
                    className={`relative h-16 sm:h-20 overflow-hidden transition-all ${
                      photoIdx % currentPhotos.length === i ? 'ring-2 ring-[#c9a96e]' : 'opacity-50 hover:opacity-100'
                    }`}>
                    <img src={p.src} alt={p.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#c9a96e]" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">Descripcion</span>
              </div>
              <p className="text-[#b8b8b8] leading-relaxed text-sm sm:text-base">{apt.description}</p>
            </div>

            {/* Features */}
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#c9a96e]" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">Caracteristicas</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {apt.features.map(f => (
                  <div key={f} className="flex items-center gap-3 p-3 border border-white/5 hover:border-[#c9a96e]/20 transition-colors">
                    <span className="text-[#c9a96e] text-sm">&#10003;</span>
                    <span className="text-sm text-[#b8b8b8]">{f}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 p-3 border border-white/5"><span className="text-[#c9a96e] text-sm">&#10003;</span><span className="text-sm text-[#b8b8b8]">{apt.bathrooms} bano{apt.bathrooms > 1 ? 's' : ''} completo{apt.bathrooms > 1 ? 's' : ''}</span></div>
                <div className="flex items-center gap-3 p-3 border border-white/5"><span className="text-[#c9a96e] text-sm">&#10003;</span><span className="text-sm text-[#b8b8b8]">Orientacion {apt.orientation}</span></div>
                <div className="flex items-center gap-3 p-3 border border-white/5"><span className="text-[#c9a96e] text-sm">&#10003;</span><span className="text-sm text-[#b8b8b8]">Piscina comunitaria</span></div>
                <div className="flex items-center gap-3 p-3 border border-white/5"><span className="text-[#c9a96e] text-sm">&#10003;</span><span className="text-sm text-[#b8b8b8]">Zonas comunes</span></div>
              </div>
            </div>

            {/* Location */}
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#c9a96e]" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">Ubicacion</span>
              </div>
              <p className="text-[#b8b8b8] text-sm mb-4">Apartahotel Diamant Blue, Calle Agua n 5, Cabo Roig, Orihuela Costa, Alicante</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm mb-6">
                {[
                  { val: '200m', label: 'Playa' },
                  { val: '5 min', label: 'Restaurantes' },
                  { val: '5 min', label: 'La Zenia Boulevard' },
                  { val: '45 min', label: 'Aeropuerto' },
                ].map(d => (
                  <div key={d.label} className="p-3 border border-white/5">
                    <p className="text-[#c9a96e] mb-1 font-light text-lg" style={{ fontFamily: 'Playfair Display' }}>{d.val}</p>
                    <p className="text-[#888] text-xs">{d.label}</p>
                  </div>
                ))}
              </div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.0!2d-0.736011!3d37.914426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63029d27ef1c53%3A0x5e0d4e3b2c8a9f0!2sAparthotel%20Diamant%20Blue!5e0!3m2!1ses!2ses!4v1"
                className="w-full h-64 border border-[#c9a96e]/20" allowFullScreen loading="lazy" />
            </div>

            {/* Similar apartments */}
            {similar.length > 0 && (
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-[#c9a96e]" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">Similares</span>
                </div>
                <h2 className="text-2xl font-light mb-6" style={{ fontFamily: 'Playfair Display' }}>Otros apartamentos de <span className="italic text-[#c9a96e]">{apt.bedrooms} dormitorio{apt.bedrooms > 1 ? 's' : ''}</span></h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {similar.map(s => (
                    <Link key={s.id} href={`/apartamento/${s.id}`} className="border border-white/10 hover:border-[#c9a96e]/40 transition-all p-4 group">
                      <h4 className="font-light mb-1 group-hover:text-[#c9a96e] transition-colors" style={{ fontFamily: 'Playfair Display' }}>Apt. {s.unit}</h4>
                      <p className="text-xs text-[#888]">Planta {s.floor} &middot; {s.area}m&sup2; &middot; {s.orientation}</p>
                      <p className="text-[#c9a96e] mt-2 font-light" style={{ fontFamily: 'Playfair Display' }}>{formatEur(s.price)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-8 border border-[#c9a96e]/20 sticky top-24">
              <p className="text-3xl text-[#c9a96e] font-light mb-1" style={{ fontFamily: 'Playfair Display' }}>{formatEur(apt.price)}</p>
              <p className="text-xs text-[#888] mb-6">Apartamento {apt.unit} &middot; Planta {apt.floor}</p>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between"><span className="text-[#888]">Senal de reserva (5%)*</span><span>{formatEur(reserva)}</span></div>
                <div className="flex justify-between"><span className="text-[#888]">IVA (21%)</span><span>{formatEur(iva)}</span></div>
                <div className="border-t border-white/10 pt-3 flex justify-between font-semibold">
                  <span>Total reserva</span><span className="text-[#c9a96e]">{formatEur(totalReserva)}</span>
                </div>
              </div>

              <p className="text-[10px] text-[#666] mb-4">*La senal confirma la reserva y retira el inmueble del mercado</p>

              {apt.status === 'available' ? (
                <Link href={`/reservar?apt=${apt.id}`} className="btn-gold w-full text-center block">Reservar este apartamento</Link>
              ) : (
                <div className="text-center p-4 bg-[#2a2a2a]">
                  <p className="text-sm text-[#888]">{apt.status === 'reserved' ? 'Este apartamento esta reservado' : 'Este apartamento esta vendido'}</p>
                </div>
              )}

              <Link href={`/crm?apt=${apt.id}`} className="btn-outline w-full text-center block mt-3 text-xs">Solicitar visita</Link>

              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3 text-center">Comercializa</p>
                <p className="font-semibold text-sm text-center mb-3">INMOBANCA</p>
                <div className="space-y-2">
                  <a href="tel:+34620300647" className="flex items-center gap-2 text-xs text-[#888] hover:text-[#c9a96e] transition-colors">
                    <span>Juan Carlos:</span> <span className="text-white">+34 620 300 647</span>
                  </a>
                  <a href="tel:+34662600893" className="flex items-center gap-2 text-xs text-[#888] hover:text-[#c9a96e] transition-colors">
                    <span>Belen:</span> <span className="text-white">+34 662 600 893</span>
                  </a>
                </div>
                <div className="flex gap-2 mt-4">
                  <a href="https://wa.me/34620300647?text=Hola%2C%20me%20interesa%20el%20apartamento%20${apt.unit}%20del%20Diamant%20Blue"
                    target="_blank" rel="noopener" className="flex-1 text-center py-2 text-xs bg-[#25D366] text-white font-medium hover:bg-[#22c55e] transition-colors">
                    WhatsApp
                  </a>
                  <a href="mailto:inmobancamurcia@gmail.com?subject=Apartamento%20${apt.unit}%20Diamant%20Blue"
                    className="flex-1 text-center py-2 text-xs border border-white/20 text-[#888] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors">
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
          <Link href="/#apartamentos" className="text-sm text-[#c9a96e] hover:underline">&larr; Volver a todos los apartamentos</Link>
          <Link href="/reservar" className="btn-gold text-xs">Reservar ahora</Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button onClick={() => setLightbox(false)} className="absolute top-6 right-6 text-white text-3xl hover:text-[#c9a96e] z-10 transition-colors">&times;</button>
          <button onClick={(e) => { e.stopPropagation(); setPhotoIdx(p => (p - 1 + currentPhotos.length) % currentPhotos.length) }}
            className="absolute left-4 md:left-8 text-white text-5xl hover:text-[#c9a96e] z-10 transition-colors">&lsaquo;</button>
          <button onClick={(e) => { e.stopPropagation(); setPhotoIdx(p => (p + 1) % currentPhotos.length) }}
            className="absolute right-4 md:right-8 text-white text-5xl hover:text-[#c9a96e] z-10 transition-colors">&rsaquo;</button>
          <div className="max-w-5xl max-h-[85vh] px-4" onClick={e => e.stopPropagation()}>
            <img src={currentPhoto.src} alt={currentPhoto.label} className="max-w-full max-h-[80vh] object-contain mx-auto" />
            <p className="text-center text-sm text-[#888] mt-4">{currentPhoto.label} &mdash; {(photoIdx % currentPhotos.length) + 1} / {currentPhotos.length}</p>
          </div>
        </div>
      )}
    </div>
  )
}
