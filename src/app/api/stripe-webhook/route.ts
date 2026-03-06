import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// In-memory reservation store (for serverless, use DB in production)
// This persists between requests in the same cold start
const reservations = new Map<string, { nombre: string; apellidos: string; dni: string; email: string; telefono: string; fecha: string }>()

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const meta = session.metadata || {}

      // Store the reservation
      if (meta.apartmentId) {
        reservations.set(meta.apartmentId, {
          nombre: meta.nombre || '',
          apellidos: meta.apellidos || '',
          dni: meta.dni || '',
          email: meta.email || '',
          telefono: meta.telefono || '',
          fecha: new Date().toISOString(),
        })
      }

      console.log(`[RESERVA COMPLETADA] Apt ${meta.apartmentUnit} — ${meta.nombre} ${meta.apellidos} — ${meta.reservaAmount}EUR`)
      console.log(`  DNI: ${meta.dni}, Email: ${meta.email}, Tel: ${meta.telefono}`)
      console.log(`  WhatsApp: https://wa.me/34620300647?text=${encodeURIComponent(`RESERVA COMPLETADA! Apt ${meta.apartmentUnit} reservado por ${meta.nombre} ${meta.apellidos} (${meta.dni}). Tel: ${meta.telefono}. Email: ${meta.email}. Importe: ${meta.reservaAmount}EUR`)}`)

      break
    }
    case 'payment_intent.payment_failed': {
      const intent = event.data.object as Stripe.PaymentIntent
      console.log(`[PAGO FALLIDO] ${intent.id}`)
      break
    }
  }

  return NextResponse.json({ received: true })
}
