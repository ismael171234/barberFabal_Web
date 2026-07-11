import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Nosotros from './components/Nosotros'
import Pilares from './components/Pilares'
import Servicios from './components/Servicios'
import Galeria from './components/Galeria'
import Equipo from './components/Equipo'
import Testimonios from './components/Testimonios'
import ReservaForm from './components/ReservaForm'
import CTAFinal from './components/CTAFinal'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  const [servicioElegido, setServicioElegido] = useState(null)

  function handleElegirServicio(servicio) {
    setServicioElegido(servicio)
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Nosotros />
      <Pilares />
      <Servicios onElegirServicio={handleElegirServicio} />
      <Galeria />
      <Equipo />
      <Testimonios />

      <section id="reservar" className="bg-charcoal py-24 px-6">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="uppercase tracking-widest2 text-sm text-smoke mb-3">Toma tu turno</p>
          <h2 className="text-5xl md:text-6xl text-paper">RESERVAR</h2>
        </div>
        <ReservaForm servicioPreseleccionado={servicioElegido} />
      </section>

      <CTAFinal />
      <Contacto />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
