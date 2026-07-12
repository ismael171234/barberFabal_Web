const PILARES = [
  {
    titulo: 'Cercania',
    texto: 'Te conocemos por tu nombre, no por un numero de ticket.',
  },
  {
    titulo: 'Precision',
    texto: 'Cada linea, cada degradado, medido antes de cortar.',
  },
  {
    titulo: 'Confianza',
    texto: 'Herramientas desinfectadas y protocolos claros en cada turno.',
  },
  {
    titulo: 'Pasion por el oficio',
    texto: 'La barberia es tradicion y la tratamos como tal, con orgullo.',
  },
]

export default function Pilares() {
  return (
    <section className="bg-ink text-paper py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase tracking-widest2 text-sm text-smoke mb-3">Lo que nos define</p>
        <h2 className="text-5xl md:text-6xl mb-14">NUESTROS PILARES</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-line-dark">
          {PILARES.map((p, i) => (
            <div key={p.titulo} className="group bg-ink p-8 transition-all duration-300 hover:bg-charcoal hover:-translate-y-1">
              <span className="text-xs text-smoke inline-block transition-transform duration-300 group-hover:scale-125 group-hover:text-laton">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-2xl my-4">{p.titulo}</h3>
              <p className="text-sm text-smoke normal-case tracking-normal">{p.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}