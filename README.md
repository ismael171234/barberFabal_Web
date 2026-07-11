# La Navaja Barbería — Web + Reservas + WhatsApp

Proyecto React (Vite) + Supabase + Tailwind CSS. Paleta blanco/negro,
tipografía Bebas Neue (display) + Work Sans (texto).

## Qué incluye

- Landing profesional (Hero, Servicios tipo carta, Equipo, Contacto)
- Sistema de reservas ("Ticket de reserva") que guarda cada cita en Supabase
- Botón flotante de WhatsApp + confirmación de cada reserva por WhatsApp
- Actualización en tiempo real de servicios (si el barbero cambia precios
  desde Supabase, se refleja al instante en la web)
- Funciona incluso si Supabase falla: usa datos por defecto como respaldo

## 1. Instalar dependencias

```bash
npm install
```

## 2. Crear el proyecto en Supabase

1. Ve a https://supabase.com y crea un proyecto nuevo (o usa uno existente).
2. Entra a **SQL Editor** → **New query**, pega todo el contenido de
   `supabase/schema.sql` y ejecútalo (▶ Run). Esto crea las tablas
   `servicios`, `barberos` y `reservas`, con seguridad a nivel de fila (RLS)
   y datos de ejemplo.
3. Ve a **Project Settings → API** y copia:
   - `Project URL`
   - `anon public key`

## 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` y pega tus credenciales:

```
VITE_SUPABASE_URL=https://tuproyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

## 4. Personalizar el negocio

Abre `src/data/constants.js` y edita:

```js
export const NEGOCIO = {
  nombre: 'La Navaja',
  eslogan: '...',
  whatsapp: '51987654321', // tu número real, sin "+" ni espacios
  direccion: '...',
  horario: '...',
  instagram: '...',
}
```

Este es el número que recibirá los mensajes del botón de WhatsApp y de
cada confirmación de reserva.

## 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre http://localhost:5173

## 6. Compilar para producción

```bash
npm run build
```

Esto genera la carpeta `dist/`, lista para subir a Vercel, Netlify,
Cloudflare Pages o cualquier hosting estático.

## Estructura del proyecto

```
src/
  components/
    Navbar.jsx        Barra de navegación fija
    Hero.jsx           Sección principal
    Nosotros.jsx         Quiénes somos
    Pilares.jsx           Valores de marca (4 pilares)
    Servicios.jsx       Carta de servicios (Supabase + tiempo real)
    Galeria.jsx           Grid de fotos de trabajos (placeholders a reemplazar)
    Equipo.jsx          Barberos
    Testimonios.jsx       Carrusel de reseñas de clientes
    ReservaForm.jsx      Formulario de reserva estilo "ticket"
    CTAFinal.jsx           Banner final de reserva
    Contacto.jsx         Datos de contacto + mapa (placeholder)
    Footer.jsx
    WhatsAppButton.jsx    Botón flotante
  data/
    constants.js          Datos editables del negocio
  supabaseClient.js         Cliente de Supabase
supabase/
  schema.sql                 Tablas + políticas RLS + datos de ejemplo
```

## Próximos pasos sugeridos

- Reemplazar los bloques de `Galeria.jsx` por fotos reales de trabajos
  terminados (basta con poner una imagen de fondo en cada div).
- Editar `Testimonios.jsx` con reseñas reales de clientes.
- Reemplazar el bloque "Espacio reservado para mapa" en `Contacto.jsx`
  por un iframe real de Google Maps con la dirección del local.
- Añadir fotos reales de los barberos (columna `foto_url` en la tabla
  `barberos`, ya está lista en el esquema).
- Crear un panel de administración simple (protegido con Supabase Auth)
  para que el barbero vea y gestione las reservas entrantes; hoy las
  reservas solo se pueden crear desde la web pública (RLS), no leer,
  así que ese panel necesitaría su propio usuario autenticado.
- Configurar un dominio propio y desplegar en Vercel o Netlify.
