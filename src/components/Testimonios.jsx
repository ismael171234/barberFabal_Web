import { useEffect, useRef, useState } from 'react'

const TESTIMONIOS = [
  {
    nombre: 'Marco A.',
    texto: 'Voy hace mas de un ano y nunca he salido sin el corte que pedi. Se nota la tecnica.',
  },
  {
    nombre: 'Luis F.',
    texto: 'El afeitado con navaja es otro nivel. Ambiente tranquilo, buena musica, cero apuro.',
  },
  {
    nombre: 'Diego R.',
    texto: 'Reserve por WhatsApp y me confirmaron al toque. Llegue y ya estaba todo listo.',
  },
  {
    nombre: 'Andres P.',
    texto: 'Llevo a mi hijo desde los 5 anos. Tienen paciencia y el resultado siempre es bueno.',
  },
]

export default function Testimonios() {
  const [indice, setIndice] = useState(0)
  const [visible, setVisible] = useState(true)
  const pausado = useRef(false)

  function cambiarA(nuevoIndice) {
    setVisible(false)
    setTimeout(() => {
      setIndice(nuevoIndice)
      setVisible(true)
    }, 220)
  }

  function anterior() {
    cambiarA(indice === 0 ? TESTIMONIOS.length - 1 : indice - 1)
  }
  function siguiente() {
    cambiarA(indice === TESTIMONIOS.length - 1 ? 0 : indice + 1)
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (!pausado.current) siguiente()
    }, 6000)
    return () => clearInterval(intervalo)
  })

  const actual = TESTIMONIOS[indice]

  return (
    <section
      className="bg-ink text-paper py-24 px-6"
      onMouseEnter={() => (pausado.current = true)}
      onMouseLeave={() => (pausado.current = false)}
    >
      <div className="max-w-3xl mx-auto text-center">
        <p className="uppercase tracking-widest2 text-sm text-smoke mb-3">Lo que dicen</p>
        <h2 className="text-5xl md:text-6xl mb-14">TESTIMONIOS</h2>

        <blockquote
          className="min-h-[140px] flex flex-col items-center justify-center transition-all duration-300"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(10px)' }}
        >
          <p className="text-2xl md:text-3xl leading-snug mb-6 normal-case tracking-normal">
            "{actual.texto}"
          </p>
          <cite className="text-sm uppercase tracking-widest2 text-smoke not-italic">
            {actual.nombre}
          </cite>
        </blockquote>

        <div className="flex items-center justify-center gap-6 mt-12">
          <button onClick={anterior} aria-label="Testimonio anterior" className="w-10 h-10 border border-line-dark flex items-center justify-center transition-all duration-300 hover:bg-paper hover:text-ink hover:-translate-y-0.5">
            ←
          </button>
          <div className="flex gap-2">
            {TESTIMONIOS.map((_, i) => (
              <button
                key={i}
                onClick={() => cambiarA(i)}
                aria-label={`Ir al testimonio ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${i === indice ? 'bg-paper w-6' : 'bg-line-dark w-2 hover:bg-smoke'}`}
              />
            ))}
          </div>
          <button onClick={siguiente} aria-label="Siguiente testimonio" className="w-10 h-10 border border-line-dark flex items-center justify-center transition-all duration-300 hover:bg-paper hover:text-ink hover:-translate-y-0.5">
            →
          </button>
        </div>
      </div>
    </section>
  )
}