'use client'
import { useState, useRef } from 'react'

export default function ContratoExclusividadPage() {
  const [firmado, setFirmado] = useState(false)
  const [firma, setFirma] = useState('')
  const [fechaFirma, setFechaFirma] = useState('')
  const [contratoId, setContratoId] = useState('')
  const [enviando, setEnviando] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [firmaPropietaria, setFirmaPropietaria] = useState('')
  const [nombreProp, setNombreProp] = useState('')
  const [dniProp, setDniProp] = useState('')

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

  async function firmarContrato() {
    if (!firma || !firmaPropietaria || !nombreProp || !dniProp) return
    setEnviando(true)

    const ahora = new Date().toLocaleString('es-ES')
    setFechaFirma(ahora)

    try {
      const res = await fetch('/api/contrato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'exclusividad',
          firmante: firma,
          firma: firmaPropietaria,
          datos: {
            fechaFirma: ahora,
            nombrePropietaria: nombreProp,
            dniPropietaria: dniProp,
            propiedad: 'Apartahotel Diamant Blue, Plantas 3 y 4, Cabo Roig',
            tipoContrato: 'Mandato de comercializacion en exclusiva',
          },
        }),
      })

      const data = await res.json()
      if (data.id) {
        setContratoId(data.id)
      }
    } catch (err) {
      console.error('Error registrando contrato:', err)
    }

    setFirmado(true)
    setEnviando(false)

    // Send WhatsApp notification to Juan Carlos
    const msgJC = encodeURIComponent(
      `CONTRATO EXCLUSIVIDAD FIRMADO\nPropietaria: ${nombreProp}\nDNI: ${dniProp}\nFirmante: ${firma}\nFecha: ${ahora}\nPropiedad: Apartahotel Diamant Blue, Plantas 3 y 4`
    )
    try {
      window.open(`https://wa.me/34620300647?text=${msgJC}`, '_blank')
    } catch {
      // silent
    }
  }

  function descargarPDF() {
    window.print()
  }

  function enviarWhatsApp() {
    const msg = encodeURIComponent(
      `Contrato de exclusividad firmado por ${firma}. Fecha: ${fechaFirma}. Propiedad: Apartahotel Diamant Blue, Cabo Roig.`
    )
    window.open(`https://wa.me/34620300647?text=${msg}`, '_blank')
  }

  function enviarEmail() {
    const subject = encodeURIComponent(`Contrato de exclusividad firmado - ${firma}`)
    const body = encodeURIComponent(
      `Contrato de exclusividad firmado.\n\nFirmante: ${firma}\nFecha: ${fechaFirma}\nPropiedad: Apartahotel Diamant Blue, Plantas 3 y 4, Cabo Roig, Orihuela Costa (Alicante)\nID Contrato: ${contratoId}\n\nSe adjunta copia del contrato.`
    )
    window.open(`mailto:inmobancamurcia@gmail.com?subject=${subject}&body=${body}`, '_blank')
  }

  const hoy = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 print:mb-6">
          <div className="gold-line-center mb-6 print:hidden" />
          <h1 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Contrato de <span className="italic text-[#c9a96e]">Exclusividad</span>
          </h1>
          <p className="text-[#888] text-sm">Mandato de comercializacion exclusiva</p>
        </div>

        {/* Download button at top */}
        <div className="text-right mb-4 print:hidden">
          <button onClick={descargarPDF} className="btn-outline text-xs">
            Descargar contrato (PDF)
          </button>
        </div>

        <div className="p-8 md:p-12 border border-[#c9a96e]/20 bg-[#0f0f0f] print:border-black print:bg-white print:text-black" id="contrato">
          {/* Header */}
          <div className="text-center mb-10 pb-8 border-b border-white/10 print:border-black/20">
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-3 print:text-black">Contrato Privado</p>
            <h2 className="text-2xl font-light" style={{ fontFamily: 'Playfair Display' }}>MANDATO DE COMERCIALIZACION EN EXCLUSIVA</h2>
            <p className="text-sm text-[#888] mt-2 print:text-black/70">De las viviendas sitas en Apartahotel Diamant Blue, Calle Agua n 5, Plantas 3 y 4, Cabo Roig, Orihuela Costa (Alicante)</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none text-sm text-[#ccc] leading-relaxed space-y-6 print:prose-neutral print:text-black">
            <p>En Cabo Roig, Orihuela Costa (Alicante), a {hoy}.</p>

            <h3 className="text-[#c9a96e] text-base font-semibold tracking-wider uppercase print:text-black">REUNIDOS</h3>

            <div className="p-4 border border-[#c9a96e]/20 bg-[#c9a96e]/5 mb-4 print:bg-transparent print:border-black/20">
              <p className="text-xs tracking-[0.15em] uppercase text-[#c9a96e] mb-3 print:text-black">Datos de la propiedad (rellene antes de firmar):</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#888] block mb-1">Nombre completo</label>
                  <input className="luxury-input text-sm" value={nombreProp} onChange={e => setNombreProp(e.target.value)} placeholder="D./Dna. nombre y apellidos" disabled={firmado} />
                </div>
                <div>
                  <label className="text-xs text-[#888] block mb-1">DNI / NIE / Pasaporte</label>
                  <input className="luxury-input text-sm" value={dniProp} onChange={e => setDniProp(e.target.value)} placeholder="Numero de identificacion" disabled={firmado} />
                </div>
              </div>
            </div>
            <p><strong>De una parte,</strong> D./Dna. <strong className="text-[#c9a96e] print:text-black">{nombreProp || '________________'}</strong> (en adelante, &ldquo;LA PROPIEDAD&rdquo;), mayor de edad, con DNI/NIE n. <strong className="text-[#c9a96e] print:text-black">{dniProp || '________________'}</strong>, en calidad de propietario/a o representante legal de las viviendas sitas en las Plantas 3 y 4 del edificio conocido como Apartahotel Diamant Blue, ubicado en Calle Agua n 5, Cabo Roig, Orihuela Costa, Alicante.</p>

            <p><strong>De otra parte,</strong> D. Juan Carlos Martinez Lopez (en adelante, &ldquo;EL AGENTE&rdquo;), mayor de edad, actuando en nombre y representacion de <strong>INMOBANCA</strong>, con domicilio profesional en Orihuela Costa, Alicante.</p>

            <p>Ambas partes se reconocen mutuamente capacidad legal suficiente para el otorgamiento del presente contrato y, a tal efecto,</p>

            <h3 className="text-[#c9a96e] text-base font-semibold tracking-wider uppercase print:text-black">EXPONEN</h3>

            <p><strong>I.</strong> Que LA PROPIEDAD es titular o tiene poder de disposicion suficiente sobre 12 (doce) unidades de vivienda distribuidas en las Plantas 3 y 4 del edificio Apartahotel Diamant Blue, sito en Cabo Roig, Orihuela Costa (Alicante).</p>

            <p><strong>II.</strong> Que LA PROPIEDAD desea proceder a la comercializacion y venta de dichas unidades residenciales.</p>

            <p><strong>III.</strong> Que EL AGENTE, a traves de INMOBANCA, dispone de la infraestructura comercial, experiencia y medios necesarios para llevar a cabo dicha comercializacion de forma profesional y eficaz.</p>

            <p><strong>IV.</strong> Que ambas partes, de mutuo acuerdo, desean formalizar un mandato de comercializacion en exclusiva conforme a las siguientes,</p>

            <h3 className="text-[#c9a96e] text-base font-semibold tracking-wider uppercase print:text-black">CLAUSULAS</h3>

            <p><strong>PRIMERA. -- Objeto del contrato.</strong><br />
            LA PROPIEDAD encomienda a INMOBANCA, en regimen de exclusividad, la comercializacion y gestion de la venta de las 12 viviendas de las Plantas 3 y 4 del Apartahotel Diamant Blue, Cabo Roig, Orihuela Costa (Alicante), incluyendo toda la labor de captacion de compradores, negociacion, gestion documental y acompanamiento hasta la firma de la escritura publica de compraventa.</p>

            <p><strong>SEGUNDA. -- Precio de venta.</strong><br />
            El precio medio conjunto de las 12 viviendas se fija en <strong>166.000 euros</strong> (ciento sesenta y seis mil euros) por unidad. Los precios individuales podran variar segun superficie, planta y orientacion, dentro del rango acordado entre las partes, siempre que el computo medio global respete dicha cifra. Los precios orientativos individuales figuran en el Anexo I del presente contrato.</p>

            <p><strong>TERCERA. -- Exclusividad.</strong><br />
            El presente mandato se otorga en regimen de <strong>EXCLUSIVIDAD</strong> a favor de INMOBANCA. Durante la vigencia del contrato, LA PROPIEDAD se compromete a no encomendar la venta de las mencionadas viviendas a ninguna otra agencia, intermediario o profesional inmobiliario, ni a realizar la venta directa por sus propios medios sin la intervencion de EL AGENTE.</p>

            <p><strong>CUARTA. -- Colaboracion con terceras agencias.</strong><br />
            No obstante la exclusividad, INMOBANCA queda expresamente autorizada para <strong>establecer acuerdos de colaboracion (MLS) con otras agencias e intermediarios inmobiliarios</strong>, a fin de ampliar la red de comercializacion y facilitar la captacion de compradores. En tales casos, INMOBANCA gestionara las condiciones de colaboracion y asumira la coordinacion de las operaciones, siendo siempre el interlocutor unico frente a LA PROPIEDAD. <strong>En caso de que un comprador sea captado a traves de una agencia colaboradora, los honorarios de INMOBANCA establecidos en la Clausula Sexta se mantendran integramente a cargo de LA PROPIEDAD.</strong> La distribucion de comisiones o compensaciones con terceras agencias colaboradoras sera decidida y gestionada exclusivamente por INMOBANCA, con cargo a sus propios honorarios, sin que ello suponga coste adicional alguno para LA PROPIEDAD ni modificacion de las condiciones economicas del presente contrato.</p>

            <p><strong>QUINTA. -- Senal de reserva y gestion de pagos.</strong><br />
            Los compradores interesados abonaran una senal de reserva equivalente al <strong>5% del precio de venta del inmueble, mas el 21% de IVA correspondiente</strong>, a traves de la plataforma de pago seguro habilitada por INMOBANCA. <strong>Dicha senal de reserva sera recibida y retenida integramente por INMOBANCA en concepto de honorarios por la comercializacion, constituyendo el pago de la comision del agente.</strong> LA PROPIEDAD no recibira directamente cantidad alguna de los compradores en concepto de senal o reserva. INMOBANCA se compromete a <strong>notificar a LA PROPIEDAD de forma inmediata</strong> cada vez que se formalice una reserva, indicando la identidad del comprador, el apartamento reservado y la fecha de la operacion, a fin de que LA PROPIEDAD retire dicho inmueble de cualquier otro canal de venta. En caso de desistimiento del comprador, la senal quedara en beneficio de INMOBANCA. <strong>Toda gestion de cobros, pagos y transacciones con los compradores sera realizada exclusivamente por INMOBANCA</strong>, actuando como unico receptor de los pagos de los clientes.</p>

            <p><strong>SEXTA. -- Honorarios del agente.</strong><br />
            Los honorarios de INMOBANCA por la comercializacion ascienden al <strong>5% (cinco por ciento) del precio de venta de cada vivienda, mas el IVA correspondiente (21%)</strong>. Dichos honorarios se aplicaran <strong>a todas las ventas realizadas durante la vigencia del contrato, independientemente de la procedencia del comprador</strong>, ya sea captado directamente por INMOBANCA, a traves de agencias colaboradoras, por medios digitales, o por cualquier otro canal. Los honorarios se materializaran mediante la retencion de la senal de reserva abonada por el comprador, conforme a lo establecido en la Clausula Quinta. <strong>INMOBANCA es el unico interlocutor autorizado para recibir pagos de los compradores</strong> en nombre de la operacion de compraventa. En caso de que la senal de reserva no cubra la totalidad de los honorarios, la diferencia sera facturada a LA PROPIEDAD y abonada en el momento de la formalizacion de la escritura publica de compraventa.</p>

            <p><strong>SEPTIMA. -- Duracion.</strong><br />
            El presente contrato tendra una duracion de <strong>12 (doce) meses</strong> desde la fecha de su firma, prorrogable por periodos iguales salvo denuncia de cualquiera de las partes con un preaviso minimo de 30 dias antes de la finalizacion del periodo en curso.</p>

            <p><strong>OCTAVA. -- Obligaciones de INMOBANCA.</strong><br />
            EL AGENTE se compromete a: (a) desarrollar las acciones comerciales necesarias para la venta de las viviendas; (b) mantener informada a LA PROPIEDAD del estado de la comercializacion; (c) facilitar las visitas a las viviendas con previo acuerdo; (d) actuar con diligencia, buena fe y profesionalidad; (e) habilitar una plataforma web de presentacion y reservas para la comercializacion; (f) <strong>notificar de forma inmediata a LA PROPIEDAD cada reserva formalizada</strong>, incluyendo datos del comprador, apartamento reservado y condiciones de la operacion.</p>

            <p><strong>NOVENA. -- Obligaciones de LA PROPIEDAD.</strong><br />
            LA PROPIEDAD se compromete a: (a) respetar la exclusividad otorgada; (b) facilitar el acceso a las viviendas para visitas; (c) entregar toda la documentacion necesaria para la comercializacion y la formalizacion de las ventas; (d) no modificar unilateralmente las condiciones de venta sin acuerdo previo; (e) <strong>no recibir pagos directos de compradores ni intermediarios</strong>, derivando cualquier gestion economica a INMOBANCA; (f) <strong>retirar de venta inmediatamente cualquier apartamento reservado</strong> tras la notificacion de INMOBANCA.</p>

            <p><strong>DECIMA. -- Poder de representacion y forma de pago.</strong><br />
            LA PROPIEDAD se compromete a otorgar a favor de EL AGENTE, o de la persona que este designe, un <strong>poder notarial de representacion</strong> suficiente para actuar en su nombre en la formalizacion de las escrituras publicas de compraventa de las viviendas objeto de este contrato. Dicho poder permitira a EL AGENTE firmar las escrituras en representacion de LA PROPIEDAD, evitando asi desplazamientos innecesarios. El importe correspondiente a LA PROPIEDAD por la venta de cada vivienda (precio de venta menos los honorarios de INMOBANCA) sera <strong>transferido directamente a la cuenta bancaria designada por LA PROPIEDAD</strong>, en el plazo maximo de 5 dias habiles desde la firma de la escritura publica. LA PROPIEDAD facilitara los datos bancarios necesarios a tal efecto.</p>

            <p><strong>UNDECIMA. -- Proteccion de datos.</strong><br />
            Ambas partes se comprometen al cumplimiento de la normativa vigente en materia de proteccion de datos (RGPD y LOPDGDD).</p>

            <p><strong>DUODECIMA. -- Jurisdiccion.</strong><br />
            Para cuantas cuestiones pudieran derivarse del presente contrato, ambas partes se someten a la jurisdiccion de los Juzgados y Tribunales de Orihuela (Alicante), con renuncia expresa a cualquier otro fuero que pudiera corresponderles.</p>

            <p>Y en prueba de conformidad, ambas partes firman el presente documento, por duplicado y a un solo efecto, en el lugar y fecha indicados en el encabezamiento.</p>
          </div>

          {/* Signatures */}
          <div className="grid md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-white/10 print:border-black/20">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-4 print:text-black">LA PROPIEDAD</p>
              <p className="text-sm text-[#888] mb-3 print:text-black/70">Firma del propietario/a:</p>
              {!firmado ? (
                <>
                  <canvas ref={canvasRef} width={360} height={120}
                    className="signature-area w-full rounded"
                    onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
                    onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
                  />
                  <div className="flex gap-2 mt-2">
                    <button onClick={clearCanvas} className="text-xs text-[#888] hover:text-white print:hidden">Borrar firma</button>
                  </div>
                  <div className="mt-4">
                    <label className="text-xs text-[#888] block mb-1">Nombre completo del firmante:</label>
                    <input className="luxury-input" value={firma} onChange={e => setFirma(e.target.value)} placeholder="D./Dna. ..." />
                  </div>
                </>
              ) : (
                <div className="p-4 border border-green-500/30 bg-green-500/5 print:border-black print:bg-white">
                  {firmaPropietaria && <img src={firmaPropietaria} alt="Firma" className="h-16 mb-2" />}
                  <p className="text-sm text-green-400 print:text-black">Firmado por: {firma}</p>
                  <p className="text-xs text-[#888] print:text-black/70">{fechaFirma}</p>
                </div>
              )}
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-4 print:text-black">EL AGENTE -- INMOBANCA</p>
              <p className="text-sm text-[#888] mb-3 print:text-black/70">Firma del agente:</p>
              <div className="p-4 border border-[#c9a96e]/20 print:border-black">
                <p className="text-lg italic text-[#c9a96e] print:text-black" style={{ fontFamily: 'Playfair Display' }}>Juan Carlos Martinez Lopez</p>
                <p className="text-xs text-[#888] mt-1 print:text-black/70">En representacion de INMOBANCA</p>
                {firmado && <p className="text-xs text-green-400 mt-2 print:text-black">Firmado: {fechaFirma}</p>}
              </div>
            </div>
          </div>

          {/* Sign button */}
          {!firmado && (
            <div className="mt-8 text-center print:hidden">
              <button onClick={firmarContrato} disabled={!firma || !firmaPropietaria || !nombreProp || !dniProp || enviando}
                className={`btn-gold ${(!firma || !firmaPropietaria || !nombreProp || !dniProp || enviando) ? 'opacity-30 cursor-not-allowed' : ''}`}>
                {enviando ? 'Firmando...' : 'Firmar contrato de exclusividad'}
              </button>
              <p className="text-xs text-[#888] mt-2">Al firmar, acepta todas las clausulas del presente contrato.</p>
            </div>
          )}

          {firmado && (
            <div className="mt-8 p-6 border border-green-500/30 bg-green-500/5 text-center print:border-black print:bg-white">
              <p className="text-green-400 text-lg font-light mb-2 print:text-black" style={{ fontFamily: 'Playfair Display' }}>Contrato firmado correctamente</p>
              <p className="text-sm text-[#888] print:text-black/70">Firmado digitalmente el {fechaFirma}</p>
              {contratoId && <p className="text-xs text-[#888] mt-1 print:text-black/70">ID de contrato: {contratoId}</p>}

              <div className="flex flex-wrap justify-center gap-3 mt-6 print:hidden">
                <button onClick={descargarPDF} className="btn-gold text-xs px-6 py-3">
                  Descargar PDF
                </button>
                <button onClick={enviarWhatsApp} className="btn-outline text-xs px-6 py-3 border-green-500/50 text-green-400 hover:bg-green-500/10">
                  Enviar por WhatsApp
                </button>
                <button onClick={enviarEmail} className="btn-outline text-xs px-6 py-3">
                  Enviar por Email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
