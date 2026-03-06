'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { apartments, formatEur } from '@/lib/apartments'
import Link from 'next/link'

/* ── Unsplash high-quality apartment photos ── */
const UNS = 'https://images.unsplash.com'

const aptHeroImages: Record<string, string> = {
  '3a': `${UNS}/photo-1502672260266-1c1ef2d93688?w=1400&q=80`,
  '3b': `${UNS}/photo-1560448204-e02f11c3d0e2?w=1400&q=80`,
  '3c': `${UNS}/photo-1522771739844-6a9f6d5f14af?w=1400&q=80`,
  '3d': `${UNS}/photo-1600585154340-be6161a56a0c?w=1400&q=80`,
  '3e': `${UNS}/photo-1556909114-f6e7ad7d3136?w=1400&q=80`,
  '3f': `${UNS}/photo-1600607687939-ce8a6c25118c?w=1400&q=80`,
  '4a': `${UNS}/photo-1600566753086-00f18fb6b3ea?w=1400&q=80`,
  '4b': `${UNS}/photo-1600596542815-ffad4c1539a9?w=1400&q=80`,
  '4c': `${UNS}/photo-1616594039964-ae9021a400a0?w=1400&q=80`,
  '4d': `${UNS}/photo-1600607687644-c7171b42498f?w=1400&q=80`,
  '4e': `${UNS}/photo-1493809842364-78817add7ffb?w=1400&q=80`,
  '4f': `${UNS}/photo-1484154218962-a197022b5858?w=1400&q=80`,
}

/* ── Gallery photos organized by category ── */
const GA = 'https://images.getaroom-cdn.com/image/upload/s--'
const DB_EXTERIOR = `${GA}KtAwSW2U--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1769578125/864f5fdbb97a797431477845b405cdd0ab6475a5`
const DB_POOL = `${GA}8V-WFXAB--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1769578125/f158d20eb10538ff85deb477e57b136f4ee6153a`
const ZONE = 'https://diamantblue.com/images/stories'

const galleryPhotos = {
  apartamento: [
    { src: `${UNS}/photo-1502672260266-1c1ef2d93688?w=940&q=80`, label: 'Salon luminoso' },
    { src: `${UNS}/photo-1522771739844-6a9f6d5f14af?w=940&q=80`, label: 'Dormitorio principal' },
    { src: `${UNS}/photo-1556909114-f6e7ad7d3136?w=940&q=80`, label: 'Cocina equipada' },
    { src: `${UNS}/photo-1600596542815-ffad4c1539a9?w=940&q=80`, label: 'Terraza con vistas' },
    { src: `${UNS}/photo-1600607687939-ce8a6c25118c?w=940&q=80`, label: 'Bano moderno' },
    { src: `${UNS}/photo-1600585154340-be6161a56a0c?w=940&q=80`, label: 'Vista del salon' },
  ],
  hotel: [
    { src: DB_EXTERIOR, label: 'Fachada Apartahotel Diamant Blue' },
    { src: `${UNS}/photo-1575429198097-0414ec08e8cd?w=940&q=80`, label: 'Piscina comunitaria' },
    { src: DB_POOL, label: 'Zona de piscina' },
    { src: `${UNS}/photo-1600566753086-00f18fb6b3ea?w=940&q=80`, label: 'Cocina moderna' },
    { src: `${UNS}/photo-1616594039964-ae9021a400a0?w=940&q=80`, label: 'Habitacion doble' },
    { src: `${UNS}/photo-1600607687644-c7171b42498f?w=940&q=80`, label: 'Interior de lujo' },
  ],
  zona: [
    { src: `${ZONE}/xslide3.jpg.pagespeed.ic.e3LlOtwGma.jpg`, label: 'Playa de Cabo Roig' },
    { src: `${ZONE}/xslide11.jpg.pagespeed.ic.pfYgG3DoMn.jpg`, label: 'Club nautico' },
    { src: `${ZONE}/xslide1.jpg.pagespeed.ic.I4M4sKQsVM.jpg`, label: 'Paseo maritimo' },
    { src: `${ZONE}/xslide5.jpg.pagespeed.ic.7Lv0k7I5Or.jpg`, label: 'Cala de Cabo Roig' },
    { src: `${UNS}/photo-1514933651103-005eec06c04b?w=940&q=80`, label: 'Vida nocturna' },
    { src: `${ZONE}/xslide2.jpg.pagespeed.ic.EpjPHoTJLa.jpg`, label: 'Costa mediterranea' },
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
    <div className="pt-24 text-center text-[#888] min-h-screen">
      <p>Apartamento no encontrado</p>
      <Link href="/#apartamentos" className="text-[#c9a96e] hover:underline mt-4 inline-block">Volver</Link>
    </div>
  )

  const heroImg = aptHeroImages[id] || aptHeroImages['3a']
  const reserva = Math.round(apt.price * 0.05)
  const iva = Math.round(reserva * 0.21)
  const totalReserva = reserva + iva

  const currentPhotos = galleryPhotos[tab]
  const currentPhoto = currentPhotos[photoIdx % currentPhotos.length]

  function changeTab(t: GalleryTab) {
    setTab(t)
    setPhotoIdx(0)
  }

  return (
    <div className="pt-20">
      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img src={heroImg} alt={`Apartamento ${apt.unit}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-2">Planta {apt.floor} · {apt.orientation}</p>
          <h1 className="text-4xl md:text-6xl font-light" style={{ fontFamily: 'Playfair Display' }}>Apartamento <span className="italic text-[#c9a96e]">{apt.unit}</span></h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Price & stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: formatEur(apt.price), label: 'Precio' },
                { value: `${apt.area} m²`, label: 'Superficie' },
                { value: `${apt.bedrooms}`, label: `Dormitorio${apt.bedrooms > 1 ? 's' : ''}` },
                { value: `${apt.terrace} m²`, label: 'Terraza' },
              ].map(s => (
                <div key={s.label} className="p-4 border border-[#c9a96e]/15 text-center">
                  <p className="text-2xl text-[#c9a96e] font-light" style={{ fontFamily: 'Playfair Display' }}>{s.value}</p>
                  <p className="text-xs tracking-[0.15em] uppercase text-[#888] mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* ============ PHOTO GALLERY ============ */}
            <div>
              <div className="gold-line mb-4" />
              <h2 className="text-2xl font-light mb-6" style={{ fontFamily: 'Playfair Display' }}>Galeria de <span className="italic text-[#c9a96e]">fotos</span></h2>

              {/* Tabs */}
              <div className="flex gap-1 mb-6">
                {([
                  { key: 'apartamento' as GalleryTab, label: 'Apartamento' },
                  { key: 'hotel' as GalleryTab, label: 'Hotel' },
                  { key: 'zona' as GalleryTab, label: 'Zona' },
                ]).map(t => (
                  <button key={t.key} onClick={() => changeTab(t.key)}
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
                  className="w-full h-[400px] object-cover transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm tracking-wider bg-black/50 px-4 py-2">
                    Ampliar foto
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
                    className={`relative h-20 overflow-hidden transition-all ${
                      photoIdx % currentPhotos.length === i ? 'ring-2 ring-[#c9a96e]' : 'opacity-60 hover:opacity-100'
                    }`}>
                    <img src={p.src} alt={p.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="gold-line mb-4" />
              <h2 className="text-2xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>Descripcion</h2>
              <p className="text-[#b8b8b8] leading-relaxed">{apt.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>Caracteristicas</h2>
              <div className="grid grid-cols-2 gap-3">
                {apt.features.map(f => (
                  <div key={f} className="flex items-center gap-3 p-3 border border-white/5">
                    <span className="text-[#c9a96e]">✓</span>
                    <span className="text-sm text-[#b8b8b8]">{f}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 p-3 border border-white/5"><span className="text-[#c9a96e]">✓</span><span className="text-sm text-[#b8b8b8]">{apt.bathrooms} bano{apt.bathrooms > 1 ? 's' : ''} completo{apt.bathrooms > 1 ? 's' : ''}</span></div>
                <div className="flex items-center gap-3 p-3 border border-white/5"><span className="text-[#c9a96e]">✓</span><span className="text-sm text-[#b8b8b8]">Orientacion {apt.orientation}</span></div>
                <div className="flex items-center gap-3 p-3 border border-white/5"><span className="text-[#c9a96e]">✓</span><span className="text-sm text-[#b8b8b8]">Piscina comunitaria</span></div>
                <div className="flex items-center gap-3 p-3 border border-white/5"><span className="text-[#c9a96e]">✓</span><span className="text-sm text-[#b8b8b8]">Zonas comunes</span></div>
              </div>
            </div>

            {/* Location */}
            <div>
              <div className="gold-line mb-4" />
              <h2 className="text-2xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>Ubicacion</h2>
              <p className="text-[#b8b8b8] text-sm mb-4">Apartahotel Diamant Blue, Calle Agua n 5, Cabo Roig, Orihuela Costa, Alicante</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm mb-6">
                <div className="p-3 border border-white/5"><p className="text-[#c9a96e] mb-1">200m</p><p className="text-[#888] text-xs">Playa</p></div>
                <div className="p-3 border border-white/5"><p className="text-[#c9a96e] mb-1">5 min</p><p className="text-[#888] text-xs">Restaurantes</p></div>
                <div className="p-3 border border-white/5"><p className="text-[#c9a96e] mb-1">5 min</p><p className="text-[#888] text-xs">La Zenia Boulevard</p></div>
                <div className="p-3 border border-white/5"><p className="text-[#c9a96e] mb-1">45 min</p><p className="text-[#888] text-xs">Aeropuerto</p></div>
              </div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.0!2d-0.736011!3d37.914426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63029d27ef1c53%3A0x5e0d4e3b2c8a9f0!2sAparthotel%20Diamant%20Blue!5e0!3m2!1ses!2ses!4v1"
                className="w-full h-64 border border-[#c9a96e]/20" allowFullScreen loading="lazy" />
            </div>
          </div>

          {/* Sidebar: Reserve */}
          <div className="space-y-6">
            <div className="p-8 border border-[#c9a96e]/20 sticky top-24">
              <p className="text-3xl text-[#c9a96e] font-light mb-1" style={{ fontFamily: 'Playfair Display' }}>{formatEur(apt.price)}</p>
              <p className="text-xs text-[#888] mb-6">Apartamento {apt.unit} · Planta {apt.floor}</p>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between"><span className="text-[#888]">Senal de reserva (5%)*</span><span>{formatEur(reserva)}</span></div>
                <div className="flex justify-between"><span className="text-[#888]">IVA (21%)</span><span>{formatEur(iva)}</span></div>
                <div className="border-t border-white/10 pt-3 flex justify-between font-semibold">
                  <span>Total reserva</span><span className="text-[#c9a96e]">{formatEur(totalReserva)}</span>
                </div>
              </div>

              <p className="text-[10px] text-[#666] mb-4">*La senal se descuenta del precio final en escritura</p>

              {apt.status === 'available' ? (
                <Link href={`/reservar?apt=${apt.id}`} className="btn-gold w-full text-center block">Reservar este apartamento</Link>
              ) : (
                <div className="text-center p-4 bg-[#2a2a2a]">
                  <p className="text-sm text-[#888]">{apt.status === 'reserved' ? 'Este apartamento esta reservado' : 'Este apartamento esta vendido'}</p>
                </div>
              )}

              <Link href={`/crm?apt=${apt.id}`} className="btn-outline w-full text-center block mt-3 text-xs">Solicitar visita</Link>

              <div className="mt-6 pt-6 border-t border-white/5 text-center">
                <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-2">Comercializa</p>
                <p className="font-semibold text-sm">INMOBANCA</p>
                <p className="text-xs text-[#888]">Juan Carlos: +34 620 300 647</p>
                <p className="text-xs text-[#888]">Belen: +34 662 600 893</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <Link href="/#apartamentos" className="text-sm text-[#c9a96e] hover:underline">← Volver a todos los apartamentos</Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button onClick={() => setLightbox(false)} className="absolute top-6 right-6 text-white text-2xl hover:text-[#c9a96e] z-10">✕</button>
          <button onClick={(e) => { e.stopPropagation(); setPhotoIdx(p => (p - 1 + currentPhotos.length) % currentPhotos.length) }}
            className="absolute left-4 md:left-8 text-white text-4xl hover:text-[#c9a96e] z-10">‹</button>
          <button onClick={(e) => { e.stopPropagation(); setPhotoIdx(p => (p + 1) % currentPhotos.length) }}
            className="absolute right-4 md:right-8 text-white text-4xl hover:text-[#c9a96e] z-10">›</button>
          <div className="max-w-5xl max-h-[85vh] px-4" onClick={e => e.stopPropagation()}>
            <img src={currentPhoto.src} alt={currentPhoto.label} className="max-w-full max-h-[80vh] object-contain mx-auto" />
            <p className="text-center text-sm text-[#888] mt-4">{currentPhoto.label} — {(photoIdx % currentPhotos.length) + 1} / {currentPhotos.length}</p>
          </div>
        </div>
      )}
    </div>
  )
}
