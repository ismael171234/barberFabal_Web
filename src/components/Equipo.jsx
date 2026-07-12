import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const BARBEROS_DEFAULT = [
  { id: 'b1', nombre: 'Renzo Vilchez', especialidad: 'Degradados y diseno' },
  { id: 'b2', nombre: 'Jorge Salinas', especialidad: 'Afeitado tradicional' },
  { id: 'b3', nombre: 'Diego Moran', especialidad: 'Cortes clasicos' },
]

export default function Equipo() {
  const [barberos, setBarberos] = useState(BARBEROS_DEFAULT)

  useEffect(() => {
    let activo = true
    supabase
      .from('barberos')
      .select('*')
      .then(({ data, error }) => {
        if (!activo) return
        if (!error && data && data.length > 0) setBarberos(data)
      })
    return () => { activo = false }
  }, [])

  return (
    <section id="equipo" className="bg-ink text-paper py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase tracking-widest2 text-sm text-smoke mb-3">El equipo</p>
        <h2 className="text-5xl md:text-6xl mb-14">BARBEROS</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-line-dark">
          {barberos.map((b) => (
            <div key={b.id} className="group bg-ink p-8 transition-all duration-300 hover:bg-charcoal hover:-translate-y-1">
              <div className="aspect-square bg-charcoal border border-line-dark mb-6 flex items-center justify-center overflow-hidden">
                <span className="font-display text-5xl text-smoke transition-transform duration-500 group-hover:scale-110">
                  {b.nombre.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-2xl mb-1">{b.nombre}</h3>
              <p className="text-smoke text-sm">{b.especialidad}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}