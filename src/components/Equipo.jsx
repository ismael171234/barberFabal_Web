import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const BARBEROS_DEFAULT = [
  { id: 'b1', nombre: 'Renzo Vílchez', especialidad: 'Degradados y diseño' },
  { id: 'b2', nombre: 'Jorge Salinas', especialidad: 'Afeitado tradicional' },
  { id: 'b3', nombre: 'Diego Morán', especialidad: 'Cortes clásicos' },
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
            <div key={b.id} className="bg-ink p-8">
              <div className="aspect-square bg-charcoal border border-line-dark mb-6 flex items-center justify-center">
                <span className="font-display text-5xl text-smoke">
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
