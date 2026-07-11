import { useState } from 'react'

const TESTIMONIOS = [
  {
    nombre: 'Marco A.',
    texto: 'Voy hace más de un año y nunca he salido sin el corte que pedí. Se nota la técnica.',
  },
  {
    nombre: 'Luis F.',
    texto: 'El afeitado con navaja es otro nivel. Ambiente tranquilo, buena música, cero apuro.',
  },
  {
    nombre: 'Diego R.',
    texto: 'Reservé por WhatsApp y me confirmaron al toque. Llegué y ya estaba todo listo.',
  },
  {
    nombre: 'Andrés P.',
    texto: 'Llevo a mi hijo desde los 5 años. Tienen paciencia y el resultado siempre es bueno.',
  },
]

export default function Testimonios() {
  const [indice, setIndice] = useState(0)

  function anterior() {
    setIndice((i) => (i === 0 ? TESTIMONIOS.length - 1 : i - 1))
  }
  function siguiente() {
    setIndice((i) => (i === TESTIMONIOS.length - 1 ? 0 : i + 1))
  }

  const actual = TESTIMONIOS[indice]

  return (
    <section className="bg-ink text-paper py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="uppercase tracking-widest2 text-sm text-smoke mb-3">Lo que dicen</p>
        <h2 className="text-5xl md:text-6xl mb-14">TESTIMONIOS</h2>

        <blockquote className="min-h-[140px] flex flex-col items-center justify-center">
          <p className="text-2xl md:text-3xl leading-snug mb-6 normal-case tracking-normal">
            "{actual.texto}"
          </p>
          <cite className="text-sm uppercase tracking-widest2 text-smoke not-italic">
            {actual.nombre}
          </cite>
        </blockquote>

        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={anterior}
            aria-label="Testimonio anterior"
            className="w-10 h-10 border border-line-dark flex items-center justify-center hover:bg-paper hover:text-ink transition-colors"
          >
            ←
          </button>
          <div className="flex gap-2">
            {TESTIMONIOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndice(i)}
                aria-label={`Ir al testimonio ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === indice ? 'bg-paper' : 'bg-line-dark'
                }`}
              />
            ))}
          </div>
          <button
            onClick={siguiente}
            aria-label="Siguiente testimonio"
            className="w-10 h-10 border border-line-dark flex items-center justify-center hover:bg-paper hover:text-ink transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
