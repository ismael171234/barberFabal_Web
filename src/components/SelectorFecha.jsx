import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const DIAS = ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA']
const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

function aISO(fecha) {
  const y = fecha.getFullYear()
  const m = String(fecha.getMonth() + 1).padStart(2, '0')
  const d = String(fecha.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function desdeISO(iso) {
  if (!iso) return null
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export default function SelectorFecha({ value, onChange, min }) {
  const [abierto, setAbierto] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 288 })
  const fechaSeleccionada = desdeISO(value)
  const fechaMin = desdeISO(min) || new Date()
  const [mesVisible, setMesVisible] = useState(() => fechaSeleccionada || fechaMin)
  const botonRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    function onClickFuera(e) {
      const dentroDelBoton = botonRef.current && botonRef.current.contains(e.target)
      const dentroDelPanel = panelRef.current && panelRef.current.contains(e.target)
      if (!dentroDelBoton && !dentroDelPanel) setAbierto(false)
    }
    document.addEventListener('mousedown', onClickFuera)
    return () => document.removeEventListener('mousedown', onClickFuera)
  }, [])

  useEffect(() => {
    if (!abierto) return
    function cerrarAlDesplazar() {
      setAbierto(false)
    }
    window.addEventListener('scroll', cerrarAlDesplazar, true)
    window.addEventListener('resize', cerrarAlDesplazar)
    return () => {
      window.removeEventListener('scroll', cerrarAlDesplazar, true)
      window.removeEventListener('resize', cerrarAlDesplazar)
    }
  }, [abierto])

  function abrirCalendario() {
    if (botonRef.current) {
      const r = botonRef.current.getBoundingClientRect()
      setCoords({ top: r.bottom + 8, left: r.left, width: Math.max(r.width, 280) })
    }
    setAbierto((v) => !v)
  }

  const anio = mesVisible.getFullYear()
  const mes = mesVisible.getMonth()
  const primerDiaSemana = new Date(anio, mes, 1).getDay()
  const diasEnMes = new Date(anio, mes + 1, 0).getDate()

  const celdas = []
  for (let i = 0; i < primerDiaSemana; i++) celdas.push(null)
  for (let d = 1; d <= diasEnMes; d++) celdas.push(new Date(anio, mes, d))

  function esAntesDeMin(fecha) {
    const f = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate())
    const m = new Date(fechaMin.getFullYear(), fechaMin.getMonth(), fechaMin.getDate())
    return f < m
  }

  function elegir(fecha) {
    if (esAntesDeMin(fecha)) return
    onChange(aISO(fecha))
    setAbierto(false)
  }

  function cambiarMes(delta) {
    setMesVisible(new Date(anio, mes + delta, 1))
  }

  const textoMostrado = fechaSeleccionada
    ? fechaSeleccionada.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Selecciona una fecha'

  return (
    <>
      <button ref={botonRef} type="button" onClick={abrirCalendario} className="campo-input flex items-center justify-between text-left">
        <span className={fechaSeleccionada ? '' : 'text-smoke/70'}>{textoMostrado}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-laton">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
        </svg>
      </button>

      {abierto && createPortal(
        <div
          ref={panelRef}
          style={{ position: 'fixed', top: coords.top, left: coords.left, width: coords.width }}
          className="z-[999] bg-paper border border-line shadow-xl p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={() => cambiarMes(-1)} className="w-8 h-8 flex items-center justify-center hover:text-laton transition-colors" aria-label="Mes anterior">
              ←
            </button>
            <span className="text-sm uppercase tracking-widest2">{MESES[mes]} {anio}</span>
            <button type="button" onClick={() => cambiarMes(1)} className="w-8 h-8 flex items-center justify-center hover:text-laton transition-colors" aria-label="Mes siguiente">
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {DIAS.map((d) => (
              <span key={d} className="text-[10px] text-center text-smoke uppercase tracking-wide">{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {celdas.map((fecha, i) => {
              if (!fecha) return <span key={i} />
              const deshabilitado = esAntesDeMin(fecha)
              const seleccionado = fechaSeleccionada && aISO(fecha) === aISO(fechaSeleccionada)
              return (
                <button
                  key={i}
                  type="button"
                  disabled={deshabilitado}
                  onClick={() => elegir(fecha)}
                  className={`h-8 text-sm transition-colors ${
                    seleccionado ? 'bg-ink text-paper' : deshabilitado ? 'text-smoke/30 cursor-not-allowed' : 'hover:bg-laton hover:text-ink'
                  }`}
                >
                  {fecha.getDate()}
                </button>
              )
            })}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}