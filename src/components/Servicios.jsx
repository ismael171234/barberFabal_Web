import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const SERVICIOS_DEFAULT = [
  { id: 'd1', nombre: 'Corte clasico', descripcion: 'Tijera y maquina, acabado pulido.', precio: 25, duracion_min: 30 },
  { id: 'd2', nombre: 'Degradado (fade)', descripcion: 'Transicion perfecta, diseno a detalle.', precio: 30, duracion_min: 40 },
  { id: 'd3', nombre: 'Afeitado tradicional', descripcion: 'Navaja, toalla caliente y espuma.', precio: 20, duracion_min: 25 },
  { id: 'd4', nombre: 'Corte + barba', descripcion: 'Servicio completo, perfilado incluido.', precio: 40, duracion_min: 50 },
  { id: 'd5', nombre: 'Diseno de barba', descripcion: 'Perfilado con navaja y linea definida.', precio: 18, duracion_min: 20 },
  { id: 'd6', nombre: 'Corte infantil', descripcion: 'Para los mas pequenos, con paciencia.', precio: 20, duracion_min: 30 },
]

export default function Servicios({ onElegirServicio }) {
  const [servicios, setServicios] = useState(SERVICIOS_DEFAULT)

  useEffect(() => {
    let activo = true

    async function cargarServicios() {
      const { data, error } = await supabase
        .from('servicios')
        .select('*')
        .order('precio', { ascending: true })

      if (!activo) return
      if (error) {
        console.warn('[Supabase] No se pudieron cargar servicios, usando valores por defecto:', error.message)
        return
      }
      if (data && data.length > 0) setServicios(data)
    }

    cargarServicios()

    const canal = supabase
      .channel('servicios-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'servicios' }, cargarServicios)
      .subscribe()

    return () => {
      activo = false
      supabase.removeChannel(canal)
    }
  }, [])

  return (
    <section id="servicios" className="bg-paper py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="uppercase tracking-widest2 text-sm text-smoke mb-3">La carta</p>
        <h2 className="text-5xl md:text-6xl mb-14">SERVICIOS</h2>

        <ul>
          {servicios.map((s, i) => (
            <li key={s.id}>
              <button onClick={() => onElegirServicio?.(s)} className="w-full text-left group py-6 border-t border-line last:border-b flex items-baseline gap-4 hover:bg-ink hover:text-paper transition-colors px-2 -mx-2">
                <span className="text-xs text-laton group-hover:text-laton w-6 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-2xl md:text-3xl font-display tracking-wide shrink-0">
                  {s.nombre}
                </span>
                <span className="flex-1 border-b border-dotted border-smoke/50 mx-3 mb-2 hidden sm:block" />
                <span className="text-sm text-smoke group-hover:text-paper/70 hidden md:block max-w-[220px] shrink-0">
                  {s.descripcion}
                </span>
                <span className="text-2xl font-display shrink-0">S/ {s.precio}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="text-xs text-smoke mt-6">Toca un servicio para reservarlo directamente.</p>
      </div>
    </section>
  )
}