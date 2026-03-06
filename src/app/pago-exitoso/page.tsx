'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { apartments, formatEur } from '@/lib/apartments'
import Link from 'next/link'

function PagoExitosoContent() {
  const params = useSearchParams()
  const aptId = params.get('apt') || ''
  const nombre = params.get('nombre') || ''
  const apellidos = params.get('apellidos') || ''
  const dni = params.get('dni') || ''
  const email = params.get('email') || ''
  const telefono = params.get('telefono') || ''

  const apt = apartments.find(a => a.id === aptId)
  const [notified, setNotified] = useState(false)

  const reserva = apt ? Math.round(apt.price * 0.05) : 0
  const iva = Math.round(reserva * 0.21)
  const total = reserva + iva

  // Notify Juan Carlos via WhatsApp (only once)
  useEffect(() => {
    if (apt && !notified) {
      setNotified(true)
      // Open WhatsApp notification to Juan Carlos
      const msg = encodeURIComponent(
        `RESERVA COMPLETADA!\n\nApartamento ${apt.unit} - Planta ${apt.floor}\nCliente: ${nombre} ${apellidos}\nDNI: ${dni}\nEmail: ${email}\nTel: ${telefono}\nImporte pagado: ${formatEur(total)}\n\nDiamant Blue - Cabo Roig`
      )
      window.open(`https://wa.me/34620300647?text=${msg}`, '_blank')
    }
  }, [apt, notified, nombre, apellidos, dni, email, telefono, total])

  if (!apt) return (
    <div className="pt-24 text-center text-[#888] min-h-screen">
      <p>Error: apartamento no encontrado</p>
      <Link href="/" className="btn-outline text-xs mt-4 inline-block">Volver al inicio</Link>
    </div>
  )

  const facturaUrl = `/api/factura?apt=${aptId}&nombre=${encodeURIComponent(nombre)}&apellidos=${encodeURIComponent(apellidos)}&dni=${encodeURIComponent(dni)}&email=${encodeURIComponent(email)}&fecha=${encodeURIComponent(new Date().toLocaleDateString('es-ES'))}`

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        {/* Success header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"><polyline points="20,6 9,17 4,12" /></svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Reserva <span className="italic text-green-400">confirmada</span>
          </h1>
          <p className="text-[#888]">Tu pago ha sido procesado correctamente</p>
        </div>

        {/* Reservation details */}
        <div className="p-8 border border-green-500/20 bg-green-500/5 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Apartamento reservado</p>
              <p className="text-2xl font-light mb-1" style={{ fontFamily: 'Playfair Display' }}>Apartamento {apt.unit}</p>
              <p className="text-sm text-[#888]">Planta {apt.floor} &middot; {apt.area}m&sup2; &middot; {apt.orientation}</p>
              <p className="text-xl text-[#c9a96e] mt-3" style={{ fontFamily: 'Playfair Display' }}>{formatEur(apt.price)}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Comprador</p>
              <p className="font-medium">{nombre} {apellidos}</p>
              <p className="text-sm text-[#888]">DNI: {dni}</p>
              <p className="text-sm text-[#888]">{email}</p>
              <p className="text-sm text-[#888]">{telefono}</p>
            </div>
          </div>
          <div className="border-t border-green-500/20 mt-6 pt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#888]">Comision gestion inmobiliaria (5%)</span>
              <span>{formatEur(reserva)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#888]">IVA (21%)</span>
              <span>{formatEur(iva)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t border-green-500/20 pt-3 mt-3">
              <span>Total pagado</span>
              <span className="text-green-400">{formatEur(total)}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <a href={facturaUrl} target="_blank" rel="noopener" className="btn-gold text-center">
            Ver factura
          </a>
          <Link href={`/contrato-reserva?apt=${aptId}&nombre=${encodeURIComponent(nombre)}&apellidos=${encodeURIComponent(apellidos)}&dni=${encodeURIComponent(dni)}&payment=success`}
            className="btn-outline text-center">
            Ver contrato de reserva
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <a href={`mailto:${email}?subject=${encodeURIComponent(`Factura reserva Apartamento ${apt.unit} - Diamant Blue`)}&body=${encodeURIComponent(`Adjunto encontrara su factura de reserva.\n\nApartamento ${apt.unit}\nImporte: ${formatEur(total)}\n\nINMOBANCA\n+34 620 300 647`)}`}
            className="text-center py-3 border border-white/20 text-sm text-[#888] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors">
            Enviar factura por email
          </a>
          <a href={`https://wa.me/${telefono.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${nombre}, su reserva del Apartamento ${apt.unit} en Diamant Blue ha sido confirmada. Importe: ${formatEur(total)}. Le adjuntaremos la factura y contrato. INMOBANCA +34 620 300 647`)}`}
            target="_blank" rel="noopener"
            className="text-center py-3 border border-[#25D366]/30 text-sm text-[#25D366] hover:bg-[#25D366]/10 transition-colors">
            Enviar confirmacion por WhatsApp
          </a>
        </div>

        {/* Next steps */}
        <div className="p-6 border border-[#c9a96e]/20 glass">
          <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-4">Proximos pasos</p>
          <div className="space-y-3 text-sm text-[#b8b8b8]">
            <div className="flex items-start gap-3">
              <span className="text-[#c9a96e] font-bold">1.</span>
              <p>Su apartamento ha sido <strong className="text-green-400">retirado del mercado</strong>. Nadie mas podra reservarlo.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#c9a96e] font-bold">2.</span>
              <p>En los proximos <strong>30 dias</strong> se formalizara el contrato de arras o escritura publica.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#c9a96e] font-bold">3.</span>
              <p>Nuestro agente <strong>Juan Carlos Martinez</strong> se pondra en contacto con usted para coordinar los siguientes pasos.</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <p className="text-xs text-[#888] mb-2">Contacto directo</p>
            <a href="tel:+34620300647" className="text-[#c9a96e] hover:underline">+34 620 300 647</a>
            <span className="text-[#555] mx-2">&middot;</span>
            <a href="mailto:inmobancamurcia@gmail.com" className="text-[#c9a96e] hover:underline">inmobancamurcia@gmail.com</a>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-[#888] hover:text-[#c9a96e] transition-colors">&larr; Volver al inicio</Link>
        </div>
      </div>
    </div>
  )
}

export default function PagoExitosoPage() {
  return <Suspense fallback={<div className="pt-24 text-center text-[#888] min-h-screen">Procesando pago...</div>}><PagoExitosoContent /></Suspense>
}
