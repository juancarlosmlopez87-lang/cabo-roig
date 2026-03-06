import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for contracts (in production, use a database)
const contratos: Record<string, {
  tipo: string
  apartamento?: string
  firmante: string
  firma: string
  fechaFirma: string
  datos: Record<string, string>
}> = {}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { tipo, apartamento, firmante, firma, datos } = body

    if (!tipo || !firmante || !firma) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 })
    }

    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
    contratos[id] = {
      tipo,
      apartamento,
      firmante,
      firma,
      fechaFirma: new Date().toISOString(),
      datos: datos || {},
    }

    console.log(`[CONTRATO FIRMADO] ${tipo} — ${firmante} — ${new Date().toLocaleString('es-ES')}`)

    return NextResponse.json({ id, message: 'Contrato registrado correctamente' })
  } catch {
    return NextResponse.json({ error: 'Error al registrar el contrato' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ contratos: Object.entries(contratos).map(([id, c]) => ({ id, ...c })) })
}
