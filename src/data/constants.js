// ────────────────────────────────────────────────────────────
// CONFIGURACIÓN DEL NEGOCIO
// Edita estos valores para personalizar la barbería sin tocar
// el resto del código.
// ────────────────────────────────────────────────────────────

export const NEGOCIO = {
  nombre: 'FabalStudio',
  eslogan: 'Cortes de precisión, estilo sin compromiso.',
  // Número en formato internacional SIN "+" ni espacios (ej. Perú: 51987654321)
  whatsapp: '51924428381',
  direccion: 'Av. Grau 123, Piura, Perú',
  horario: 'Lun a Sáb, 9:00 am – 8:00 pm',
  instagram: '@fabalstudio',
  instagramUrl: 'https://www.instagram.com/fabalstudio/',
}

// Mensaje pre-cargado del botón flotante de WhatsApp
export const mensajeWhatsappGeneral =
  `Hola ${NEGOCIO.nombre}, quisiera más información sobre sus servicios.`

// Construye el link de WhatsApp con un mensaje personalizado
export function linkWhatsapp(mensaje) {
  const texto = encodeURIComponent(mensaje)
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${texto}`
}