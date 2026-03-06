import type { Metadata } from "next"
import "./globals.css"
import { ClientLayout } from "./client-layout"

export const metadata: Metadata = {
  title: "Residencial Diamant Blue Cabo Roig — INMOBANCA | Apartamentos exclusivos en primera linea",
  description: "12 apartamentos exclusivos en el Apartahotel Diamant Blue, Cabo Roig, Orihuela Costa. Plantas 3 y 4, de 45 a 72 m2, vistas al Mediterraneo. Precio medio 166.000 EUR. Venta exclusiva INMOBANCA.",
  keywords: "apartamentos cabo roig, apartahotel diamant blue, orihuela costa, inmobanca, pisos playa, costa blanca, apartamentos lujo, inversion costa blanca, primera linea playa, cabo roig apartments",
  openGraph: {
    title: "Residencial Diamant Blue — 12 Apartamentos Exclusivos en Cabo Roig",
    description: "Primera linea de playa. Desde 148.000 EUR. Plantas 3 y 4 del emblematico Apartahotel Diamant Blue. Venta exclusiva INMOBANCA.",
    type: "website",
    locale: "es_ES",
    images: [{
      url: "https://images.getaroom-cdn.com/image/upload/s--KtAwSW2U--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1769578125/864f5fdbb97a797431477845b405cdd0ab6475a5",
      width: 940,
      height: 627,
      alt: "Apartahotel Diamant Blue Cabo Roig",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Residencial Diamant Blue — Apartamentos en Cabo Roig",
    description: "12 apartamentos exclusivos desde 148.000 EUR. Primera linea de playa.",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "INMOBANCA — Residencial Diamant Blue",
  description: "12 apartamentos exclusivos en el Apartahotel Diamant Blue, Cabo Roig, Orihuela Costa.",
  url: "https://diamantblue-caboroig.vercel.app",
  telephone: ["+34620300647", "+34662600893"],
  email: "inmobancamurcia@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Agua 5",
    addressLocality: "Cabo Roig, Orihuela Costa",
    addressRegion: "Alicante",
    postalCode: "03189",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.9275,
    longitude: -0.7210,
  },
  image: "https://images.getaroom-cdn.com/image/upload/s--KtAwSW2U--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1769578125/864f5fdbb97a797431477845b405cdd0ab6475a5",
  priceRange: "148000-185000 EUR",
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Apartment",
      name: "Apartamentos Residencial Diamant Blue",
      numberOfRooms: "1-2",
      floorSize: { "@type": "QuantitativeValue", value: "45-72", unitCode: "MTK" },
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>◇</text></svg>" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
