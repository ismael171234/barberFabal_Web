import { NEGOCIO } from '../data/constants'
import { IconoInstagram } from './Iconos'

export default function Hero() {
  return (
    <section id="inicio" className="relative bg-ink text-paper min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, #F5F3EE 0px, #F5F3EE 1px, transparent 1px, transparent 80px)',
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full px-6 pt-32 pb-20 grid md:grid-cols-[1.3fr,1fr] gap-12 items-end">
        <div>
          <p className="uppercase tracking-widest2 text-sm text-smoke mb-6">
            Barberia tradicional - Sullana, Peru
          </p>
          <h1 className="text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-8">
            EL DETALLE
            <br />
            ES EL ESTILO
          </h1>
          <p className="max-w-md text-smoke text-lg mb-10 font-body normal-case tracking-normal">
            {NEGOCIO.eslogan} Cortes clasicos, degradados de precision y afeitado
            tradicional en {NEGOCIO.direccion}.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#reservar" className="bg-paper text-ink px-8 py-4 uppercase tracking-widest2 text-sm hover:bg-smoke transition-colors">
              Reservar turno
            </a>
            <a href="#servicios" className="border border-paper px-8 py-4 uppercase tracking-widest2 text-sm hover:bg-paper hover:text-ink transition-colors">
              Ver servicios
            </a>
          </div>
        </div>

        <div className="hidden md:block border border-line-dark p-6">
          <p className="text-xs uppercase tracking-widest2 text-smoke mb-4">Horario</p>
          <p className="text-2xl mb-6">{NEGOCIO.horario}</p>
          <div className="h-px bg-line-dark mb-6" />
          <p className="text-xs uppercase tracking-widest2 text-smoke mb-4">Siguenos</p>
          <a href={NEGOCIO.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-2xl hover:opacity-70 transition-opacity">
            <IconoInstagram className="w-5 h-5 shrink-0" />
            {NEGOCIO.instagram}
          </a>
        </div>
      </div>
    </section>
  )
}