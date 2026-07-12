import { NEGOCIO } from '../data/constants'

export default function Nosotros() {
  return (
    <section id="nosotros" className="bg-paper py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div className="aspect-[4/3] bg-ink flex items-center justify-center order-2 md:order-1">
          <svg viewBox="0 0 64 64" width="72" height="72" fill="none">
            <path d="M14 44 L40 18 L46 24 L20 50 Z" fill="#F3ECDC" />
            <circle cx="46" cy="18" r="6" fill="#F3ECDC" />
          </svg>
        </div>

        <div className="order-1 md:order-2">
          <p className="uppercase tracking-widest2 text-sm text-smoke mb-3">Quienes somos</p>
          <h2 className="text-5xl md:text-6xl mb-6">NUESTRO OFICIO</h2>
          <p className="text-lg text-smoke mb-4 normal-case tracking-normal">
            {NEGOCIO.nombre} nacio de una idea simple: un buen corte no se apura.
            Cada cliente que se sienta en nuestro sillon recibe tiempo, tecnica y
            atencion real, no una fila mas que atender.
          </p>
          <p className="text-lg text-smoke normal-case tracking-normal">
            Formamos a nuestro equipo en las tecnicas clasicas de barberia y en las
            tendencias actuales, para que elijas el estilo que quieras con la
            confianza de que se va a ejecutar bien, siempre.
          </p>
        </div>
      </div>
    </section>
  )
}