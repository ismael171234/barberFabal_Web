import { NEGOCIO, linkWhatsapp, mensajeWhatsappGeneral } from '../data/constants'

export default function Contacto() {
  return (
    <section id="contacto" className="bg-paper py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
        <div>
          <p className="uppercase tracking-widest2 text-sm text-smoke mb-3">Visitanos</p>
          <h2 className="text-5xl md:text-6xl mb-10">CONTACTO</h2>

          <dl className="space-y-6 text-lg">
            <div>
              <dt className="text-xs uppercase tracking-widest2 text-smoke mb-1">Direccion</dt>
              <dd>{NEGOCIO.direccion}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest2 text-smoke mb-1">Horario</dt>
              <dd>{NEGOCIO.horario}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest2 text-smoke mb-1">Instagram</dt>
              <dd>
                <a href={NEGOCIO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                  {NEGOCIO.instagram}
                </a>
              </dd>
            </div>
          </dl>

          <a href={linkWhatsapp(mensajeWhatsappGeneral)} target="_blank" rel="noopener noreferrer" className="inline-block mt-10 bg-ink text-paper px-8 py-4 uppercase tracking-widest2 text-sm hover:bg-charcoal transition-colors">
            Escribenos por WhatsApp
          </a>
        </div>

        <div className="aspect-[4/3] border border-line bg-charcoal/5 flex items-center justify-center">
          <p className="text-smoke text-sm uppercase tracking-widest2 px-6 text-center">
            Espacio reservado para mapa de Google Maps
          </p>
        </div>
      </div>
    </section>
  )
}