import { useEffect, useState } from 'react'
import { NEGOCIO } from '../data/constants'

const LINKS = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#galeria', label: 'Galería' },
  { href: '#reservar', label: 'Reservar' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-ink/95 backdrop-blur border-b border-line-dark' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 text-paper">
        <a href="#inicio" className="font-display text-2xl tracking-widest2">
          {NEGOCIO.nombre.toUpperCase()}
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:opacity-60 transition-opacity">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reservar"
          className="hidden md:inline-block border border-paper px-5 py-2 text-sm uppercase tracking-widest2 hover:bg-paper hover:text-ink transition-colors"
        >
          Reservar
        </a>

        <button
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block h-0.5 w-6 bg-paper transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-paper transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-paper transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {open && (
        <ul className="md:hidden bg-ink text-paper px-6 pb-6 flex flex-col gap-4 uppercase tracking-widest2 text-sm">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
