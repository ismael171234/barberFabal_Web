import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const faltanCredenciales = !supabaseUrl || !supabaseAnonKey

if (faltanCredenciales) {
  console.warn(
    '[Supabase] Faltan las variables de entorno VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. ' +
    'La web sigue funcionando con datos de respaldo. Copia .env.example a .env y completa tus credenciales para conectar la base de datos real.'
  )
}

// Si faltan credenciales, usamos valores de relleno válidos en formato
// para que createClient no rompa la app. Las peticiones fallarán en
// silencio y cada componente ya sabe volver a sus datos por defecto.
export const supabase = createClient(
  faltanCredenciales ? 'https://placeholder.supabase.co' : supabaseUrl,
  faltanCredenciales ? 'placeholder-anon-key' : supabaseAnonKey
)