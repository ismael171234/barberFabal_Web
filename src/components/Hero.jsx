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

      <div
        className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,243,238,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto w-full px-6 pt-32 pb-24 grid md:grid-cols-[1.3fr,1fr] gap-12 items-end">
        <div>
          <p className="hero-anim uppercase tracking-widest2 text-sm text-smoke mb-6" style={{ animationDelay: '0ms' }}>
            Barberia tradicional - Sullana, Peru
          </p>
          <h1 className="hero-anim text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-8" style={{ animationDelay: '120ms' }}>
            EL DETALLE
            <br />
            ES EL ESTILO
          </h1>
          <p className="hero-anim max-w-md text-smoke text-lg mb-10 font-body normal-case tracking-normal" style={{ animationDelay: '260ms' }}>
            {NEGOCIO.eslogan} Cortes clasicos, degradados de precision y afeitado
            tradicional en {NEGOCIO.direccion}.
          </p>
          <div className="hero-anim flex flex-wrap gap-4" style={{ animationDelay: '400ms' }}>
            <a href="#reservar" className="btn-solido bg-paper text-ink hover:bg-smoke">
              Reservar turno
            </a>
            <a href="#servicios" className="btn-contorno text-paper">
              <span>Ver servicios</span>
            </a>
          </div>
        </div>

        <div className="hero-anim hidden md:block border border-line-dark p-6" style={{ animationDelay: '520ms' }}>
          <p className="text-xs uppercase tracking-widest2 text-smoke mb-4">Horario</p>
          <p className="text-2xl mb-6">{NEGOCIO.horario}</p>
          <div className="h-px bg-line-dark mb-6" />
          <p className="text-xs uppercase tracking-widest2 text-smoke mb-4">Siguenos</p>
          <a href={NEGOCIO.instagramUrl} target="_blank" rel="noopener noreferrer" className="link-subrayado flex items-center gap-2 text-2xl w-fit hover:opacity-80 transition-opacity">
            <IconoInstagram className="w-5 h-5 shrink-0" />
            {NEGOCIO.instagram}
          </a>
        </div>
      </div>

      <a href="#nosotros" aria-label="Bajar a la siguiente seccion" className="scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 text-paper/60 hover:text-paper transition-colors">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 4v16M6 14l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  )
}