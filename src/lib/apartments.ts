export interface Apartment {
  id: string
  unit: string
  floor: number
  bedrooms: number
  bathrooms: number
  area: number
  terrace: number
  price: number
  orientation: string
  features: string[]
  status: 'available' | 'reserved' | 'sold'
  description: string
}

// Precio medio de todas = 166,000€
export const apartments: Apartment[] = [
  // PLANTA 3
  {
    id: '3a', unit: '3A', floor: 3, bedrooms: 1, bathrooms: 1, area: 45, terrace: 8,
    price: 148000, orientation: 'Sur', features: ['Vista piscina', 'Reformado', 'Aire acondicionado'],
    status: 'available', description: 'Acogedor apartamento de un dormitorio con orientación sur y vistas a la piscina comunitaria. Luminoso y reformado con acabados de calidad.'
  },
  {
    id: '3b', unit: '3B', floor: 3, bedrooms: 2, bathrooms: 1, area: 65, terrace: 12,
    price: 172000, orientation: 'Sur-Este', features: ['Vista mar lateral', 'Terraza amplia', 'Aire acondicionado', 'Plaza garaje'],
    status: 'available', description: 'Espléndido apartamento de dos dormitorios con amplia terraza y vistas laterales al mar. Distribución funcional y luminosa.'
  },
  {
    id: '3c', unit: '3C', floor: 3, bedrooms: 1, bathrooms: 1, area: 50, terrace: 10,
    price: 156000, orientation: 'Este', features: ['Vista jardín', 'Cocina equipada', 'Aire acondicionado'],
    status: 'available', description: 'Apartamento de un dormitorio con vistas al jardín. Superficie generosa para su categoría y excelente distribución.'
  },
  {
    id: '3d', unit: '3D', floor: 3, bedrooms: 2, bathrooms: 2, area: 70, terrace: 14,
    price: 178000, orientation: 'Sur-Oeste', features: ['Vista mar', 'Dos baños completos', 'Terraza panorámica', 'Trastero'],
    status: 'available', description: 'Magnífico apartamento de dos dormitorios y dos baños con terraza panorámica orientada al sur-oeste. Atardeceres sobre el Mediterráneo.'
  },
  {
    id: '3e', unit: '3E', floor: 3, bedrooms: 1, bathrooms: 1, area: 48, terrace: 8,
    price: 152000, orientation: 'Norte', features: ['Vista montaña', 'Tranquilo', 'Aire acondicionado'],
    status: 'available', description: 'Apartamento tranquilo de un dormitorio con orientación norte y vistas a la sierra. Ideal para quienes buscan paz y frescura.'
  },
  {
    id: '3f', unit: '3F', floor: 3, bedrooms: 2, bathrooms: 1, area: 68, terrace: 12,
    price: 175000, orientation: 'Sur', features: ['Vista mar parcial', 'Salón amplio', 'Aire acondicionado', 'Plaza garaje'],
    status: 'available', description: 'Apartamento de dos dormitorios con salón de generosas dimensiones y vista parcial al mar. Orientación sur garantiza luminosidad todo el año.'
  },
  // PLANTA 4
  {
    id: '4a', unit: '4A', floor: 4, bedrooms: 1, bathrooms: 1, area: 45, terrace: 10,
    price: 155000, orientation: 'Sur', features: ['Vista piscina elevada', 'Último piso', 'Aire acondicionado'],
    status: 'available', description: 'Apartamento en planta alta con vistas elevadas a la piscina y más allá. La planta 4 ofrece mayor privacidad y luz natural.'
  },
  {
    id: '4b', unit: '4B', floor: 4, bedrooms: 2, bathrooms: 1, area: 65, terrace: 14,
    price: 179000, orientation: 'Sur-Este', features: ['Vista mar directa', 'Terraza grande', 'Aire acondicionado', 'Trastero'],
    status: 'available', description: 'Excepcional apartamento de dos dormitorios con vistas directas al mar desde la planta 4. Terraza de 14m² para disfrutar del clima mediterráneo.'
  },
  {
    id: '4c', unit: '4C', floor: 4, bedrooms: 1, bathrooms: 1, area: 50, terrace: 10,
    price: 162000, orientation: 'Este', features: ['Amanecer sobre el mar', 'Reformado', 'Aire acondicionado'],
    status: 'available', description: 'Encantador apartamento de un dormitorio en planta 4 con orientación este. Disfrute de los amaneceres sobre el Mediterráneo.'
  },
  {
    id: '4d', unit: '4D', floor: 4, bedrooms: 2, bathrooms: 2, area: 72, terrace: 16,
    price: 185000, orientation: 'Sur-Oeste', features: ['Mejor vista del edificio', 'Ático', 'Gran terraza', 'Plaza garaje', 'Trastero'],
    status: 'available', description: 'La joya de la corona. Apartamento premium de dos dormitorios con la mejor ubicación del edificio. Terraza de 16m² con vistas panorámicas al mar y puestas de sol.'
  },
  {
    id: '4e', unit: '4E', floor: 4, bedrooms: 1, bathrooms: 1, area: 48, terrace: 8,
    price: 158000, orientation: 'Norte', features: ['Vista montaña elevada', 'Tranquilo', 'Aire acondicionado', 'Armarios empotrados'],
    status: 'available', description: 'Apartamento en planta alta con vistas despejadas a la sierra. La altura de la planta 4 ofrece panorámicas únicas incluso en orientación norte.'
  },
  {
    id: '4f', unit: '4F', floor: 4, bedrooms: 2, bathrooms: 1, area: 68, terrace: 12,
    price: 172000, orientation: 'Sur', features: ['Vista mar parcial elevada', 'Luminoso', 'Aire acondicionado', 'Plaza garaje'],
    status: 'available', description: 'Luminoso apartamento de dos dormitorios en planta 4 con orientación sur plena. Vistas parciales al mar desde una posición elevada privilegiada.'
  },
]

export function getApartment(id: string) {
  return apartments.find(a => a.id === id)
}

export function formatEur(amount: number) {
  return amount.toLocaleString('es-ES') + ' €'
}

// Verify average
// const avg = apartments.reduce((s, a) => s + a.price, 0) / apartments.length  // = 166,000
