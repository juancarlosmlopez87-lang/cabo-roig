import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { apartments, formatEur } from '@/lib/apartments'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { apartmentId, nombre, apellidos, dni, email, telefono, direccion } = body

    const apt = apartments.find(a => a.id === apartmentId)
    if (!apt) return NextResponse.json({ error: 'Apartamento no encontrado' }, { status: 404 })
    if (apt.status !== 'available') return NextResponse.json({ error: 'Apartamento no disponible' }, { status: 400 })

    const reserva = Math.round(apt.price * 0.05)
    const iva = Math.round(reserva * 0.21)
    const total = reserva + iva

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Reserva Apartamento ${apt.unit} — Residencial Diamant Blue`,
              description: `Señal de reserva (5%) del Apartamento ${apt.unit}, Planta ${apt.floor}. Precio total: ${formatEur(apt.price)}`,
            },
            unit_amount: reserva * 100, // cents
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'IVA (21%)',
              description: 'Impuesto sobre el Valor Añadido aplicado a la señal de reserva',
            },
            unit_amount: iva * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        apartmentId: apt.id,
        apartmentUnit: apt.unit,
        apartmentPrice: apt.price.toString(),
        reservaAmount: total.toString(),
        nombre,
        apellidos,
        dni,
        email,
        telefono,
        direccion: direccion || '',
      },
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3005'}/pago-exitoso?apt=${apt.id}&nombre=${encodeURIComponent(nombre)}&apellidos=${encodeURIComponent(apellidos)}&dni=${encodeURIComponent(dni)}&email=${encodeURIComponent(email)}&telefono=${encodeURIComponent(telefono)}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3005'}/reservar?apt=${apt.id}&cancelled=1`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: unknown) {
    console.error('Stripe error:', error)
    const message = error instanceof Error ? error.message : 'Error al crear la sesion de pago'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
