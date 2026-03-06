import { NextRequest, NextResponse } from 'next/server'
import { apartments, formatEur } from '@/lib/apartments'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const aptId = searchParams.get('apt') || ''
  const nombre = searchParams.get('nombre') || ''
  const apellidos = searchParams.get('apellidos') || ''
  const dni = searchParams.get('dni') || ''
  const email = searchParams.get('email') || ''
  const fecha = searchParams.get('fecha') || new Date().toLocaleDateString('es-ES')

  const apt = apartments.find(a => a.id === aptId)
  if (!apt) return NextResponse.json({ error: 'Apartamento no encontrado' }, { status: 404 })

  const reserva = Math.round(apt.price * 0.05)
  const iva = Math.round(reserva * 0.21)
  const total = reserva + iva
  const numFactura = `INM-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Factura ${numFactura} - INMOBANCA</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #222; background: #fff; padding: 40px; max-width: 800px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #c9a96e; }
    .logo { font-size: 28px; font-weight: 300; letter-spacing: 0.1em; }
    .logo span { color: #c9a96e; }
    .empresa { text-align: right; font-size: 12px; color: #666; line-height: 1.6; }
    .factura-num { font-size: 14px; color: #c9a96e; font-weight: 600; margin-bottom: 30px; letter-spacing: 0.1em; }
    .datos-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px; }
    .datos-box h3 { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #c9a96e; margin-bottom: 8px; }
    .datos-box p { font-size: 13px; line-height: 1.5; color: #444; }
    table { width: 100%; border-collapse: collapse; margin: 30px 0; }
    th { background: #1a1a1a; color: #c9a96e; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; padding: 12px 15px; text-align: left; }
    th:last-child { text-align: right; }
    td { padding: 12px 15px; font-size: 13px; border-bottom: 1px solid #eee; }
    td:last-child { text-align: right; font-weight: 500; }
    .totals { margin-left: auto; width: 280px; }
    .totals .row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; }
    .totals .row.total { border-top: 2px solid #c9a96e; margin-top: 8px; padding-top: 12px; font-size: 18px; font-weight: 600; }
    .totals .row.total span:last-child { color: #c9a96e; }
    .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #888; text-align: center; line-height: 1.6; }
    .concepto { font-size: 11px; color: #888; margin-top: 4px; }
    .legal { margin-top: 30px; padding: 15px; background: #f9f7f2; font-size: 11px; color: #666; line-height: 1.5; }
    @media print { body { padding: 20px; } .no-print { display: none; } }
    .btn-print { display: block; margin: 30px auto 0; padding: 12px 30px; background: #c9a96e; color: #fff; border: none; font-size: 14px; cursor: pointer; letter-spacing: 0.1em; text-transform: uppercase; }
    .btn-print:hover { background: #b8944f; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">INMO<span>BANCA</span></div>
      <p style="font-size:11px;color:#888;margin-top:4px;">Gestion Inmobiliaria</p>
    </div>
    <div class="empresa">
      <strong>INMOBANCA</strong><br>
      Juan Carlos Martinez Lopez<br>
      Orihuela Costa, Alicante<br>
      Tel: +34 620 300 647<br>
      inmobancamurcia@gmail.com
    </div>
  </div>

  <div class="factura-num">FACTURA N.º ${numFactura}</div>
  <p style="font-size:13px;color:#666;margin-bottom:20px;">Fecha: ${fecha}</p>

  <div class="datos-grid">
    <div class="datos-box">
      <h3>Datos del cliente</h3>
      <p><strong>${nombre} ${apellidos}</strong><br>
      DNI/NIE: ${dni}<br>
      ${email}</p>
    </div>
    <div class="datos-box">
      <h3>Inmueble</h3>
      <p>Apartamento ${apt.unit}<br>
      Planta ${apt.floor} - ${apt.area} m² - ${apt.orientation}<br>
      Apartahotel Diamant Blue<br>
      C/ Agua 5, Cabo Roig, Orihuela Costa</p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Concepto</th>
        <th>Importe</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <strong>Comision de gestion inmobiliaria</strong>
          <div class="concepto">Reserva de vivienda - Apartamento ${apt.unit}, Residencial Diamant Blue, Cabo Roig</div>
          <div class="concepto">Senal de reserva (5% sobre ${formatEur(apt.price)})</div>
        </td>
        <td>${formatEur(reserva)}</td>
      </tr>
      <tr>
        <td>IVA (21%)</td>
        <td>${formatEur(iva)}</td>
      </tr>
    </tbody>
  </table>

  <div class="totals">
    <div class="row"><span>Base imponible</span><span>${formatEur(reserva)}</span></div>
    <div class="row"><span>IVA 21%</span><span>${formatEur(iva)}</span></div>
    <div class="row total"><span>TOTAL</span><span>${formatEur(total)}</span></div>
  </div>

  <div class="legal">
    <strong>Forma de pago:</strong> Pago electronico seguro (tarjeta de credito/debito) via plataforma Stripe.<br>
    <strong>Concepto:</strong> Comision de gestion inmobiliaria por reserva de vivienda. Este importe confirma la reserva del inmueble y su retirada del mercado.<br>
    <strong>Nota:</strong> En caso de desistimiento del comprador, el importe abonado no sera reembolsable.
  </div>

  <div class="footer">
    INMOBANCA &mdash; Gestion Inmobiliaria<br>
    Juan Carlos Martinez Lopez &middot; +34 620 300 647 &middot; inmobancamurcia@gmail.com<br>
    Cabo Roig, Orihuela Costa, Alicante
  </div>

  <button class="btn-print no-print" onclick="window.print()">Descargar / Imprimir Factura</button>
</body>
</html>`

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
