export const NEGOCIO = {
  nombre: 'FabalStudio',
  eslogan: 'Cortes de precisión, estilo sin compromiso.',
  whatsapp: '51924428381',
  direccion: 'Av. Grau 123, Piura, Perú',
  horario: 'Lun a Sáb, 9:00 am – 8:00 pm',
  instagram: '@fabalstudio',
  instagramUrl: 'https://www.instagram.com/fabalstudio/',
  mapaEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.4509864939568!2d-80.69440043639254!3d-4.903517916537722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9035fbdc84ea6fb1%3A0xb1e47216b53a2287!2sSta.%20Julia%2C%20Sullana!5e0!3m2!1ses-419!2spe!4v1783817334684!5m2!1ses-419!2spe',
}

export const mensajeWhatsappGeneral =
  `Hola ${NEGOCIO.nombre}, quisiera más información sobre sus servicios.`

export function linkWhatsapp(mensaje) {
  const texto = encodeURIComponent(mensaje)
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${texto}`
}