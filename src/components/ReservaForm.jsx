import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../supabaseClient'
import { NEGOCIO, linkWhatsapp } from '../data/constants'

const SERVICIOS_DEFAULT = [
  { id: 'd1', nombre: 'Corte clasico', precio: 25 },
  { id: 'd2', nombre: 'Degradado (fade)', precio: 30 },
  { id: 'd3', nombre: 'Afeitado tradicional', precio: 20 },
  { id: 'd4', nombre: 'Corte + barba', precio: 40 },
  { id: 'd5', nombre: 'Diseno de barba', precio: 18 },
  { id: 'd6', nombre: 'Corte infantil', precio: 20 },
]

const BARBEROS_DEFAULT = [
  { id: 'b1', nombre: 'Renzo Vilchez' },
  { id: 'b2', nombre: 'Jorge Salinas' },
  { id: 'b3', nombre: 'Diego Moran' },
]

function hoyISO() {
  return new Date().toISOString().split('T')[0]
}

export default function ReservaForm({ servicioPreseleccionado }) {
  const [servicios, setServicios] = useState(SERVICIOS_DEFAULT)
  const [barberos, setBarberos] = useState(BARBEROS_DEFAULT)

  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    servicioId: '',
    barberoId: '',
    fecha: '',
    hora: '',
    tipoAtencion: 'local',
    direccion: '',
  })
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [ticket, setTicket] = useState(null)

  useEffect(() => {
    supabase.from('servicios').select('*').order('precio').then(({ data, error }) => {
      if (!error && data?.length) setServicios(data)
    })
    supabase.from('barberos').select('*').then(({ data, error }) => {
      if (!error && data?.length) setBarberos(data)
    })
  }, [])

  useEffect(() => {
    if (servicioPreseleccionado) {
      setForm((f) => ({ ...f, servicioId: String(servicioPreseleccionado.id) }))
    }
  }, [servicioPreseleccionado])

  const servicioElegido = useMemo(
    () => servicios.find((s) => String(s.id) === form.servicioId),
    [servicios, form.servicioId]
  )
  const barberoElegido = useMemo(
    () => barberos.find((b) => String(b.id) === form.barberoId),
    [barberos, form.barberoId]
  )

  function actualizar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }))
  }

  async function enviarReserva(e) {
    e.preventDefault()
    setError('')

    if (!form.nombre || !form.telefono || !form.servicioId || !form.fecha || !form.hora) {
      setError('Completa todos los campos obligatorios para reservar.')
      return
    }

    if (form.tipoAtencion === 'domicilio' && !form.direccion) {
      setError('Ingresa la direccion para la atencion a domicilio.')
      return
    }

    setEnviando(true)
    try {
      const { data, error: dbError } = await supabase
        .from('reservas')
        .insert({
          cliente_nombre: form.nombre,
          cliente_telefono: form.telefono,
          servicio_id: /^\d+$/.test(form.servicioId) ? Number(form.servicioId) : null,
          servicio_nombre: servicioElegido?.nombre ?? null,
          barbero_id: /^\d+$/.test(form.barberoId) ? Number(form.barberoId) : null,
          barbero_nombre: barberoElegido?.nombre ?? null,
          fecha: form.fecha,
          hora: form.hora,
          tipo_atencion: form.tipoAtencion,
          direccion_cliente: form.tipoAtencion === 'domicilio' ? form.direccion : null,
          estado: 'pendiente',
        })
        .select()
        .single()

      if (dbError) throw dbError

      setTicket(data)
    } catch (err) {
      console.error(err)
      setTicket({
        id: '—',
        cliente_nombre: form.nombre,
        servicio_nombre: servicioElegido?.nombre,
        barbero_nombre: barberoElegido?.nombre,
        fecha: form.fecha,
        hora: form.hora,
        tipo_atencion: form.tipoAtencion,
        direccion_cliente: form.tipoAtencion === 'domicilio' ? form.direccion : null,
      })
      setError('Tu reserva se registro para confirmar por WhatsApp (no se pudo guardar en el sistema).')
    } finally {
      setEnviando(false)
    }
  }

  const mensajeConfirmacion = ticket
    ? `Hola ${NEGOCIO.nombre}, quiero confirmar mi reserva:%0A` +
      `• Nombre: ${ticket.cliente_nombre}%0A` +
      `• Servicio: ${ticket.servicio_nombre ?? 'A definir'}%0A` +
      `• Barbero: ${ticket.barbero_nombre ?? 'Sin preferencia'}%0A` +
      `• Fecha: ${ticket.fecha}  Hora: ${ticket.hora}%0A` +
      `• Atencion: ${ticket.tipo_atencion === 'domicilio' ? 'A domicilio' : 'En el local'}%0A` +
      (ticket.tipo_atencion === 'domicilio' ? `• Direccion: ${ticket.direccion_cliente}%0A` : '') +
      `• N.º de ticket: ${ticket.id}`
    : ''

  if (ticket) {
    return (
      <div className="max-w-md mx-auto ticket-edge bg-ink text-paper border border-line-dark">
        <div className="px-8 py-10 text-center">
          <p className="uppercase tracking-widest2 text-xs text-smoke mb-2">Reserva registrada</p>
          <h3 className="text-4xl mb-6">TICKET N.º {String(ticket.id).padStart(3, '0')}</h3>

          <div className="text-left space-y-2 mb-8 text-sm">
            <p><span className="text-smoke">Cliente:</span> {ticket.cliente_nombre}</p>
            <p><span className="text-smoke">Servicio:</span> {ticket.servicio_nombre ?? '—'}</p>
            <p><span className="text-smoke">Barbero:</span> {ticket.barbero_nombre ?? 'Sin preferencia'}</p>
            <p><span className="text-smoke">Fecha:</span> {ticket.fecha} · {ticket.hora}</p>
            <p><span className="text-smoke">Atencion:</span> {ticket.tipo_atencion === 'domicilio' ? 'A domicilio' : 'En el local'}</p>
            {ticket.tipo_atencion === 'domicilio' && (
              <p><span className="text-smoke">Direccion:</span> {ticket.direccion_cliente}</p>
            )}
          </div>

          <div className="perforation mx-auto mb-8" />

          <a href={`https://wa.me/${NEGOCIO.whatsapp}?text=${mensajeConfirmacion}`} target="_blank" rel="noopener noreferrer" className="btn-solido bg-paper text-ink hover:bg-smoke">
            Confirmar por WhatsApp
          </a>

          {error && <p className="text-xs text-smoke mt-6">{error}</p>}
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={enviarReserva} className="max-w-2xl mx-auto ticket-edge bg-paper border border-line">
      <div className="px-8 py-10">
        <div className="flex items-baseline justify-between mb-8 pb-6 border-b border-dashed border-line">
          <h3 className="text-3xl">TICKET DE RESERVA</h3>
          <span className="text-xs uppercase tracking-widest2 text-smoke">{NEGOCIO.nombre}</span>
        </div>

        <div className="mb-6">
          <span className="block text-xs uppercase tracking-widest2 text-smoke mb-2">Tipo de atencion *</span>
          <div className="flex gap-3">
            <button type="button" onClick={() => actualizar('tipoAtencion', 'local')} className={`flex-1 py-3 text-sm uppercase tracking-widest2 border transition-colors ${form.tipoAtencion === 'local' ? 'bg-ink text-paper border-ink' : 'border-line text-ink hover:border-ink'}`}>
              En el local
            </button>
            <button type="button" onClick={() => actualizar('tipoAtencion', 'domicilio')} className={`flex-1 py-3 text-sm uppercase tracking-widest2 border transition-colors ${form.tipoAtencion === 'domicilio' ? 'bg-ink text-paper border-ink' : 'border-line text-ink hover:border-ink'}`}>
              A domicilio
            </button>
          </div>
          {form.tipoAtencion === 'domicilio' && (
            <p className="text-xs text-smoke mt-2">El costo adicional por movilidad se coordina directo por WhatsApp.</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Campo label="Nombre completo *" required>
            <input type="text" value={form.nombre} onChange={(e) => actualizar('nombre', e.target.value)} className="campo-input" placeholder="Tu nombre" />
          </Campo>

          <Campo label="Celular (WhatsApp) *" required>
            <input type="tel" value={form.telefono} onChange={(e) => actualizar('telefono', e.target.value)} className="campo-input" placeholder="9XX XXX XXX" />
          </Campo>

          <Campo label="Servicio *" required>
            <select value={form.servicioId} onChange={(e) => actualizar('servicioId', e.target.value)} className="campo-input">
              <option value="">Elige un servicio</option>
              {servicios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre} — S/ {s.precio}
                </option>
              ))}
            </select>
          </Campo>

          <Campo label="Barbero (opcional)">
            <select value={form.barberoId} onChange={(e) => actualizar('barberoId', e.target.value)} className="campo-input">
              <option value="">Sin preferencia</option>
              {barberos.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nombre}
                </option>
              ))}
            </select>
          </Campo>

          <Campo label="Fecha *" required>
            <input type="date" min={hoyISO()} value={form.fecha} onChange={(e) => actualizar('fecha', e.target.value)} className="campo-input" />
          </Campo>

          <Campo label="Hora *" required>
            <input type="time" value={form.hora} onChange={(e) => actualizar('hora', e.target.value)} className="campo-input" />
          </Campo>

          {form.tipoAtencion === 'domicilio' && (
            <div className="sm:col-span-2">
              <Campo label="Direccion de atencion *" required>
                <input type="text" value={form.direccion} onChange={(e) => actualizar('direccion', e.target.value)} className="campo-input" placeholder="Calle, numero, referencia" />
              </Campo>
            </div>
          )}
        </div>

        {error && <p className="text-sm text-ink/80 mt-6 border border-line px-4 py-3">{error}</p>}

        <button type="submit" disabled={enviando} className="mt-8 w-full bg-ink text-paper py-4 uppercase tracking-widest2 text-sm transition-all duration-300 hover:bg-charcoal hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none">
          {enviando ? 'Reservando…' : 'Reservar turno'}
        </button>
      </div>
    </form>
  )
}

function Campo({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest2 text-smoke mb-2">{label}</span>
      {children}
    </label>
  )
}