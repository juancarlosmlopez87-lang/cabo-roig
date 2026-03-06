'use client'
import Link from 'next/link'
import { apartments, formatEur } from '@/lib/apartments'

const UNS = 'https://images.unsplash.com'
const GA = 'https://images.getaroom-cdn.com/image/upload/s--'
const DB_EXTERIOR = `${GA}KtAwSW2U--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1769578125/864f5fdbb97a797431477845b405cdd0ab6475a5`
const ZONE = 'https://diamantblue.com/images/stories'

export default function PropietariaPage() {
  const available = apartments.filter(a => a.status === 'available').length
  const reserved = apartments.filter(a => a.status === 'reserved').length
  const sold = apartments.filter(a => a.status === 'sold').length
  const totalValue = apartments.reduce((s, a) => s + a.price, 0)
  const avgPrice = Math.round(totalValue / apartments.length)

  return (
    <div className="pt-20 pb-20 min-h-screen">
      {/* Hero banner */}
      <div className="relative h-[35vh] min-h-[250px] sm:min-h-[300px] mb-8 sm:mb-12">
        <img src={DB_EXTERIOR} alt="Diamant Blue" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <div className="gold-line-center mb-4 sm:mb-6" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-3 sm:mb-4" style={{ fontFamily: 'Playfair Display' }}>
              {'\u041F\u043E\u0440\u0442\u0430\u043B'} <span className="italic text-gold-gradient">{'\u0412\u043B\u0430\u0434\u0435\u043B\u044C\u0446\u0430'}</span>
            </h1>
            <p className="text-[#ccc] text-sm sm:text-base">{'\u042D\u043A\u0441\u043A\u043B\u044E\u0437\u0438\u0432\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F \u0434\u043B\u044F \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u0438\u043A\u0430 \u0437\u0434\u0430\u043D\u0438\u044F'}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Welcome card */}
        <div className="p-6 sm:p-8 md:p-12 border border-[#c9a96e]/20 bg-[#0f0f0f] mb-6 sm:mb-8 glass">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#c9a96e] flex items-center justify-center">
              <span className="text-[#c9a96e] text-lg sm:text-xl font-bold" style={{ fontFamily: 'Playfair Display' }}>D</span>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-light text-[#c9a96e]" style={{ fontFamily: 'Playfair Display' }}>{'\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C'}</h2>
              <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#888]">Aparthotel Diamant Blue</p>
            </div>
          </div>
          <p className="text-[#ccc] leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
            {'\u042D\u0442\u043E\u0442 \u043F\u043E\u0440\u0442\u0430\u043B \u043F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0434\u043B\u044F \u0432\u043B\u0430\u0434\u0435\u043B\u044C\u0446\u0430 \u0410\u043F\u0430\u0440\u0442-\u043E\u0442\u0435\u043B\u044F Diamant Blue. \u0417\u0434\u0435\u0441\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u044C\u0441\u044F \u0441\u043E \u0441\u0442\u0430\u0442\u0443\u0441\u043E\u043C \u043F\u0440\u043E\u0434\u0430\u0436, \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C \u0434\u043E\u0433\u043E\u0432\u043E\u0440 \u044D\u043A\u0441\u043A\u043B\u044E\u0437\u0438\u0432\u043D\u043E\u0441\u0442\u0438 \u0438 \u0441\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u0432\u0430\u0448\u0438\u043C \u0430\u0433\u0435\u043D\u0442\u043E\u043C \u2014 \u0425\u0443\u0430\u043D\u043E\u043C \u041A\u0430\u0440\u043B\u043E\u0441\u043E\u043C \u041C\u0430\u0440\u0442\u0438\u043D\u0435\u0441\u043E\u043C \u041B\u043E\u043F\u0435\u0441\u043E\u043C (INMOBANCA).'}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="p-4 sm:p-5 border border-green-500/20 bg-green-500/5 text-center">
              <p className="text-2xl sm:text-3xl font-light text-green-400" style={{ fontFamily: 'Playfair Display' }}>{available}</p>
              <p className="text-[10px] sm:text-xs tracking-wider uppercase text-[#888] mt-1">{'\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E'}</p>
            </div>
            <div className="p-4 sm:p-5 border border-amber-500/20 bg-amber-500/5 text-center">
              <p className="text-2xl sm:text-3xl font-light text-amber-400" style={{ fontFamily: 'Playfair Display' }}>{reserved}</p>
              <p className="text-[10px] sm:text-xs tracking-wider uppercase text-[#888] mt-1">{'\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043E'}</p>
            </div>
            <div className="p-4 sm:p-5 border border-red-500/20 bg-red-500/5 text-center">
              <p className="text-2xl sm:text-3xl font-light text-red-400" style={{ fontFamily: 'Playfair Display' }}>{sold}</p>
              <p className="text-[10px] sm:text-xs tracking-wider uppercase text-[#888] mt-1">{'\u041F\u0440\u043E\u0434\u0430\u043D\u043E'}</p>
            </div>
          </div>

          {/* Financial summary */}
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="p-4 sm:p-5 border border-[#c9a96e]/20 text-center">
              <p className="text-[10px] sm:text-xs tracking-wider uppercase text-[#888] mb-1">{'\u041E\u0431\u0449\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C'}</p>
              <p className="text-xl sm:text-2xl font-light text-[#c9a96e]" style={{ fontFamily: 'Playfair Display' }}>{formatEur(totalValue)}</p>
            </div>
            <div className="p-4 sm:p-5 border border-[#c9a96e]/20 text-center">
              <p className="text-[10px] sm:text-xs tracking-wider uppercase text-[#888] mb-1">{'\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0446\u0435\u043D\u0430'}</p>
              <p className="text-xl sm:text-2xl font-light text-[#c9a96e]" style={{ fontFamily: 'Playfair Display' }}>{formatEur(avgPrice)}</p>
            </div>
          </div>

          {/* Apartment list */}
          <h3 className="text-base sm:text-lg font-light mb-4 text-[#c9a96e]" style={{ fontFamily: 'Playfair Display' }}>{'\u0421\u0442\u0430\u0442\u0443\u0441 \u0430\u043F\u0430\u0440\u0442\u0430\u043C\u0435\u043D\u0442\u043E\u0432'}</h3>

          {/* Floor 3 */}
          <p className="text-xs tracking-wider uppercase text-[#888] mb-2 mt-4">{'\u042D\u0442\u0430\u0436'} 3</p>
          <div className="space-y-2 mb-6">
            {apartments.filter(a => a.floor === 3).map(a => (
              <div key={a.id} className="flex items-center justify-between p-3 sm:p-4 border border-white/10 hover:border-[#c9a96e]/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-sm sm:text-base">{'\u0410\u043F\u0430\u0440\u0442\u0430\u043C\u0435\u043D\u0442'} {a.unit}</span>
                  <span className="text-[10px] sm:text-xs text-[#888] ml-2 sm:ml-3">{a.bedrooms} {'\u0441\u043F\u0430\u043B.'} - {a.area}{'\u043C\u00B2'} - {a.orientation}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <span className="text-[#c9a96e] text-sm sm:text-base">{formatEur(a.price)}</span>
                  <span className={`px-2 py-0.5 text-[9px] sm:text-[10px] tracking-wider uppercase border ${
                    a.status === 'available' ? 'text-green-400 bg-green-500/10 border-green-500/30' :
                    a.status === 'reserved' ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' :
                    'text-red-400 bg-red-500/10 border-red-500/30'
                  }`}>
                    {a.status === 'available' ? '\u0414\u043E\u0441\u0442\u0443\u043F\u0435\u043D' : a.status === 'reserved' ? '\u0417\u0430\u0431\u0440\u043E\u043D.' : '\u041F\u0440\u043E\u0434\u0430\u043D'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Floor 4 */}
          <p className="text-xs tracking-wider uppercase text-[#888] mb-2">{'\u042D\u0442\u0430\u0436'} 4</p>
          <div className="space-y-2 mb-8">
            {apartments.filter(a => a.floor === 4).map(a => (
              <div key={a.id} className="flex items-center justify-between p-3 sm:p-4 border border-white/10 hover:border-[#c9a96e]/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-sm sm:text-base">{'\u0410\u043F\u0430\u0440\u0442\u0430\u043C\u0435\u043D\u0442'} {a.unit}</span>
                  <span className="text-[10px] sm:text-xs text-[#888] ml-2 sm:ml-3">{a.bedrooms} {'\u0441\u043F\u0430\u043B.'} - {a.area}{'\u043C\u00B2'} - {a.orientation}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <span className="text-[#c9a96e] text-sm sm:text-base">{formatEur(a.price)}</span>
                  <span className={`px-2 py-0.5 text-[9px] sm:text-[10px] tracking-wider uppercase border ${
                    a.status === 'available' ? 'text-green-400 bg-green-500/10 border-green-500/30' :
                    a.status === 'reserved' ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' :
                    'text-red-400 bg-red-500/10 border-red-500/30'
                  }`}>
                    {a.status === 'available' ? '\u0414\u043E\u0441\u0442\u0443\u043F\u0435\u043D' : a.status === 'reserved' ? '\u0417\u0430\u0431\u0440\u043E\u043D.' : '\u041F\u0440\u043E\u0434\u0430\u043D'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action cards */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Link href="/contrato-exclusividad" className="p-6 sm:p-8 border border-[#c9a96e]/20 bg-[#0f0f0f] hover:border-[#c9a96e]/50 transition-all text-center group hover:-translate-y-1 glass">
            <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform">{'\uD83D\uDCDD'}</span>
            <p className="text-[#c9a96e] text-base sm:text-lg mb-2" style={{ fontFamily: 'Playfair Display' }}>{'\u0414\u043E\u0433\u043E\u0432\u043E\u0440 \u044D\u043A\u0441\u043A\u043B\u044E\u0437\u0438\u0432\u043D\u043E\u0441\u0442\u0438'}</p>
            <p className="text-[10px] sm:text-xs text-[#888]">{'\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C \u0434\u043E\u0433\u043E\u0432\u043E\u0440'}</p>
          </Link>
          <Link href="/crm" className="p-6 sm:p-8 border border-[#c9a96e]/20 bg-[#0f0f0f] hover:border-[#c9a96e]/50 transition-all text-center group hover:-translate-y-1 glass">
            <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform">{'\uD83D\uDCC5'}</span>
            <p className="text-[#c9a96e] text-base sm:text-lg mb-2" style={{ fontFamily: 'Playfair Display' }}>CRM {'\u0438 \u0432\u0438\u0437\u0438\u0442\u044B'}</p>
            <p className="text-[10px] sm:text-xs text-[#888]">{'\u041A\u043B\u0438\u0435\u043D\u0442\u044B, \u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0432\u0438\u0437\u0438\u0442\u044B \u0438 \u0432\u043E\u0440\u043E\u043D\u043A\u0430 \u043F\u0440\u043E\u0434\u0430\u0436'}</p>
          </Link>
        </div>

        {/* Gallery mini */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
          <img src={`${ZONE}/xslide3.jpg.pagespeed.ic.e3LlOtwGma.jpg`} alt="Beach" className="w-full h-24 sm:h-36 object-cover hover:scale-[1.02] transition-transform" />
          <img src={DB_EXTERIOR} alt="Hotel" className="w-full h-24 sm:h-36 object-cover hover:scale-[1.02] transition-transform" />
          <img src={`${UNS}/photo-1575429198097-0414ec08e8cd?w=600&q=80`} alt="Pool" className="w-full h-24 sm:h-36 object-cover hover:scale-[1.02] transition-transform" />
        </div>

        {/* Agent contact */}
        <div className="p-6 sm:p-8 border border-[#c9a96e]/20 bg-[#0f0f0f] text-center glass">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3 sm:mb-4">{'\u0412\u0430\u0448 \u0430\u0433\u0435\u043D\u0442'}</p>
          <p className="text-xl sm:text-2xl font-light mb-2" style={{ fontFamily: 'Playfair Display' }}>INMOBANCA</p>
          <p className="text-[#888] text-sm mb-4 sm:mb-6">{'\u0425\u0443\u0430\u043D \u041A\u0430\u0440\u043B\u043E\u0441 \u041C\u0430\u0440\u0442\u0438\u043D\u0435\u0441 \u041B\u043E\u043F\u0435\u0441'}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-[#888]">
            <a href="tel:+34620300647" className="hover:text-[#c9a96e] transition-colors">{'\u0422\u0435\u043B'}: +34 620 300 647</a>
            <a href="mailto:inmobancamurcia@gmail.com" className="hover:text-[#c9a96e] transition-colors">inmobancamurcia@gmail.com</a>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5">
            <a href="https://wa.me/34620300647?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%BC%D0%B5%D0%BD%D1%8F%20%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B5%D1%81%D1%83%D0%B5%D1%82%20Diamant%20Blue"
              target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-all hover:scale-105"
              style={{ background: '#25D366' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {'\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432 WhatsApp'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
