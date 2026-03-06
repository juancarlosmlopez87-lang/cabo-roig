export type Lang = 'es' | 'en' | 'ru' | 'de' | 'fr' | 'it' | 'nl' | 'ro' | 'uk' | 'pt' | 'sv' | 'no' | 'da' | 'fi' | 'pl' | 'cs' | 'ar' | 'zh'

export interface T {
  // Nav
  nav_apartments: string
  nav_location: string
  nav_gallery: string
  nav_contact: string
  nav_reserve: string
  // Hero
  hero_exclusive: string
  hero_title_1: string
  hero_title_2: string
  hero_desc: string
  hero_discover: string
  hero_reserve: string
  hero_scroll: string
  // Key figures
  fig_apartments: string
  fig_avg_price: string
  fig_sqm: string
  fig_beachfront: string
  fig_beachfront_val: string
  // About
  about_title_1: string
  about_title_2: string
  about_p1: string
  about_p2: string
  about_p3: string
  about_see_apts: string
  about_contract: string
  // Apartments
  apts_title_1: string
  apts_title_2: string
  apts_subtitle: string
  apts_floor: string
  apts_from: string
  apts_avg_notice: string
  apts_available: string
  apts_reserved: string
  apts_sold: string
  apts_bed: string
  apts_bath: string
  apts_terrace: string
  apts_view_detail: string
  apts_plant: string
  // Gallery
  gal_title_1: string
  gal_title_2: string
  gal_subtitle: string
  gal_hotel: string
  gal_hotel_addr: string
  gal_pool: string
  gal_pool_desc: string
  gal_interior: string
  gal_interior_desc: string
  gal_beach: string
  gal_beach_desc: string
  gal_golf: string
  gal_golf_desc: string
  // Location
  loc_title_1: string
  loc_title_2: string
  loc_beach: string
  loc_beach_desc: string
  loc_strip: string
  loc_strip_desc: string
  loc_boulevard: string
  loc_boulevard_desc: string
  loc_airport: string
  loc_airport_desc: string
  loc_golf: string
  loc_golf_desc: string
  loc_services: string
  loc_services_desc: string
  loc_mediterranean: string
  // Why invest
  inv_title_1: string
  inv_title_2: string
  inv_rental: string
  inv_rental_desc: string
  inv_growth: string
  inv_growth_desc: string
  inv_lifestyle: string
  inv_lifestyle_desc: string
  // Contact
  cnt_title_1: string
  cnt_subtitle: string
  cnt_reserve_apt: string
  cnt_interested: string
  cnt_exclusive: string
  // Footer
  ftr_exclusive_apts: string
  ftr_exclusive_comm: string
  ftr_legal: string
  ftr_contract: string
  ftr_privacy: string
  ftr_notice: string
  ftr_rights: string
  ftr_comm_of: string
  // Reservar page
  res_title_1: string
  res_title_2: string
  res_subtitle: string
  res_step_select: string
  res_step_data: string
  res_step_confirm: string
  res_select_apt: string
  res_continue: string
  res_buyer_data: string
  res_name: string
  res_surname: string
  res_dni: string
  res_email: string
  res_phone: string
  res_address: string
  res_back: string
  res_confirm_title: string
  res_selected_apt: string
  res_buyer: string
  res_signal: string
  res_vat: string
  res_total: string
  res_accept: string
  res_processing: string
  res_pay: string
  res_fill_fields: string
  res_connection_error: string
  // Apartment detail
  det_price: string
  det_surface: string
  det_bedroom: string
  det_bedrooms: string
  det_terrace: string
  det_description: string
  det_features: string
  det_full_bath: string
  det_full_baths: string
  det_orientation: string
  det_community_pool: string
  det_common_areas: string
  det_location: string
  det_beach: string
  det_restaurants: string
  det_airport: string
  det_signal: string
  det_total_reserve: string
  det_reserve_this: string
  det_is_reserved: string
  det_is_sold: string
  det_request_visit: string
  det_markets: string
  det_back_all: string
  // CRM
  crm_title: string
  crm_subtitle: string
  crm_clients: string
  crm_calendar: string
  crm_summary: string
  crm_all: string
  crm_interested: string
  crm_visit_scheduled: string
  crm_offer_made: string
  crm_reserved_status: string
  crm_discarded: string
  crm_new_client: string
  crm_no_clients: string
  crm_add_client: string
  crm_edit_client: string
  crm_save: string
  crm_create: string
  crm_cancel: string
  crm_notes: string
  crm_apts_interest: string
  crm_registered: string
  crm_visits: string
  crm_no_visits: string
  crm_done: string
  crm_pending: string
  crm_schedule_visit: string
  crm_edit: string
  crm_delete: string
  crm_close: string
  crm_select_client: string
  crm_new_visit: string
  crm_client: string
  crm_apartment: string
  crm_general: string
  crm_date: string
  crm_time: string
  crm_save_visit: string
  crm_upcoming: string
  crm_no_pending: string
  crm_mark_done: string
  crm_total_clients: string
  crm_total_visits: string
  crm_visits_done: string
  crm_apts_available: string
  crm_apt_status: string
  crm_interested_count: string
  crm_visits_count: string
  crm_funnel: string
  crm_estado: string
  // Contract exclusivity
  cex_title_1: string
  cex_title_2: string
  cex_subtitle: string
  cex_private: string
  cex_mandate: string
  cex_mandate_sub: string
  // Contract reserva
  cre_title_1: string
  cre_title_2: string
  cre_private: string
  cre_housing: string
  cre_sign_here: string
  cre_clear: string
  cre_sign_btn: string
  cre_signed: string
  cre_signed_by: string
  cre_signed_digitally: string
  cre_print: string
  cre_agent: string
  cre_on_behalf: string
  // Owner page
  own_title: string
  own_subtitle: string
  own_welcome: string
  own_desc: string
  own_view_contract: string
  own_view_status: string
  own_contact_agent: string
}

const es: T = {
  nav_apartments: 'Apartamentos', nav_location: 'Ubicación', nav_gallery: 'Galería', nav_contact: 'Contacto', nav_reserve: 'Reservar',
  hero_exclusive: 'Venta exclusiva — Cabo Roig, Orihuela Costa', hero_title_1: 'Residencial', hero_title_2: 'Diamant Blue', hero_desc: '12 apartamentos exclusivos en las plantas 3 y 4 del emblemático Apartahotel Diamant Blue. Primera línea de playa en el corazón de Cabo Roig.', hero_discover: 'Descubrir apartamentos', hero_reserve: 'Reservar ahora', hero_scroll: 'Scroll',
  fig_apartments: 'Apartamentos', fig_avg_price: 'Precio medio', fig_sqm: 'Metros cuadrados', fig_beachfront: 'De playa', fig_beachfront_val: '1ª línea',
  about_title_1: 'Un enclave', about_title_2: 'privilegiado', about_p1: 'El Apartahotel Diamant Blue se alza en una de las ubicaciones más cotizadas de la Costa Blanca Sur. A escasos metros de la Playa de Cabo Roig y del célebre paseo marítimo, estas plantas ofrecen el equilibrio perfecto entre la vida junto al mar y la comodidad de una zona con todos los servicios.', about_p2: 'Las plantas 3 y 4 presentan 12 apartamentos de entre 1 y 2 dormitorios, con superficies de 45 a 72 m² y terrazas de hasta 16 m². Orientaciones variadas que incluyen vistas directas al Mediterráneo, a la piscina comunitaria y a la sierra de Orihuela.', about_p3: 'Comercialización exclusiva a cargo de', about_see_apts: 'Ver apartamentos', about_contract: 'Contrato exclusividad',
  apts_title_1: 'Nuestros', apts_title_2: 'Apartamentos', apts_subtitle: '12 unidades exclusivas distribuidas en dos plantas. Cada apartamento ha sido diseñado para ofrecer el máximo confort mediterráneo.', apts_floor: 'Planta', apts_from: 'Desde', apts_avg_notice: 'Precio medio del conjunto', apts_available: 'Disponible', apts_reserved: 'Reservado', apts_sold: 'Vendido', apts_bed: 'dorm', apts_bath: 'baño', apts_terrace: 'Terraza', apts_view_detail: 'Ver detalle', apts_plant: 'Planta',
  gal_title_1: 'Cabo Roig, el', gal_title_2: 'Mediterráneo en estado puro', gal_subtitle: 'Playas de aguas cristalinas, paseo marítimo con los mejores restaurantes, mercadillos, campos de golf y un clima envidiable los 365 días del año.', gal_hotel: 'Apartahotel Diamant Blue', gal_hotel_addr: 'Calle Agua 5, Cabo Roig', gal_pool: 'Piscina comunitaria', gal_pool_desc: 'Zona de piscina y solárium', gal_interior: 'Interior apartamentos', gal_interior_desc: 'Amplios y luminosos', gal_beach: 'Playa de Cabo Roig', gal_beach_desc: 'Bandera Azul · A 200 metros', gal_golf: 'Campos de golf', gal_golf_desc: 'Villamartín a 10 min',
  loc_title_1: 'Ubicación', loc_title_2: 'excepcional', loc_beach: 'Playa de Cabo Roig', loc_beach_desc: 'A 200 metros. Bandera Azul, aguas cristalinas.', loc_strip: 'Strip de Cabo Roig', loc_strip_desc: 'A 5 minutos. Los mejores restaurantes de la costa.', loc_boulevard: 'La Zenia Boulevard', loc_boulevard_desc: 'A 5 minutos en coche. Centro comercial de referencia.', loc_airport: 'Aeropuerto Alicante', loc_airport_desc: 'A 45 minutos. Conexiones con toda Europa.', loc_golf: 'Campos de golf', loc_golf_desc: 'Villamartín, Las Ramblas, Campoamor a menos de 10 min.', loc_services: 'Servicios', loc_services_desc: 'Farmacias, supermercados, centros médicos a pie.', loc_mediterranean: 'Vistas al Mediterráneo',
  inv_title_1: '¿Por qué', inv_title_2: 'invertir aquí?', inv_rental: 'Rentabilidad', inv_rental_desc: 'Cabo Roig es una de las zonas con mayor demanda turística de la Costa Blanca. Rentabilidades de alquiler vacacional superiores al 8% anual.', inv_growth: 'Revalorización', inv_growth_desc: 'El mercado inmobiliario de Orihuela Costa muestra una tendencia alcista sostenida. Precios por debajo de la media de la costa permite margen de revalorización.', inv_lifestyle: 'Estilo de vida', inv_lifestyle_desc: 'Más de 300 días de sol al año, gastronomía mediterránea, golf, deportes náuticos y una comunidad internacional vibrante.',
  cnt_title_1: '¿Interesado?', cnt_subtitle: 'Solicite información, programe una visita o reserve su apartamento. Nuestro equipo le atenderá de forma personalizada.', cnt_reserve_apt: 'Reservar apartamento', cnt_interested: 'Ficha de interesado / Visitas', cnt_exclusive: 'Comercialización exclusiva',
  ftr_exclusive_apts: 'Apartamentos exclusivos en primera línea de playa. Cabo Roig, Orihuela Costa, Alicante.', ftr_exclusive_comm: 'Comercialización exclusiva', ftr_legal: 'Legal', ftr_contract: 'Contrato de Exclusividad', ftr_privacy: 'Política de privacidad', ftr_notice: 'Aviso legal', ftr_rights: 'Todos los derechos reservados.', ftr_comm_of: 'Comercialización exclusiva de Residencial Diamant Blue Cabo Roig',
  res_title_1: 'Reservar', res_title_2: 'apartamento', res_subtitle: 'La comisión de reserva es del 5% del precio + IVA. Es un importe adicional al precio de la vivienda.', res_step_select: 'Seleccionar', res_step_data: 'Datos personales', res_step_confirm: 'Confirmar y pagar', res_select_apt: 'Seleccione su apartamento', res_continue: 'Continuar', res_buyer_data: 'Datos del comprador', res_name: 'Nombre', res_surname: 'Apellidos', res_dni: 'DNI / NIE / Pasaporte', res_email: 'Email', res_phone: 'Teléfono', res_address: 'Dirección', res_back: 'Atrás', res_confirm_title: 'Confirmar reserva', res_selected_apt: 'Apartamento seleccionado', res_buyer: 'Comprador', res_signal: 'Señal de reserva (5% de', res_vat: 'IVA (21%)', res_total: 'Total a pagar', res_accept: 'He leído y acepto las condiciones de reserva. Entiendo que la comisión del 5% + IVA es un importe adicional al precio de venta de la vivienda. En caso de desistimiento, la señal no será reembolsable. Al pagar, se generará un contrato de reserva vinculante.', res_processing: 'Procesando...', res_pay: 'Pagar', res_fill_fields: 'Complete todos los campos obligatorios', res_connection_error: 'Error de conexión',
  det_price: 'Precio', det_surface: 'Superficie', det_bedroom: 'Dormitorio', det_bedrooms: 'Dormitorios', det_terrace: 'Terraza', det_description: 'Descripción', det_features: 'Características', det_full_bath: 'baño completo', det_full_baths: 'baños completos', det_orientation: 'Orientación', det_community_pool: 'Piscina comunitaria', det_common_areas: 'Zonas comunes', det_location: 'Ubicación', det_beach: 'Playa', det_restaurants: 'Restaurantes', det_airport: 'Aeropuerto', det_signal: 'Señal de reserva (5%)', det_total_reserve: 'Total reserva', det_reserve_this: 'Reservar este apartamento', det_is_reserved: 'Este apartamento está reservado', det_is_sold: 'Este apartamento está vendido', det_request_visit: 'Solicitar visita', det_markets: 'Comercializa', det_back_all: 'Volver a todos los apartamentos',
  crm_title: 'CRM Inmobiliario', crm_subtitle: 'Gestión de clientes, visitas y seguimiento — Residencial Diamant Blue', crm_clients: 'Clientes', crm_calendar: 'Calendario', crm_summary: 'Resumen', crm_all: 'Todos', crm_interested: 'Interesado', crm_visit_scheduled: 'Visita programada', crm_offer_made: 'Oferta realizada', crm_reserved_status: 'Reservado', crm_discarded: 'Descartado', crm_new_client: '+ Nuevo cliente', crm_no_clients: 'No hay clientes', crm_add_client: 'Añada un nuevo cliente para comenzar', crm_edit_client: 'Editar cliente', crm_save: 'Guardar', crm_create: 'Crear cliente', crm_cancel: 'Cancelar', crm_notes: 'Notas', crm_apts_interest: 'Apartamentos de interés', crm_registered: 'Registro', crm_visits: 'Visitas', crm_no_visits: 'Sin visitas programadas', crm_done: 'Realizada', crm_pending: 'Pendiente', crm_schedule_visit: 'Programar visita', crm_edit: 'Editar', crm_delete: 'Eliminar', crm_close: 'Cerrar', crm_select_client: 'Seleccione un cliente para ver su ficha', crm_new_visit: '+ Nueva visita', crm_client: 'Cliente', crm_apartment: 'Apartamento', crm_general: 'General / Todos', crm_date: 'Fecha', crm_time: 'Hora', crm_save_visit: 'Guardar visita', crm_upcoming: 'Próximas visitas', crm_no_pending: 'No hay visitas pendientes', crm_mark_done: 'Marcar realizada', crm_total_clients: 'Clientes totales', crm_total_visits: 'Visitas totales', crm_visits_done: 'Visitas realizadas', crm_apts_available: 'Apts disponibles', crm_apt_status: 'Estado de los apartamentos', crm_interested_count: 'interesados', crm_visits_count: 'visitas', crm_funnel: 'Embudo de ventas', crm_estado: 'Estado',
  cex_title_1: 'Contrato de', cex_title_2: 'Exclusividad', cex_subtitle: 'Mandato de comercialización exclusiva', cex_private: 'Contrato Privado', cex_mandate: 'MANDATO DE COMERCIALIZACIÓN EN EXCLUSIVA', cex_mandate_sub: 'De las viviendas sitas en Apartahotel Diamant Blue, Plantas 3 y 4, Cabo Roig, Orihuela Costa (Alicante)',
  cre_title_1: 'Contrato de', cre_title_2: 'Reserva', cre_private: 'Documento Privado', cre_housing: 'CONTRATO DE RESERVA DE VIVIENDA', cre_sign_here: 'Firme aquí:', cre_clear: 'Borrar firma', cre_sign_btn: 'Firmar contrato de reserva', cre_signed: 'Contrato de reserva firmado', cre_signed_by: 'Firmado por:', cre_signed_digitally: 'Firmado digitalmente el', cre_print: 'Imprimir / Guardar PDF', cre_agent: 'INMOBANCA', cre_on_behalf: 'En representación de INMOBANCA',
  own_title: 'Portal del Propietario', own_subtitle: 'Acceso exclusivo para la propiedad del edificio', own_welcome: 'Bienvenida', own_desc: 'Este portal está reservado para la propietaria del Apartahotel Diamant Blue. Aquí puede consultar el estado de la comercialización, firmar el contrato de exclusividad y contactar con su agente.', own_view_contract: 'Ver y firmar contrato de exclusividad', own_view_status: 'Ver estado de apartamentos', own_contact_agent: 'Contactar con el agente',
}

const en: T = {
  nav_apartments: 'Apartments', nav_location: 'Location', nav_gallery: 'Gallery', nav_contact: 'Contact', nav_reserve: 'Reserve',
  hero_exclusive: 'Exclusive sale — Cabo Roig, Orihuela Costa', hero_title_1: 'Residencial', hero_title_2: 'Diamant Blue', hero_desc: '12 exclusive apartments on floors 3 and 4 of the iconic Aparthotel Diamant Blue. Beachfront location in the heart of Cabo Roig.', hero_discover: 'Discover apartments', hero_reserve: 'Reserve now', hero_scroll: 'Scroll',
  fig_apartments: 'Apartments', fig_avg_price: 'Average price', fig_sqm: 'Square meters', fig_beachfront: 'Beachfront', fig_beachfront_val: 'Beachfront',
  about_title_1: 'A', about_title_2: 'privileged location', about_p1: 'Aparthotel Diamant Blue stands in one of the most sought-after locations on the South Costa Blanca. Just steps from Cabo Roig Beach and the famous promenade, these floors offer the perfect balance between seaside living and the comfort of a fully serviced area.', about_p2: 'Floors 3 and 4 feature 12 apartments with 1 and 2 bedrooms, from 45 to 72 m² with terraces up to 16 m². Varied orientations including direct Mediterranean views, community pool views and views of the Orihuela mountains.', about_p3: 'Exclusive marketing by', about_see_apts: 'View apartments', about_contract: 'Exclusivity contract',
  apts_title_1: 'Our', apts_title_2: 'Apartments', apts_subtitle: '12 exclusive units across two floors. Each apartment is designed to offer maximum Mediterranean comfort.', apts_floor: 'Floor', apts_from: 'From', apts_avg_notice: 'Average price of the collection', apts_available: 'Available', apts_reserved: 'Reserved', apts_sold: 'Sold', apts_bed: 'bed', apts_bath: 'bath', apts_terrace: 'Terrace', apts_view_detail: 'View details', apts_plant: 'Floor',
  gal_title_1: 'Cabo Roig, the', gal_title_2: 'Mediterranean at its finest', gal_subtitle: 'Crystal-clear waters, seaside promenade with the best restaurants, markets, golf courses and an enviable climate 365 days a year.', gal_hotel: 'Aparthotel Diamant Blue', gal_hotel_addr: 'Calle Agua 5, Cabo Roig', gal_pool: 'Community pool', gal_pool_desc: 'Pool and solarium area', gal_interior: 'Apartment interiors', gal_interior_desc: 'Spacious and bright', gal_beach: 'Cabo Roig Beach', gal_beach_desc: 'Blue Flag · 200 meters away', gal_golf: 'Golf courses', gal_golf_desc: 'Villamartín 10 min away',
  loc_title_1: 'Exceptional', loc_title_2: 'location', loc_beach: 'Cabo Roig Beach', loc_beach_desc: '200 meters away. Blue Flag, crystal-clear waters.', loc_strip: 'Cabo Roig Strip', loc_strip_desc: '5 minutes away. The best restaurants on the coast.', loc_boulevard: 'La Zenia Boulevard', loc_boulevard_desc: '5 minutes by car. Premier shopping centre.', loc_airport: 'Alicante Airport', loc_airport_desc: '45 minutes. Connections to all of Europe.', loc_golf: 'Golf courses', loc_golf_desc: 'Villamartín, Las Ramblas, Campoamor less than 10 min.', loc_services: 'Services', loc_services_desc: 'Pharmacies, supermarkets, medical centres on foot.', loc_mediterranean: 'Mediterranean views',
  inv_title_1: 'Why', inv_title_2: 'invest here?', inv_rental: 'Profitability', inv_rental_desc: 'Cabo Roig is one of the areas with highest tourist demand on the Costa Blanca. Holiday rental returns exceeding 8% annually.', inv_growth: 'Capital growth', inv_growth_desc: 'The Orihuela Costa property market shows a sustained upward trend. Prices below the coast average offer growth potential.', inv_lifestyle: 'Lifestyle', inv_lifestyle_desc: 'Over 300 days of sunshine, Mediterranean cuisine, golf, water sports and a vibrant international community.',
  cnt_title_1: 'Interested?', cnt_subtitle: 'Request information, schedule a visit or reserve your apartment. Our team will assist you personally.', cnt_reserve_apt: 'Reserve apartment', cnt_interested: 'Interested party / Visits', cnt_exclusive: 'Exclusive marketing',
  ftr_exclusive_apts: 'Exclusive beachfront apartments. Cabo Roig, Orihuela Costa, Alicante.', ftr_exclusive_comm: 'Exclusive marketing', ftr_legal: 'Legal', ftr_contract: 'Exclusivity Contract', ftr_privacy: 'Privacy policy', ftr_notice: 'Legal notice', ftr_rights: 'All rights reserved.', ftr_comm_of: 'Exclusive marketing of Residencial Diamant Blue Cabo Roig',
  res_title_1: 'Reserve', res_title_2: 'apartment', res_subtitle: 'The reservation commission is 5% of the price + VAT. This is an additional amount to the property price.', res_step_select: 'Select', res_step_data: 'Personal data', res_step_confirm: 'Confirm & pay', res_select_apt: 'Select your apartment', res_continue: 'Continue', res_buyer_data: 'Buyer details', res_name: 'First name', res_surname: 'Surname', res_dni: 'ID / Passport', res_email: 'Email', res_phone: 'Phone', res_address: 'Address', res_back: 'Back', res_confirm_title: 'Confirm reservation', res_selected_apt: 'Selected apartment', res_buyer: 'Buyer', res_signal: 'Reservation fee (5% of', res_vat: 'VAT (21%)', res_total: 'Total to pay', res_accept: 'I have read and accept the reservation conditions. I understand that the 5% + VAT commission is additional to the sale price. In case of withdrawal, the deposit is non-refundable. Upon payment, a binding reservation contract will be generated.', res_processing: 'Processing...', res_pay: 'Pay', res_fill_fields: 'Please complete all required fields', res_connection_error: 'Connection error',
  det_price: 'Price', det_surface: 'Surface', det_bedroom: 'Bedroom', det_bedrooms: 'Bedrooms', det_terrace: 'Terrace', det_description: 'Description', det_features: 'Features', det_full_bath: 'full bathroom', det_full_baths: 'full bathrooms', det_orientation: 'Orientation', det_community_pool: 'Community pool', det_common_areas: 'Common areas', det_location: 'Location', det_beach: 'Beach', det_restaurants: 'Restaurants', det_airport: 'Airport', det_signal: 'Reservation fee (5%)', det_total_reserve: 'Total reservation', det_reserve_this: 'Reserve this apartment', det_is_reserved: 'This apartment is reserved', det_is_sold: 'This apartment is sold', det_request_visit: 'Request a visit', det_markets: 'Marketed by', det_back_all: 'Back to all apartments',
  crm_title: 'Real Estate CRM', crm_subtitle: 'Client management, visits and tracking — Residencial Diamant Blue', crm_clients: 'Clients', crm_calendar: 'Calendar', crm_summary: 'Summary', crm_all: 'All', crm_interested: 'Interested', crm_visit_scheduled: 'Visit scheduled', crm_offer_made: 'Offer made', crm_reserved_status: 'Reserved', crm_discarded: 'Discarded', crm_new_client: '+ New client', crm_no_clients: 'No clients', crm_add_client: 'Add a new client to get started', crm_edit_client: 'Edit client', crm_save: 'Save', crm_create: 'Create client', crm_cancel: 'Cancel', crm_notes: 'Notes', crm_apts_interest: 'Apartments of interest', crm_registered: 'Registered', crm_visits: 'Visits', crm_no_visits: 'No scheduled visits', crm_done: 'Completed', crm_pending: 'Pending', crm_schedule_visit: 'Schedule visit', crm_edit: 'Edit', crm_delete: 'Delete', crm_close: 'Close', crm_select_client: 'Select a client to view their file', crm_new_visit: '+ New visit', crm_client: 'Client', crm_apartment: 'Apartment', crm_general: 'General / All', crm_date: 'Date', crm_time: 'Time', crm_save_visit: 'Save visit', crm_upcoming: 'Upcoming visits', crm_no_pending: 'No pending visits', crm_mark_done: 'Mark as done', crm_total_clients: 'Total clients', crm_total_visits: 'Total visits', crm_visits_done: 'Visits completed', crm_apts_available: 'Apts available', crm_apt_status: 'Apartment status', crm_interested_count: 'interested', crm_visits_count: 'visits', crm_funnel: 'Sales funnel', crm_estado: 'Status',
  cex_title_1: 'Exclusivity', cex_title_2: 'Contract', cex_subtitle: 'Exclusive marketing mandate', cex_private: 'Private Contract', cex_mandate: 'EXCLUSIVE MARKETING MANDATE', cex_mandate_sub: 'For the dwellings at Aparthotel Diamant Blue, Floors 3 and 4, Cabo Roig, Orihuela Costa (Alicante)',
  cre_title_1: 'Reservation', cre_title_2: 'Contract', cre_private: 'Private Document', cre_housing: 'HOUSING RESERVATION CONTRACT', cre_sign_here: 'Sign here:', cre_clear: 'Clear signature', cre_sign_btn: 'Sign reservation contract', cre_signed: 'Reservation contract signed', cre_signed_by: 'Signed by:', cre_signed_digitally: 'Digitally signed on', cre_print: 'Print / Save PDF', cre_agent: 'INMOBANCA', cre_on_behalf: 'On behalf of INMOBANCA',
  own_title: 'Owner Portal', own_subtitle: 'Exclusive access for the building owner', own_welcome: 'Welcome', own_desc: 'This portal is reserved for the owner of Aparthotel Diamant Blue. Here you can check the marketing status, sign the exclusivity contract and contact your agent.', own_view_contract: 'View and sign exclusivity contract', own_view_status: 'View apartment status', own_contact_agent: 'Contact agent',
}

const ru: T = {
  nav_apartments: 'Апартаменты', nav_location: 'Расположение', nav_gallery: 'Галерея', nav_contact: 'Контакты', nav_reserve: 'Бронировать',
  hero_exclusive: 'Эксклюзивная продажа — Кабо Роиг, Ориуэла Коста', hero_title_1: 'Резиденция', hero_title_2: 'Diamant Blue', hero_desc: '12 эксклюзивных апартаментов на 3 и 4 этажах легендарного Апарт-отеля Diamant Blue. На первой линии пляжа в сердце Кабо Роиг.', hero_discover: 'Смотреть апартаменты', hero_reserve: 'Забронировать', hero_scroll: 'Листать',
  fig_apartments: 'Апартаменты', fig_avg_price: 'Средняя цена', fig_sqm: 'Квадратные метры', fig_beachfront: 'Первая линия', fig_beachfront_val: 'Первая линия',
  about_title_1: 'Привилегированное', about_title_2: 'расположение', about_p1: 'Апарт-отель Diamant Blue расположен в одном из самых востребованных мест южного побережья Коста Бланка. В нескольких шагах от пляжа Кабо Роиг и знаменитой набережной — идеальный баланс между жизнью у моря и комфортом.', about_p2: 'На 3 и 4 этажах расположены 12 апартаментов с 1 и 2 спальнями, площадью от 45 до 72 м² с террасами до 16 м². Различные ориентации, включая прямой вид на Средиземное море, бассейн и горы Ориуэлы.', about_p3: 'Эксклюзивная продажа через', about_see_apts: 'Смотреть апартаменты', about_contract: 'Договор эксклюзивности',
  apts_title_1: 'Наши', apts_title_2: 'Апартаменты', apts_subtitle: '12 эксклюзивных объектов на двух этажах. Каждый апартамент создан для максимального средиземноморского комфорта.', apts_floor: 'Этаж', apts_from: 'От', apts_avg_notice: 'Средняя цена комплекса', apts_available: 'Доступен', apts_reserved: 'Забронирован', apts_sold: 'Продан', apts_bed: 'спал.', apts_bath: 'ванн.', apts_terrace: 'Терраса', apts_view_detail: 'Подробнее', apts_plant: 'Этаж',
  gal_title_1: 'Кабо Роиг —', gal_title_2: 'Средиземноморье в чистом виде', gal_subtitle: 'Кристально чистые воды, набережная с лучшими ресторанами, рынки, гольф-поля и завидный климат 365 дней в году.', gal_hotel: 'Апарт-отель Diamant Blue', gal_hotel_addr: 'Calle Agua 5, Кабо Роиг', gal_pool: 'Общий бассейн', gal_pool_desc: 'Зона бассейна и солярий', gal_interior: 'Интерьер апартаментов', gal_interior_desc: 'Просторные и светлые', gal_beach: 'Пляж Кабо Роиг', gal_beach_desc: 'Голубой флаг · 200 метров', gal_golf: 'Гольф-поля', gal_golf_desc: 'Вильямартин — 10 мин',
  loc_title_1: 'Исключительное', loc_title_2: 'расположение', loc_beach: 'Пляж Кабо Роиг', loc_beach_desc: '200 метров. Голубой флаг, кристальная вода.', loc_strip: 'Набережная Кабо Роиг', loc_strip_desc: '5 минут. Лучшие рестораны побережья.', loc_boulevard: 'La Zenia Boulevard', loc_boulevard_desc: '5 минут на авто. Крупнейший торговый центр.', loc_airport: 'Аэропорт Аликанте', loc_airport_desc: '45 минут. Рейсы по всей Европе.', loc_golf: 'Гольф-поля', loc_golf_desc: 'Вильямартин, Лас Рамблас, Кампоамор — менее 10 мин.', loc_services: 'Услуги', loc_services_desc: 'Аптеки, супермаркеты, медцентры — пешком.', loc_mediterranean: 'Виды на Средиземное море',
  inv_title_1: 'Почему стоит', inv_title_2: 'инвестировать сюда?', inv_rental: 'Доходность', inv_rental_desc: 'Кабо Роиг — одна из самых востребованных туристических зон Коста Бланки. Доходность от аренды превышает 8% в год.', inv_growth: 'Рост стоимости', inv_growth_desc: 'Рынок недвижимости Ориуэла Коста показывает устойчивый рост. Цены ниже среднего по побережью дают потенциал роста.', inv_lifestyle: 'Образ жизни', inv_lifestyle_desc: 'Более 300 солнечных дней, средиземноморская кухня, гольф, водные виды спорта и яркое международное сообщество.',
  cnt_title_1: 'Заинтересованы?', cnt_subtitle: 'Запросите информацию, запланируйте визит или забронируйте апартамент. Наша команда окажет вам персональное внимание.', cnt_reserve_apt: 'Забронировать апартамент', cnt_interested: 'Анкета / Визиты', cnt_exclusive: 'Эксклюзивная продажа',
  ftr_exclusive_apts: 'Эксклюзивные апартаменты на первой линии пляжа. Кабо Роиг, Ориуэла Коста, Аликанте.', ftr_exclusive_comm: 'Эксклюзивная продажа', ftr_legal: 'Юридическая информация', ftr_contract: 'Договор эксклюзивности', ftr_privacy: 'Политика конфиденциальности', ftr_notice: 'Правовая информация', ftr_rights: 'Все права защищены.', ftr_comm_of: 'Эксклюзивная продажа Residencial Diamant Blue Кабо Роиг',
  res_title_1: 'Забронировать', res_title_2: 'апартамент', res_subtitle: 'Комиссия за бронирование составляет 5% от цены + НДС. Это дополнительная сумма к цене недвижимости.', res_step_select: 'Выбрать', res_step_data: 'Личные данные', res_step_confirm: 'Подтвердить и оплатить', res_select_apt: 'Выберите апартамент', res_continue: 'Продолжить', res_buyer_data: 'Данные покупателя', res_name: 'Имя', res_surname: 'Фамилия', res_dni: 'Паспорт / ID', res_email: 'Электронная почта', res_phone: 'Телефон', res_address: 'Адрес', res_back: 'Назад', res_confirm_title: 'Подтвердить бронирование', res_selected_apt: 'Выбранный апартамент', res_buyer: 'Покупатель', res_signal: 'Комиссия за бронирование (5% от', res_vat: 'НДС (21%)', res_total: 'Итого к оплате', res_accept: 'Я прочитал(а) и принимаю условия бронирования. Я понимаю, что комиссия 5% + НДС является дополнительной к цене продажи. В случае отказа задаток не возвращается. При оплате формируется обязательный договор бронирования.', res_processing: 'Обработка...', res_pay: 'Оплатить', res_fill_fields: 'Заполните все обязательные поля', res_connection_error: 'Ошибка соединения',
  det_price: 'Цена', det_surface: 'Площадь', det_bedroom: 'Спальня', det_bedrooms: 'Спальни', det_terrace: 'Терраса', det_description: 'Описание', det_features: 'Характеристики', det_full_bath: 'ванная комната', det_full_baths: 'ванные комнаты', det_orientation: 'Ориентация', det_community_pool: 'Общий бассейн', det_common_areas: 'Общие зоны', det_location: 'Расположение', det_beach: 'Пляж', det_restaurants: 'Рестораны', det_airport: 'Аэропорт', det_signal: 'Комиссия (5%)', det_total_reserve: 'Итого бронирование', det_reserve_this: 'Забронировать этот апартамент', det_is_reserved: 'Этот апартамент забронирован', det_is_sold: 'Этот апартамент продан', det_request_visit: 'Запросить визит', det_markets: 'Продаёт', det_back_all: 'Назад ко всем апартаментам',
  crm_title: 'CRM Недвижимости', crm_subtitle: 'Управление клиентами, визитами и отслеживание — Residencial Diamant Blue', crm_clients: 'Клиенты', crm_calendar: 'Календарь', crm_summary: 'Сводка', crm_all: 'Все', crm_interested: 'Заинтересован', crm_visit_scheduled: 'Визит запланирован', crm_offer_made: 'Предложение сделано', crm_reserved_status: 'Забронирован', crm_discarded: 'Отклонён', crm_new_client: '+ Новый клиент', crm_no_clients: 'Нет клиентов', crm_add_client: 'Добавьте нового клиента', crm_edit_client: 'Редактировать клиента', crm_save: 'Сохранить', crm_create: 'Создать клиента', crm_cancel: 'Отмена', crm_notes: 'Заметки', crm_apts_interest: 'Интересующие апартаменты', crm_registered: 'Зарегистрирован', crm_visits: 'Визиты', crm_no_visits: 'Нет запланированных визитов', crm_done: 'Выполнен', crm_pending: 'Ожидание', crm_schedule_visit: 'Запланировать визит', crm_edit: 'Редактировать', crm_delete: 'Удалить', crm_close: 'Закрыть', crm_select_client: 'Выберите клиента для просмотра', crm_new_visit: '+ Новый визит', crm_client: 'Клиент', crm_apartment: 'Апартамент', crm_general: 'Общий / Все', crm_date: 'Дата', crm_time: 'Время', crm_save_visit: 'Сохранить визит', crm_upcoming: 'Предстоящие визиты', crm_no_pending: 'Нет ожидающих визитов', crm_mark_done: 'Отметить выполненным', crm_total_clients: 'Всего клиентов', crm_total_visits: 'Всего визитов', crm_visits_done: 'Визитов выполнено', crm_apts_available: 'Доступно', crm_apt_status: 'Статус апартаментов', crm_interested_count: 'заинтересованных', crm_visits_count: 'визитов', crm_funnel: 'Воронка продаж', crm_estado: 'Статус',
  cex_title_1: 'Договор', cex_title_2: 'Эксклюзивности', cex_subtitle: 'Мандат на эксклюзивную коммерциализацию', cex_private: 'Частный договор', cex_mandate: 'МАНДАТ НА ЭКСКЛЮЗИВНУЮ КОММЕРЦИАЛИЗАЦИЮ', cex_mandate_sub: 'Жилых помещений в Апарт-отеле Diamant Blue, этажи 3 и 4, Кабо Роиг, Ориуэла Коста (Аликанте)',
  cre_title_1: 'Договор', cre_title_2: 'Бронирования', cre_private: 'Частный документ', cre_housing: 'ДОГОВОР БРОНИРОВАНИЯ ЖИЛЬЯ', cre_sign_here: 'Подпишите здесь:', cre_clear: 'Очистить подпись', cre_sign_btn: 'Подписать договор бронирования', cre_signed: 'Договор бронирования подписан', cre_signed_by: 'Подписано:', cre_signed_digitally: 'Подписано цифровой подписью', cre_print: 'Печать / Сохранить PDF', cre_agent: 'INMOBANCA', cre_on_behalf: 'От имени INMOBANCA',
  own_title: 'Портал Владельца', own_subtitle: 'Эксклюзивный доступ для собственника здания', own_welcome: 'Добро пожаловать', own_desc: 'Этот портал предназначен для владельца Апарт-отеля Diamant Blue. Здесь вы можете проверить статус продаж, подписать договор эксклюзивности и связаться с вашим агентом.', own_view_contract: 'Просмотреть и подписать договор эксклюзивности', own_view_status: 'Статус апартаментов', own_contact_agent: 'Связаться с агентом',
}

// For other languages, create based on English with key terms translated
const de: T = { ...en, fig_beachfront_val: 'Strandlage', loc_mediterranean: 'Mittelmeerblick', nav_apartments: 'Wohnungen', nav_location: 'Lage', nav_gallery: 'Galerie', nav_contact: 'Kontakt', nav_reserve: 'Reservieren', hero_exclusive: 'Exklusiver Verkauf — Cabo Roig, Orihuela Costa', hero_desc: '12 exklusive Apartments in den Etagen 3 und 4 des legendären Aparthotels Diamant Blue. Strandlage im Herzen von Cabo Roig.', hero_discover: 'Apartments entdecken', hero_reserve: 'Jetzt reservieren', fig_apartments: 'Wohnungen', fig_avg_price: 'Durchschnittspreis', fig_sqm: 'Quadratmeter', fig_beachfront: 'Strandlage', about_title_1: 'Eine', about_title_2: 'privilegierte Lage', about_p3: 'Exklusivvermarktung durch', about_see_apts: 'Apartments ansehen', about_contract: 'Exklusivvertrag', apts_title_1: 'Unsere', apts_title_2: 'Wohnungen', apts_floor: 'Etage', apts_from: 'Ab', apts_available: 'Verfügbar', apts_reserved: 'Reserviert', apts_sold: 'Verkauft', apts_bed: 'Schlafz.', apts_bath: 'Bad', apts_view_detail: 'Details', cnt_title_1: 'Interessiert?', cnt_reserve_apt: 'Apartment reservieren', cnt_interested: 'Interessent / Besichtigungen', det_reserve_this: 'Dieses Apartment reservieren', det_request_visit: 'Besichtigung anfragen', det_back_all: 'Zurück zu allen Apartments', res_title_1: 'Reservieren', res_title_2: 'Apartment', res_continue: 'Weiter', res_back: 'Zurück', res_pay: 'Bezahlen', res_name: 'Vorname', res_surname: 'Nachname', res_phone: 'Telefon', res_address: 'Adresse', own_title: 'Eigentümerportal', own_welcome: 'Willkommen', own_view_contract: 'Exklusivvertrag ansehen und unterschreiben', own_view_status: 'Apartmentstatus ansehen', own_contact_agent: 'Agent kontaktieren' }

const fr: T = { ...en, fig_beachfront_val: 'Front de mer', loc_mediterranean: 'Vues sur la Méditerranée', nav_apartments: 'Appartements', nav_location: 'Emplacement', nav_gallery: 'Galerie', nav_contact: 'Contact', nav_reserve: 'Réserver', hero_exclusive: 'Vente exclusive — Cabo Roig, Orihuela Costa', hero_desc: '12 appartements exclusifs aux 3ème et 4ème étages de l\'emblématique Aparthotel Diamant Blue. Front de mer au cœur de Cabo Roig.', hero_discover: 'Découvrir les appartements', hero_reserve: 'Réserver maintenant', fig_apartments: 'Appartements', fig_avg_price: 'Prix moyen', fig_sqm: 'Mètres carrés', fig_beachfront: 'Front de mer', about_title_1: 'Un emplacement', about_title_2: 'privilégié', about_p3: 'Commercialisation exclusive par', about_see_apts: 'Voir appartements', about_contract: 'Contrat d\'exclusivité', apts_title_1: 'Nos', apts_title_2: 'Appartements', apts_floor: 'Étage', apts_from: 'Depuis', apts_available: 'Disponible', apts_reserved: 'Réservé', apts_sold: 'Vendu', apts_bed: 'ch.', apts_bath: 'sdb', apts_view_detail: 'Voir détails', cnt_title_1: 'Intéressé?', cnt_reserve_apt: 'Réserver un appartement', det_reserve_this: 'Réserver cet appartement', det_request_visit: 'Demander une visite', det_back_all: 'Retour aux appartements', res_title_1: 'Réserver', res_title_2: 'appartement', res_continue: 'Continuer', res_back: 'Retour', res_pay: 'Payer', res_name: 'Prénom', res_surname: 'Nom', res_phone: 'Téléphone', res_address: 'Adresse', own_title: 'Portail Propriétaire', own_welcome: 'Bienvenue', own_view_contract: 'Voir et signer le contrat d\'exclusivité', own_view_status: 'Voir le statut des appartements', own_contact_agent: 'Contacter l\'agent' }

const it: T = { ...en, fig_beachfront_val: 'Fronte mare', loc_mediterranean: 'Vista sul Mediterraneo', nav_apartments: 'Appartamenti', nav_location: 'Posizione', nav_gallery: 'Galleria', nav_contact: 'Contatti', nav_reserve: 'Prenota', hero_exclusive: 'Vendita esclusiva — Cabo Roig, Orihuela Costa', hero_desc: '12 appartamenti esclusivi ai piani 3 e 4 dell\'iconico Aparthotel Diamant Blue. Prima linea di spiaggia nel cuore di Cabo Roig.', hero_discover: 'Scopri gli appartamenti', hero_reserve: 'Prenota ora', fig_apartments: 'Appartamenti', fig_avg_price: 'Prezzo medio', fig_sqm: 'Metri quadri', fig_beachfront: 'Fronte mare', about_title_1: 'Una posizione', about_title_2: 'privilegiata', about_p3: 'Commercializzazione esclusiva da', about_see_apts: 'Vedi appartamenti', about_contract: 'Contratto di esclusiva', apts_title_1: 'I nostri', apts_title_2: 'Appartamenti', apts_floor: 'Piano', apts_from: 'Da', apts_available: 'Disponibile', apts_reserved: 'Prenotato', apts_sold: 'Venduto', apts_bed: 'cam.', apts_bath: 'bagno', apts_view_detail: 'Dettagli', cnt_title_1: 'Interessato?', cnt_reserve_apt: 'Prenota appartamento', det_reserve_this: 'Prenota questo appartamento', det_request_visit: 'Richiedi visita', det_back_all: 'Torna a tutti gli appartamenti', res_title_1: 'Prenota', res_title_2: 'appartamento', res_continue: 'Continua', res_back: 'Indietro', res_pay: 'Pagare', res_name: 'Nome', res_surname: 'Cognome', res_phone: 'Telefono', res_address: 'Indirizzo', own_title: 'Portale Proprietario', own_welcome: 'Benvenuto', own_view_contract: 'Visualizza e firma il contratto di esclusiva', own_view_status: 'Stato degli appartamenti', own_contact_agent: 'Contatta l\'agente' }

const nl: T = { ...en, fig_beachfront_val: 'Aan het strand', loc_mediterranean: 'Uitzicht op de Middellandse Zee', nav_apartments: 'Appartementen', nav_location: 'Locatie', nav_gallery: 'Galerij', nav_contact: 'Contact', nav_reserve: 'Reserveren', hero_exclusive: 'Exclusieve verkoop — Cabo Roig, Orihuela Costa', hero_desc: '12 exclusieve appartementen op de 3e en 4e verdieping van het iconische Aparthotel Diamant Blue. Aan het strand in het hart van Cabo Roig.', hero_discover: 'Ontdek appartementen', hero_reserve: 'Nu reserveren', fig_apartments: 'Appartementen', fig_avg_price: 'Gemiddelde prijs', fig_sqm: 'Vierkante meters', fig_beachfront: 'Aan het strand', apts_title_1: 'Onze', apts_title_2: 'Appartementen', apts_floor: 'Verdieping', apts_available: 'Beschikbaar', apts_reserved: 'Gereserveerd', apts_sold: 'Verkocht', apts_bed: 'slk', apts_bath: 'bad', apts_view_detail: 'Details', cnt_title_1: 'Geïnteresseerd?', cnt_reserve_apt: 'Reserveer appartement', det_reserve_this: 'Reserveer dit appartement', det_back_all: 'Terug naar alle appartementen', res_title_1: 'Reserveer', res_title_2: 'appartement', res_continue: 'Doorgaan', res_back: 'Terug', res_pay: 'Betalen', res_name: 'Voornaam', res_surname: 'Achternaam', own_title: 'Eigenaar Portaal', own_welcome: 'Welkom' }

const ro: T = { ...en, nav_apartments: 'Apartamente', nav_location: 'Locație', nav_gallery: 'Galerie', nav_contact: 'Contact', nav_reserve: 'Rezervă', hero_exclusive: 'Vânzare exclusivă — Cabo Roig, Orihuela Costa', hero_desc: '12 apartamente exclusive la etajele 3 și 4 ale celebrului Aparthotel Diamant Blue. Pe malul mării, în inima Cabo Roig.', hero_discover: 'Descoperă apartamentele', hero_reserve: 'Rezervă acum', fig_apartments: 'Apartamente', fig_avg_price: 'Preț mediu', fig_sqm: 'Metri pătrați', fig_beachfront: 'Pe plajă', apts_title_1: 'Apartamentele', apts_title_2: 'noastre', apts_floor: 'Etaj', apts_available: 'Disponibil', apts_reserved: 'Rezervat', apts_sold: 'Vândut', apts_bed: 'dorm.', apts_bath: 'baie', apts_view_detail: 'Detalii', cnt_title_1: 'Interesat?', cnt_reserve_apt: 'Rezervă apartament', det_reserve_this: 'Rezervă acest apartament', det_back_all: 'Înapoi la toate apartamentele', res_title_1: 'Rezervă', res_title_2: 'apartament', res_continue: 'Continuă', res_back: 'Înapoi', res_pay: 'Plătește', res_name: 'Prenume', res_surname: 'Nume', own_title: 'Portal Proprietar', own_welcome: 'Bun venit' }

const uk: T = { ...en, nav_apartments: 'Апартаменти', nav_location: 'Розташування', nav_gallery: 'Галерея', nav_contact: 'Контакти', nav_reserve: 'Бронювати', hero_exclusive: 'Ексклюзивний продаж — Кабо Роїг, Оріуела Коста', hero_desc: '12 ексклюзивних апартаментів на 3 та 4 поверхах легендарного Апарт-готелю Diamant Blue. На першій лінії пляжу в серці Кабо Роїг.', hero_discover: 'Дивитись апартаменти', hero_reserve: 'Забронювати зараз', fig_apartments: 'Апартаменти', fig_avg_price: 'Середня ціна', fig_sqm: 'Квадратні метри', fig_beachfront: 'Перша лінія', apts_title_1: 'Наші', apts_title_2: 'Апартаменти', apts_floor: 'Поверх', apts_available: 'Доступний', apts_reserved: 'Заброньований', apts_sold: 'Проданий', apts_bed: 'спал.', apts_bath: 'ванн.', apts_view_detail: 'Детальніше', cnt_title_1: 'Зацікавлені?', cnt_reserve_apt: 'Забронювати апартамент', det_reserve_this: 'Забронювати цей апартамент', det_back_all: 'Назад до всіх апартаментів', res_title_1: 'Забронювати', res_title_2: 'апартамент', res_continue: 'Продовжити', res_back: 'Назад', res_pay: 'Оплатити', res_name: 'Ім\'я', res_surname: 'Прізвище', own_title: 'Портал Власника', own_welcome: 'Ласкаво просимо' }

const pt: T = { ...en, nav_apartments: 'Apartamentos', nav_location: 'Localização', nav_gallery: 'Galeria', nav_contact: 'Contacto', nav_reserve: 'Reservar', hero_discover: 'Descobrir apartamentos', hero_reserve: 'Reservar agora', fig_apartments: 'Apartamentos', fig_avg_price: 'Preço médio', fig_sqm: 'Metros quadrados', fig_beachfront: 'Frente ao mar', apts_title_1: 'Os nossos', apts_title_2: 'Apartamentos', apts_available: 'Disponível', apts_reserved: 'Reservado', apts_sold: 'Vendido', cnt_title_1: 'Interessado?', res_title_1: 'Reservar', res_title_2: 'apartamento', res_continue: 'Continuar', res_back: 'Voltar', res_pay: 'Pagar', own_title: 'Portal do Proprietário', own_welcome: 'Bem-vindo' }

const sv: T = { ...en, nav_apartments: 'Lägenheter', nav_location: 'Läge', nav_gallery: 'Galleri', nav_contact: 'Kontakt', nav_reserve: 'Boka', hero_discover: 'Upptäck lägenheter', hero_reserve: 'Boka nu', apts_title_1: 'Våra', apts_title_2: 'Lägenheter', apts_available: 'Tillgänglig', apts_reserved: 'Bokad', apts_sold: 'Såld', cnt_title_1: 'Intresserad?', res_title_1: 'Boka', res_title_2: 'lägenhet', res_continue: 'Fortsätt', res_back: 'Tillbaka', res_pay: 'Betala', own_title: 'Ägarportal', own_welcome: 'Välkommen' }

const no: T = { ...en, nav_apartments: 'Leiligheter', nav_reserve: 'Bestill', hero_discover: 'Oppdage leiligheter', hero_reserve: 'Bestill nå', apts_title_1: 'Våre', apts_title_2: 'Leiligheter', apts_available: 'Tilgjengelig', cnt_title_1: 'Interessert?', res_title_1: 'Bestill', res_title_2: 'leilighet', own_title: 'Eierportal', own_welcome: 'Velkommen' }

const da: T = { ...en, nav_apartments: 'Lejligheder', nav_reserve: 'Reservér', hero_discover: 'Opdag lejligheder', apts_title_1: 'Vores', apts_title_2: 'Lejligheder', apts_available: 'Tilgængelig', cnt_title_1: 'Interesseret?', res_title_1: 'Reservér', res_title_2: 'lejlighed', own_title: 'Ejerportal', own_welcome: 'Velkommen' }

const fi: T = { ...en, nav_apartments: 'Asunnot', nav_reserve: 'Varaa', hero_discover: 'Tutustu asuntoihin', apts_title_1: 'Meidän', apts_title_2: 'Asunnot', apts_available: 'Saatavilla', cnt_title_1: 'Kiinnostunut?', res_title_1: 'Varaa', res_title_2: 'asunto', own_title: 'Omistajan portaali', own_welcome: 'Tervetuloa' }

const pl: T = { ...en, nav_apartments: 'Apartamenty', nav_location: 'Lokalizacja', nav_gallery: 'Galeria', nav_contact: 'Kontakt', nav_reserve: 'Rezerwuj', hero_discover: 'Odkryj apartamenty', hero_reserve: 'Zarezerwuj teraz', apts_title_1: 'Nasze', apts_title_2: 'Apartamenty', apts_available: 'Dostępny', apts_reserved: 'Zarezerwowany', apts_sold: 'Sprzedany', cnt_title_1: 'Zainteresowany?', res_title_1: 'Zarezerwuj', res_title_2: 'apartament', res_continue: 'Kontynuuj', res_back: 'Wstecz', res_pay: 'Zapłać', own_title: 'Portal Właściciela', own_welcome: 'Witamy' }

const cs: T = { ...en, nav_apartments: 'Byty', nav_reserve: 'Rezervovat', hero_discover: 'Objevte byty', apts_title_1: 'Naše', apts_title_2: 'Byty', apts_available: 'Dostupný', cnt_title_1: 'Máte zájem?', res_title_1: 'Rezervovat', res_title_2: 'byt', own_title: 'Portál vlastníka', own_welcome: 'Vítejte' }

const ar: T = { ...en, nav_apartments: 'شقق', nav_location: 'الموقع', nav_gallery: 'معرض', nav_contact: 'اتصل', nav_reserve: 'احجز', hero_discover: 'اكتشف الشقق', hero_reserve: 'احجز الآن', apts_title_1: 'شققنا', apts_title_2: '', apts_available: 'متاح', apts_reserved: 'محجوز', apts_sold: 'مباع', cnt_title_1: 'مهتم؟', res_title_1: 'احجز', res_title_2: 'شقة', own_title: 'بوابة المالك', own_welcome: 'مرحبا' }

const zh: T = { ...en, nav_apartments: '公寓', nav_location: '位置', nav_gallery: '画廊', nav_contact: '联系', nav_reserve: '预订', hero_discover: '发现公寓', hero_reserve: '立即预订', apts_title_1: '我们的', apts_title_2: '公寓', apts_available: '可用', apts_reserved: '已预订', apts_sold: '已售', cnt_title_1: '感兴趣？', res_title_1: '预订', res_title_2: '公寓', own_title: '业主门户', own_welcome: '欢迎' }

export const translations: Record<Lang, T> = { es, en, ru, de, fr, it, nl, ro, uk, pt, sv, no, da, fi, pl, cs, ar, zh }
