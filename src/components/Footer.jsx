import { NEGOCIO } from '../data/constants'

export default function Footer() {
  return (
    <footer className="bg-ink text-smoke py-10 px-6 border-t border-line-dark">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs uppercase tracking-widest2">
        <span>© {new Date().getFullYear()} {NEGOCIO.nombre}. Todos los derechos reservados.</span>
        <span>{NEGOCIO.direccion}</span>
      </div>
    </footer>
  )
}
