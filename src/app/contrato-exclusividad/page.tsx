'use client'
import { useState, useRef } from 'react'

export default function ContratoExclusividadPage() {
  const [firmado, setFirmado] = useState(false)
  const [firma, setFirma] = useState('')
  const [fechaFirma, setFechaFirma] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [firmaPropietaria, setFirmaPropietaria] = useState('')

  function startDraw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    setDrawing(true)
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const rect = canvas.getBoundingClientRect()
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    if (!drawing) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const rect = canvas.getBoundingClientRect()
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    ctx.strokeStyle = '#c9a96e'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  function endDraw() {
    setDrawing(false)
    if (canvasRef.current) {
      setFirmaPropietaria(canvasRef.current.toDataURL())
    }
  }

  function clearCanvas() {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setFirmaPropietaria('')
  }

  function firmarContrato() {
    if (!firma || !firmaPropietaria) return
    setFechaFirma(new Date().toLocaleString('es-ES'))
    setFirmado(true)
  }

  const hoy = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="gold-line-center mb-6" />
          <h1 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Contrato de <span className="italic text-[#c9a96e]">Exclusividad</span>
          </h1>
          <p className="text-[#888] text-sm">Mandato de comercialización exclusiva</p>
        </div>

        <div className="p-8 md:p-12 border border-[#c9a96e]/20 bg-[#0f0f0f]" id="contrato">
          {/* Header */}
          <div className="text-center mb-10 pb-8 border-b border-white/10">
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-3">Contrato Privado</p>
            <h2 className="text-2xl font-light" style={{ fontFamily: 'Playfair Display' }}>MANDATO DE COMERCIALIZACIÓN EN EXCLUSIVA</h2>
            <p className="text-sm text-[#888] mt-2">De las viviendas sitas en Apartahotel Diamant Blue, Calle Agua nº 5, Plantas 3 y 4, Cabo Roig, Orihuela Costa (Alicante)</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none text-sm text-[#ccc] leading-relaxed space-y-6">
            <p>En Cabo Roig, Orihuela Costa (Alicante), a {hoy}.</p>

            <h3 className="text-[#c9a96e] text-base font-semibold tracking-wider uppercase">REUNIDOS</h3>

            <p><strong>De una parte,</strong> D./Dña. _________________________________ (en adelante, &ldquo;LA PROPIEDAD&rdquo;), mayor de edad, con DNI/NIE n.º _________________, en calidad de propietario/a o representante legal de las viviendas sitas en las Plantas 3 y 4 del edificio conocido como Apartahotel Diamant Blue, ubicado en Calle Agua nº 5, Cabo Roig, Orihuela Costa, Alicante.</p>

            <p><strong>De otra parte,</strong> D. Juan Carlos Martínez López (en adelante, &ldquo;EL AGENTE&rdquo;), mayor de edad, actuando en nombre y representación de <strong>INMOBANCA</strong>, con domicilio profesional en Orihuela Costa, Alicante.</p>

            <p>Ambas partes se reconocen mutuamente capacidad legal suficiente para el otorgamiento del presente contrato y, a tal efecto,</p>

            <h3 className="text-[#c9a96e] text-base font-semibold tracking-wider uppercase">EXPONEN</h3>

            <p><strong>I.</strong> Que LA PROPIEDAD es titular o tiene poder de disposición suficiente sobre 12 (doce) unidades de vivienda distribuidas en las Plantas 3 y 4 del edificio Apartahotel Diamant Blue, sito en Cabo Roig, Orihuela Costa (Alicante).</p>

            <p><strong>II.</strong> Que LA PROPIEDAD desea proceder a la comercialización y venta de dichas unidades residenciales.</p>

            <p><strong>III.</strong> Que EL AGENTE, a través de INMOBANCA, dispone de la infraestructura comercial, experiencia y medios necesarios para llevar a cabo dicha comercialización de forma profesional y eficaz.</p>

            <p><strong>IV.</strong> Que ambas partes, de mutuo acuerdo, desean formalizar un mandato de comercialización en exclusiva conforme a las siguientes,</p>

            <h3 className="text-[#c9a96e] text-base font-semibold tracking-wider uppercase">CLÁUSULAS</h3>

            <p><strong>PRIMERA. — Objeto del contrato.</strong><br />
            LA PROPIEDAD encomienda a INMOBANCA, en régimen de exclusividad, la comercialización y gestión de la venta de las 12 viviendas de las Plantas 3 y 4 del Apartahotel Diamant Blue, Cabo Roig, Orihuela Costa (Alicante), incluyendo toda la labor de captación de compradores, negociación, gestión documental y acompañamiento hasta la firma de la escritura pública de compraventa.</p>

            <p><strong>SEGUNDA. — Precio de venta.</strong><br />
            El precio medio conjunto de las 12 viviendas se fija en <strong>166.000 euros</strong> (ciento sesenta y seis mil euros) por unidad. Los precios individuales podrán variar según superficie, planta y orientación, dentro del rango acordado entre las partes, siempre que el cómputo medio global respete dicha cifra. Los precios orientativos individuales figuran en el Anexo I del presente contrato.</p>

            <p><strong>TERCERA. — Exclusividad.</strong><br />
            El presente mandato se otorga en régimen de <strong>EXCLUSIVIDAD</strong> a favor de INMOBANCA. Durante la vigencia del contrato, LA PROPIEDAD se compromete a no encomendar la venta de las mencionadas viviendas a ninguna otra agencia, intermediario o profesional inmobiliario, ni a realizar la venta directa por sus propios medios sin la intervención de EL AGENTE.</p>

            <p><strong>CUARTA. — Colaboración con terceras agencias.</strong><br />
            No obstante la exclusividad, INMOBANCA queda expresamente autorizada para <strong>establecer acuerdos de colaboración (MLS) con otras agencias e intermediarios inmobiliarios</strong>, a fin de ampliar la red de comercialización y facilitar la captación de compradores. En tales casos, INMOBANCA gestionará las condiciones de colaboración y asumirá la coordinación de las operaciones, siendo siempre el interlocutor único frente a LA PROPIEDAD.</p>

            <p><strong>QUINTA. — Señal de reserva.</strong><br />
            Los compradores interesados abonarán una señal de reserva a través de la plataforma de pago seguro habilitada por INMOBANCA. En caso de desistimiento del comprador, la señal quedará en beneficio de LA PROPIEDAD. La gestión del cobro y la formalización de las reservas se realizará íntegramente por INMOBANCA.</p>

            <p><strong>SEXTA. — Honorarios del agente.</strong><br />
            Los honorarios de INMOBANCA por la comercialización ascienden al <strong>5% (cinco por ciento) del precio de venta de cada vivienda, más el IVA correspondiente (21%)</strong>, a cargo de LA PROPIEDAD. Dichos honorarios se devengarán en el momento de la formalización de cada compraventa en escritura pública y se facturarán por separado.</p>

            <p><strong>SÉPTIMA. — Duración.</strong><br />
            El presente contrato tendrá una duración de <strong>12 (doce) meses</strong> desde la fecha de su firma, prorrogable por períodos iguales salvo denuncia de cualquiera de las partes con un preaviso mínimo de 30 días antes de la finalización del período en curso.</p>

            <p><strong>OCTAVA. — Obligaciones de INMOBANCA.</strong><br />
            EL AGENTE se compromete a: (a) desarrollar las acciones comerciales necesarias para la venta de las viviendas; (b) mantener informada a LA PROPIEDAD del estado de la comercialización; (c) facilitar las visitas a las viviendas con previo acuerdo; (d) actuar con diligencia, buena fe y profesionalidad; (e) habilitar una plataforma web de presentación y reservas para la comercialización.</p>

            <p><strong>NOVENA. — Obligaciones de LA PROPIEDAD.</strong><br />
            LA PROPIEDAD se compromete a: (a) respetar la exclusividad otorgada; (b) facilitar el acceso a las viviendas para visitas; (c) entregar toda la documentación necesaria para la comercialización y la formalización de las ventas; (d) no modificar unilateralmente las condiciones de venta sin acuerdo previo.</p>

            <p><strong>DÉCIMA. — Protección de datos.</strong><br />
            Ambas partes se comprometen al cumplimiento de la normativa vigente en materia de protección de datos (RGPD y LOPDGDD).</p>

            <p><strong>UNDÉCIMA. — Jurisdicción.</strong><br />
            Para cuantas cuestiones pudieran derivarse del presente contrato, ambas partes se someten a la jurisdicción de los Juzgados y Tribunales de Orihuela (Alicante), con renuncia expresa a cualquier otro fuero que pudiera corresponderles.</p>

            <p>Y en prueba de conformidad, ambas partes firman el presente documento, por duplicado y a un solo efecto, en el lugar y fecha indicados en el encabezamiento.</p>
          </div>

          {/* Signatures */}
          <div className="grid md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-white/10">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-4">LA PROPIEDAD</p>
              <p className="text-sm text-[#888] mb-3">Firma del propietario/a:</p>
              {!firmado ? (
                <>
                  <canvas ref={canvasRef} width={360} height={120}
                    className="signature-area w-full rounded"
                    onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
                    onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
                  />
                  <div className="flex gap-2 mt-2">
                    <button onClick={clearCanvas} className="text-xs text-[#888] hover:text-white">Borrar firma</button>
                  </div>
                  <div className="mt-4">
                    <label className="text-xs text-[#888] block mb-1">Nombre completo del firmante:</label>
                    <input className="luxury-input" value={firma} onChange={e => setFirma(e.target.value)} placeholder="D./Dña. ..." />
                  </div>
                </>
              ) : (
                <div className="p-4 border border-green-500/30 bg-green-500/5">
                  {firmaPropietaria && <img src={firmaPropietaria} alt="Firma" className="h-16 mb-2" />}
                  <p className="text-sm text-green-400">Firmado por: {firma}</p>
                  <p className="text-xs text-[#888]">{fechaFirma}</p>
                </div>
              )}
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-4">EL AGENTE — INMOBANCA</p>
              <p className="text-sm text-[#888] mb-3">Firma del agente:</p>
              <div className="p-4 border border-[#c9a96e]/20">
                <p className="text-lg italic text-[#c9a96e]" style={{ fontFamily: 'Playfair Display' }}>Juan Carlos Martínez López</p>
                <p className="text-xs text-[#888] mt-1">En representación de INMOBANCA</p>
                {firmado && <p className="text-xs text-green-400 mt-2">Firmado: {fechaFirma}</p>}
              </div>
            </div>
          </div>

          {/* Sign button */}
          {!firmado && (
            <div className="mt-8 text-center">
              <button onClick={firmarContrato} disabled={!firma || !firmaPropietaria}
                className={`btn-gold ${(!firma || !firmaPropietaria) ? 'opacity-30 cursor-not-allowed' : ''}`}>
                Firmar contrato de exclusividad
              </button>
              <p className="text-xs text-[#888] mt-2">Al firmar, acepta todas las cláusulas del presente contrato.</p>
            </div>
          )}

          {firmado && (
            <div className="mt-8 p-6 border border-green-500/30 bg-green-500/5 text-center">
              <p className="text-green-400 text-lg font-light mb-2" style={{ fontFamily: 'Playfair Display' }}>Contrato firmado correctamente</p>
              <p className="text-sm text-[#888]">Firmado digitalmente el {fechaFirma}</p>
              <p className="text-xs text-[#888] mt-1">Ambas partes recibirán una copia por email.</p>
              <button onClick={() => window.print()} className="btn-outline mt-4 text-xs">Imprimir / Guardar PDF</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
