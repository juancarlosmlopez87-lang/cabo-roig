'use client'
import { useState, useEffect } from 'react'
import { apartments, formatEur } from '@/lib/apartments'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ReservarContent() {
  const searchParams = useSearchParams()
  const preselected = searchParams.get('apt') || ''
  const [selectedId, setSelectedId] = useState(preselected)
  const [form, setForm] = useState({ nombre: '', apellidos: '', dni: '', email: '', telefono: '', direccion: '' })
  const [accepted, setAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)

  useEffect(() => { if (preselected) setSelectedId(preselected) }, [preselected])

  const apt = apartments.find(a => a.id === selectedId)
  const available = apartments.filter(a => a.status === 'available')
  const reserva = apt ? Math.round(apt.price * 0.05) : 0
  const iva = Math.round(reserva * 0.21)
  const total = reserva + iva

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit() {
    if (!apt || !accepted) return
    if (!form.nombre || !form.apellidos || !form.dni || !form.email || !form.telefono) {
      setError('Complete todos los campos obligatorios')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/reservar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apartmentId: apt.id, ...form })
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError(data.error || 'Error al procesar la reserva')
    } catch { setError('Error de conexión') }
    setLoading(false)
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="gold-line-center mb-6" />
          <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Reservar <span className="italic text-[#c9a96e]">apartamento</span>
          </h1>
          <p className="text-[#888]">La señal de reserva es del 5% del precio + IVA. Reserva tu apartamento de forma segura. La señal confirma tu interés y retira el inmueble del mercado.</p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {['Seleccionar', 'Datos personales', 'Confirmar y pagar'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 flex items-center justify-center text-xs ${step > i + 1 ? 'bg-[#c9a96e] text-black' : step === i + 1 ? 'border border-[#c9a96e] text-[#c9a96e]' : 'border border-[#333] text-[#555]'}`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${step === i + 1 ? 'text-[#c9a96e]' : 'text-[#555]'}`}>{s}</span>
              {i < 2 && <div className="w-12 h-px bg-[#333] mx-2" />}
            </div>
          ))}
        </div>

        {/* Step 1: Select apartment */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-light mb-6" style={{ fontFamily: 'Playfair Display' }}>Seleccione su apartamento</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {available.map(a => (
                <button key={a.id} onClick={() => setSelectedId(a.id)}
                  className={`p-5 text-left transition-all ${selectedId === a.id ? 'border-[#c9a96e] bg-[#c9a96e]/5' : 'border-white/10 hover:border-white/20'} border`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Apartamento {a.unit}</p>
                      <p className="text-xs text-[#888] mt-1">Planta {a.floor} · {a.bedrooms} dorm · {a.area}m² · {a.orientation}</p>
                    </div>
                    <p className="text-[#c9a96e] font-light text-lg" style={{ fontFamily: 'Playfair Display' }}>{formatEur(a.price)}</p>
                  </div>
                  {selectedId === a.id && (
                    <div className="mt-3 pt-3 border-t border-[#c9a96e]/20 text-xs text-[#888]">
                      Señal: {formatEur(Math.round(a.price * 0.05))} + IVA = <span className="text-[#c9a96e]">{formatEur(Math.round(a.price * 0.05 * 1.21))}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <button disabled={!selectedId} onClick={() => setStep(2)}
              className={`btn-gold w-full ${!selectedId ? 'opacity-30 cursor-not-allowed' : ''}`}>
              Continuar
            </button>
          </div>
        )}

        {/* Step 2: Personal data */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-light mb-6" style={{ fontFamily: 'Playfair Display' }}>Datos del comprador</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div><label className="text-xs tracking-[0.15em] uppercase text-[#888] block mb-2">Nombre *</label><input className="luxury-input" value={form.nombre} onChange={e => set('nombre', e.target.value)} /></div>
              <div><label className="text-xs tracking-[0.15em] uppercase text-[#888] block mb-2">Apellidos *</label><input className="luxury-input" value={form.apellidos} onChange={e => set('apellidos', e.target.value)} /></div>
              <div><label className="text-xs tracking-[0.15em] uppercase text-[#888] block mb-2">DNI / NIE / Pasaporte *</label><input className="luxury-input" value={form.dni} onChange={e => set('dni', e.target.value)} /></div>
              <div><label className="text-xs tracking-[0.15em] uppercase text-[#888] block mb-2">Email *</label><input type="email" className="luxury-input" value={form.email} onChange={e => set('email', e.target.value)} /></div>
              <div><label className="text-xs tracking-[0.15em] uppercase text-[#888] block mb-2">Teléfono *</label><input type="tel" className="luxury-input" value={form.telefono} onChange={e => set('telefono', e.target.value)} /></div>
              <div><label className="text-xs tracking-[0.15em] uppercase text-[#888] block mb-2">Dirección</label><input className="luxury-input" value={form.direccion} onChange={e => set('direccion', e.target.value)} /></div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="btn-outline flex-1">Atrás</button>
              <button onClick={() => setStep(3)} className="btn-gold flex-1">Continuar</button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm and pay */}
        {step === 3 && apt && (
          <div>
            <h2 className="text-xl font-light mb-6" style={{ fontFamily: 'Playfair Display' }}>Confirmar reserva</h2>

            <div className="p-8 border border-[#c9a96e]/20 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Apartamento seleccionado</p>
                  <p className="text-xl font-light" style={{ fontFamily: 'Playfair Display' }}>Apartamento {apt.unit}</p>
                  <p className="text-sm text-[#888] mt-1">Planta {apt.floor} · {apt.bedrooms} dorm · {apt.area}m²</p>
                  <p className="text-2xl text-[#c9a96e] mt-3" style={{ fontFamily: 'Playfair Display' }}>{formatEur(apt.price)}</p>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Comprador</p>
                  <p className="font-medium">{form.nombre} {form.apellidos}</p>
                  <p className="text-sm text-[#888]">{form.dni}</p>
                  <p className="text-sm text-[#888]">{form.email} · {form.telefono}</p>
                </div>
              </div>

              <div className="border-t border-white/5 mt-6 pt-6 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#888]">Señal de reserva (5% de {formatEur(apt.price)})</span><span>{formatEur(reserva)}</span></div>
                <div className="flex justify-between"><span className="text-[#888]">IVA (21%)</span><span>{formatEur(iva)}</span></div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-semibold">
                  <span>Total a pagar</span><span className="text-[#c9a96e]">{formatEur(total)}</span>
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} className="mt-1 w-4 h-4 accent-[#c9a96e]" />
              <span className="text-sm text-[#888]">
                He leído y acepto las condiciones de reserva. Entiendo que la señal del 5% + IVA confirma la reserva del apartamento y lo retira del mercado durante 30 días. En caso de desistimiento, la señal no será reembolsable. Al pagar, se generará un contrato de reserva vinculante.
              </span>
            </label>

            {error && <div className="p-4 border border-red-500/30 bg-red-500/5 text-red-400 text-sm mb-4">{error}</div>}

            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="btn-outline flex-1">Atrás</button>
              <button onClick={handleSubmit} disabled={loading || !accepted}
                className={`btn-gold flex-1 ${(!accepted || loading) ? 'opacity-30 cursor-not-allowed' : ''}`}>
                {loading ? 'Procesando...' : `Pagar ${formatEur(total)}`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ReservarPage() {
  return <Suspense fallback={<div className="pt-24 text-center text-[#888]">Cargando...</div>}><ReservarContent /></Suspense>
}
