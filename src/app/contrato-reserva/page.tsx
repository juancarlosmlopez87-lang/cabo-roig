'use client'
import { useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { apartments, formatEur } from '@/lib/apartments'
import { Suspense } from 'react'

function ContratoReservaContent() {
  const searchParams = useSearchParams()
  const aptId = searchParams.get('apt') || ''
  const [nombre, setNombre] = useState(searchParams.get('nombre') || '')
  const [apellidos, setApellidos] = useState(searchParams.get('apellidos') || '')
  const [dni, setDni] = useState(searchParams.get('dni') || '')

  const apt = apartments.find(a => a.id === aptId)
  const [firmado, setFirmado] = useState(false)
  const [fechaFirma, setFechaFirma] = useState('')
  const [firmaComprador, setFirmaComprador] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)

  const reserva = apt ? Math.round(apt.price * 0.05) : 0
  const iva = Math.round(reserva * 0.21)
  const total = reserva + iva
  const hoy = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })

  function startDraw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    setDrawing(true)
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const rect = canvas.getBoundingClientRect()
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    ctx.beginPath(); ctx.moveTo(x, y)
  }
  function draw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    if (!drawing) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const rect = canvas.getBoundingClientRect()
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    ctx.strokeStyle = '#c9a96e'; ctx.lineWidth = 2; ctx.lineCap = 'round'
    ctx.lineTo(x, y); ctx.stroke()
  }
  function endDraw() {
    setDrawing(false)
    if (canvasRef.current) setFirmaComprador(canvasRef.current.toDataURL())
  }
  function clearCanvas() {
    const canvas = canvasRef.current!
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)
    setFirmaComprador('')
  }
  function firmar() {
    if (!firmaComprador || !nombre.trim() || !dni.trim()) return
    setFechaFirma(new Date().toLocaleString('es-ES'))
    setFirmado(true)
  }

  if (!apt) return <div className="pt-24 text-center text-[#888] min-h-screen"><p>Apartamento no encontrado</p></div>

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="gold-line-center mb-6" />
          <h1 className="text-3xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Contrato de <span className="italic text-[#c9a96e]">Reserva</span>
          </h1>
          <p className="text-[#888] text-sm">Apartamento {apt.unit} — Residencial Diamant Blue Cabo Roig</p>
        </div>

        <div className="p-8 md:p-12 border border-[#c9a96e]/20 bg-[#0f0f0f]" id="contrato-reserva">
          <div className="text-center mb-10 pb-8 border-b border-white/10">
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-3">Documento Privado</p>
            <h2 className="text-2xl font-light" style={{ fontFamily: 'Playfair Display' }}>CONTRATO DE RESERVA DE VIVIENDA</h2>
          </div>

          <div className="prose prose-invert max-w-none text-sm text-[#ccc] leading-relaxed space-y-5">
            <p>En Cabo Roig, Orihuela Costa (Alicante), a {hoy}.</p>

            <h3 className="text-[#c9a96e] text-base font-semibold tracking-wider uppercase">REUNIDOS</h3>

            <p><strong>De una parte,</strong> INMOBANCA, representada por D. Juan Carlos Martínez López, en virtud del mandato de comercialización en exclusiva otorgado por la propiedad del edificio Apartahotel Diamant Blue (en adelante, &ldquo;LA PARTE VENDEDORA&rdquo;).</p>

            <div className="p-4 border border-[#c9a96e]/20 bg-[#1a1a1a] my-4">
              <p className="mb-3"><strong>De otra parte,</strong></p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] block mb-1">Nombre / Name</label>
                  <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} disabled={firmado}
                    className="w-full bg-transparent border-b border-[#c9a96e]/40 text-white py-1 px-0 text-sm focus:outline-none focus:border-[#c9a96e] placeholder:text-[#555]"
                    placeholder="Nombre completo..." />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] block mb-1">Apellidos / Surname</label>
                  <input type="text" value={apellidos} onChange={e => setApellidos(e.target.value)} disabled={firmado}
                    className="w-full bg-transparent border-b border-[#c9a96e]/40 text-white py-1 px-0 text-sm focus:outline-none focus:border-[#c9a96e] placeholder:text-[#555]"
                    placeholder="Apellidos..." />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] block mb-1">DNI / NIE / Passport</label>
                  <input type="text" value={dni} onChange={e => setDni(e.target.value)} disabled={firmado}
                    className="w-full bg-transparent border-b border-[#c9a96e]/40 text-white py-1 px-0 text-sm focus:outline-none focus:border-[#c9a96e] placeholder:text-[#555]"
                    placeholder="Número de documento..." />
                </div>
              </div>
              <p className="mt-3 text-[#ccc]">(en adelante, &ldquo;EL/LA RESERVANTE&rdquo;).</p>
            </div>

            <h3 className="text-[#c9a96e] text-base font-semibold tracking-wider uppercase">CLÁUSULAS</h3>

            <p><strong>PRIMERA. — Objeto.</strong><br />
            EL/LA RESERVANTE manifiesta su interés firme en la adquisición del <strong>Apartamento {apt.unit}</strong>, situado en la Planta {apt.floor} del edificio Apartahotel Diamant Blue, sito en Calle Agua nº 5, Cabo Roig, Orihuela Costa (Alicante), con una superficie aproximada de {apt.area} m² útiles y terraza de {apt.terrace} m².</p>

            <p><strong>SEGUNDA. — Precio de venta.</strong><br />
            El precio pactado para la compraventa de la vivienda descrita asciende a <strong>{formatEur(apt.price)}</strong> ({numberToWords(apt.price)} euros).</p>

            <p><strong>TERCERA. — Señal de reserva.</strong><br />
            En concepto de señal de reserva, EL/LA RESERVANTE abona en este acto la cantidad de <strong>{formatEur(reserva)}</strong> (cinco por ciento del precio), más IVA al 21% ({formatEur(iva)}), lo que suma un total de <strong>{formatEur(total)}</strong>.<br /><br />
            Dicha cantidad se abona mediante pago electrónico seguro a través de la plataforma de INMOBANCA en concepto de señal de reserva. Este importe será <strong>descontado íntegramente del precio final</strong> de la vivienda en el momento de la firma de la escritura pública de compraventa.</p>

            <p><strong>CUARTA. — Efectos de la reserva.</strong><br />
            El pago de la señal implica la retirada del inmueble del mercado durante un plazo máximo de <strong>30 días naturales</strong>, período en el cual deberá formalizarse el contrato de arras o la escritura pública de compraventa.<br /><br />
            Transcurrido dicho plazo sin haberse formalizado, la reserva quedará sin efecto y la señal se perderá en concepto de indemnización a favor de la propiedad.</p>

            <p><strong>QUINTA. — Desistimiento.</strong><br />
            Si EL/LA RESERVANTE desiste de la compra, <strong>perderá la señal entregada</strong>. Si LA PARTE VENDEDORA desiste, deberá devolver el doble de la cantidad recibida.</p>

            <p><strong>SEXTA. — Gastos.</strong><br />
            Los gastos de escritura, registro, notaría, y tributos derivados de la compraventa serán a cargo de cada parte según la legislación vigente.</p>

            <p><strong>SÉPTIMA. — Jurisdicción.</strong><br />
            Para cuantas controversias pudieran surgir, ambas partes se someten a los Juzgados y Tribunales de Orihuela (Alicante).</p>

            <p>Y en prueba de conformidad, ambas partes firman el presente documento en el lugar y fecha indicados.</p>
          </div>

          {/* Signatures */}
          <div className="grid md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-white/10">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-4">EL/LA RESERVANTE</p>
              {!firmado ? (
                <>
                  <p className="text-sm text-[#888] mb-2">Firme aquí:</p>
                  <canvas ref={canvasRef} width={360} height={120}
                    className="signature-area w-full rounded"
                    onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
                    onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
                  />
                  <button onClick={clearCanvas} className="text-xs text-[#888] hover:text-white mt-2">Borrar firma</button>
                </>
              ) : (
                <div className="p-4 border border-green-500/30 bg-green-500/5">
                  {firmaComprador && <img src={firmaComprador} alt="Firma" className="h-16 mb-2" />}
                  <p className="text-sm text-green-400">Firmado por: {nombre} {apellidos}</p>
                  <p className="text-xs text-[#888]">{fechaFirma}</p>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-4">INMOBANCA</p>
              <div className="p-4 border border-[#c9a96e]/20">
                <p className="text-lg italic text-[#c9a96e]" style={{ fontFamily: 'Playfair Display' }}>Juan Carlos Martínez López</p>
                <p className="text-xs text-[#888] mt-1">En representación de INMOBANCA</p>
                {firmado && <p className="text-xs text-green-400 mt-2">Firmado: {fechaFirma}</p>}
              </div>
            </div>
          </div>

          {!firmado && (
            <div className="mt-8 text-center">
              <button onClick={firmar} disabled={!firmaComprador || !nombre.trim() || !dni.trim()}
                className={`btn-gold ${(!firmaComprador || !nombre.trim() || !dni.trim()) ? 'opacity-30 cursor-not-allowed' : ''}`}>
                Firmar contrato de reserva
              </button>
            </div>
          )}

          {firmado && (
            <div className="mt-8 p-6 border border-green-500/30 bg-green-500/5 text-center">
              <p className="text-green-400 text-lg font-light mb-2" style={{ fontFamily: 'Playfair Display' }}>Contrato de reserva firmado</p>
              <p className="text-sm text-[#888]">Firmado digitalmente el {fechaFirma}</p>
              <button onClick={() => window.print()} className="btn-outline mt-4 text-xs">Imprimir / Guardar PDF</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function numberToWords(n: number): string {
  const units = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve']
  const teens = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve']
  const tens = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa']
  const hundreds = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos']
  if (n === 0) return 'cero'
  const thousands = Math.floor(n / 1000)
  const remainder = n % 1000
  const h = Math.floor(remainder / 100)
  const t = Math.floor((remainder % 100) / 10)
  const u = remainder % 10
  let result = ''
  if (thousands > 0) {
    if (thousands === 1) result += 'mil '
    else result += units[thousands] + ' mil '
  }
  if (h > 0) { if (remainder === 100) result += 'cien '; else result += hundreds[h] + ' ' }
  if (t === 1) result += teens[u] + ' '
  else if (t === 2 && u > 0) result += 'veinti' + units[u] + ' '
  else {
    if (t > 0) result += tens[t] + ' '
    if (u > 0 && t !== 1) result += (t > 2 ? 'y ' : '') + units[u] + ' '
  }
  return result.trim()
}

export default function ContratoReservaPage() {
  return <Suspense fallback={<div className="pt-24 text-center text-[#888] min-h-screen">Cargando...</div>}><ContratoReservaContent /></Suspense>
}
