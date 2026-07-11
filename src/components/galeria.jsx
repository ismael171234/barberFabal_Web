const ITEMS_GALERIA = [
  { titulo: 'Corte clásico', imagen: '/galeria/corteclasico.jpeg' },
  { titulo: 'Afeitado y diseño de barba', imagen: '/galeria/afeitadoconbarba.png' },
  { titulo: 'Corte texturizado', imagen: '/galeria/cortetexturizado.png' },
  { titulo: 'Línea de contorno', imagen: '/galeria/lineadecontorno.png' },
  { titulo: 'Corte infantil', imagen: '/galeria/corteinfantil.png' },
]

export default function Galeria() {
  return (
    <section id="galeria" className="bg-paper py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase tracking-widest2 text-sm text-smoke mb-3">Nuestro trabajo</p>
        <h2 className="text-5xl md:text-6xl mb-14">GALERÍA</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-1">
          {ITEMS_GALERIA.map((item) => (
            <div
              key={item.titulo}
              className="aspect-square relative overflow-hidden group"
            >
              <img
                src={item.imagen}
                alt={item.titulo}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 text-paper text-sm uppercase tracking-widest2">
                {item.titulo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}