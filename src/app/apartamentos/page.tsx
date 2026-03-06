'use client'
import Link from 'next/link'
import { apartments, formatEur } from '@/lib/apartments'
import { useI18n } from '@/lib/i18n'

const CB = 'https://apart-diamant-blue.costablanca-hotels.com/data/Pics/OriginalPhoto'
const REAL = {
  living:   `${CB}/5161/516151/516151083/aparthotel-diamant-blue-orihuela-pic-58.JPEG`,
  seaView:  `${CB}/1928/192890/192890386/aparthotel-diamant-blue-orihuela-pic-12.JPEG`,
  bedroom1: `${CB}/6976/697608/697608579/aparthotel-diamant-blue-orihuela-pic-43.JPEG`,
  terrace:  `${CB}/6976/697609/697609272/aparthotel-diamant-blue-orihuela-pic-13.JPEG`,
  bedroom2: `${CB}/6976/697609/697609743/aparthotel-diamant-blue-orihuela-pic-7.JPEG`,
  dining:   `${CB}/2917/291798/291798236/aparthotel-diamant-blue-orihuela-pic-57.JPEG`,
  lobby:    `${CB}/15804/1580457/1580457955/aparthotel-diamant-blue-orihuela-pic-1.JPEG`,
  marina:   `${CB}/1761/176133/176133465/aparthotel-diamant-blue-orihuela-pic-20.JPEG`,
  bathroom: `${CB}/6976/697608/697608759/aparthotel-diamant-blue-orihuela-pic-48.JPEG`,
  pool:     `${CB}/6976/697608/697608798/aparthotel-diamant-blue-orihuela-pic-35.JPEG`,
}

const aptImages: Record<string, string> = {
  '3a': REAL.living, '3b': REAL.seaView, '3c': REAL.bedroom1,
  '3d': REAL.terrace, '3e': REAL.bedroom2, '3f': REAL.dining,
  '4a': REAL.lobby, '4b': REAL.marina, '4c': REAL.bathroom,
  '4d': REAL.seaView, '4e': REAL.living, '4f': REAL.terrace,
}

export default function ApartamentosPage() {
  const { t } = useI18n()
  const floor3 = apartments.filter(a => a.floor === 3)
  const floor4 = apartments.filter(a => a.floor === 4)

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-[#c9a96e]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e]">Portafolio</span>
            <div className="w-10 h-px bg-[#c9a96e]" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Nuestros <span className="italic text-gold-gradient">apartamentos</span>
          </h1>
          <p className="text-[#888] max-w-xl mx-auto text-sm sm:text-base">
            12 apartamentos exclusivos en plantas 3 y 4 del Apartahotel Diamant Blue, Cabo Roig, Orihuela Costa
          </p>
        </div>

        {/* Floor sections */}
        {[{ floor: 3, apts: floor3 }, { floor: 4, apts: floor4 }].map(({ floor, apts }) => (
          <div key={floor} className={floor === 3 ? 'mb-16 sm:mb-24' : ''}>
            <div className="flex items-center gap-4 mb-8 sm:mb-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 border border-[#c9a96e]/50 flex items-center justify-center">
                <span className="text-[#c9a96e] text-lg sm:text-xl font-light" style={{ fontFamily: 'Playfair Display' }}>{floor}</span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-light" style={{ fontFamily: 'Playfair Display' }}>Planta {floor}</h2>
                <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#666]">
                  6 apartamentos &middot; desde {formatEur(Math.min(...apts.map(a => a.price)))}
                </p>
              </div>
              <div className="ml-auto hidden sm:block">
                <span className="text-xs text-[#c9a96e] border border-[#c9a96e]/30 px-3 py-1.5">
                  {apts.filter(a => a.status === 'available').length} disponibles
                </span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {apts.map(apt => {
                const img = aptImages[apt.id] || aptImages['3a']
                const statusBadge = apt.status === 'available' ? 'badge-available' : apt.status === 'reserved' ? 'badge-reserved' : 'badge-sold'
                const statusLabel = apt.status === 'available' ? t.apts_available : apt.status === 'reserved' ? t.apts_reserved : t.apts_sold

                return (
                  <Link href={`/apartamento/${apt.id}`} key={apt.id} className="luxury-card overflow-hidden group block">
                    <div className="relative h-44 sm:h-52 overflow-hidden">
                      <img src={img} alt={`Apartamento ${apt.unit}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4"><span className={statusBadge}>{statusLabel}</span></div>
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/60 backdrop-blur-sm px-2 sm:px-3 py-1">
                        <span className="text-[10px] sm:text-xs text-[#c9a96e] font-medium">{apt.area} m&sup2;</span>
                      </div>
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-[#c9a96e] text-black text-xs font-bold px-3 py-1.5">{formatEur(apt.price)}</span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-base sm:text-lg font-light" style={{ fontFamily: 'Playfair Display' }}>Apartamento {apt.unit}</h3>
                          <p className="text-[10px] sm:text-xs text-[#666] mt-1">Planta {apt.floor} &middot; {apt.orientation}</p>
                        </div>
                        <p className="text-lg sm:text-xl text-[#c9a96e] font-light" style={{ fontFamily: 'Playfair Display' }}>{formatEur(apt.price)}</p>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#555] mb-3">
                        <span>{apt.bedrooms} {t.apts_bed}</span>
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
              })}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link href="/reservar" className="btn-gold">Reservar apartamento</Link>
          <p className="text-xs text-[#666] mt-4">Senal del 5% + IVA &middot; Pago seguro con tarjeta</p>
        </div>
      </div>
    </div>
  )
}
