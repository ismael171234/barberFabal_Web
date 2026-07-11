-- ────────────────────────────────────────────────────────────
-- Esquema de base de datos — La Navaja Barbería
-- Ejecutar en: Supabase Dashboard > SQL Editor > New query
-- ────────────────────────────────────────────────────────────

-- 1) SERVICIOS ------------------------------------------------
create table if not exists public.servicios (
  id           bigint generated always as identity primary key,
  nombre       text not null,
  descripcion  text,
  precio       numeric(10,2) not null,
  duracion_min integer default 30,
  created_at   timestamptz default now()
);

-- 2) BARBEROS ---------------------------------------------------
create table if not exists public.barberos (
  id           bigint generated always as identity primary key,
  nombre       text not null,
  especialidad text,
  foto_url     text,
  created_at   timestamptz default now()
);

-- 3) RESERVAS ---------------------------------------------------
create table if not exists public.reservas (
  id               bigint generated always as identity primary key,
  cliente_nombre   text not null,
  cliente_telefono text not null,
  servicio_id      bigint references public.servicios (id),
  servicio_nombre  text,
  barbero_id       bigint references public.barberos (id),
  barbero_nombre   text,
  fecha            date not null,
  hora             time not null,
  estado           text not null default 'pendiente'
                     check (estado in ('pendiente', 'confirmada', 'cancelada', 'completada')),
  created_at       timestamptz default now()
);

-- ────────────────────────────────────────────────────────────
-- Seguridad a nivel de fila (RLS)
-- Los servicios y barberos se pueden LEER públicamente
-- (para mostrarlos en la web). Las reservas solo se pueden
-- INSERTAR desde la web pública, no leer ni editar
-- (eso lo hará el barbero desde el panel de administración
-- con su propio usuario, fuera del alcance de este scaffold).
-- ────────────────────────────────────────────────────────────

alter table public.servicios enable row level security;
alter table public.barberos  enable row level security;
alter table public.reservas  enable row level security;

create policy "Lectura pública de servicios"
  on public.servicios for select
  to anon
  using (true);

create policy "Lectura pública de barberos"
  on public.barberos for select
  to anon
  using (true);

create policy "Cualquiera puede crear una reserva"
  on public.reservas for insert
  to anon
  with check (true);

-- ────────────────────────────────────────────────────────────
-- Datos de ejemplo (opcional, puedes editarlos o borrarlos)
-- ────────────────────────────────────────────────────────────

insert into public.servicios (nombre, descripcion, precio, duracion_min) values
  ('Corte clásico',        'Tijera y máquina, acabado pulido.',     25, 30),
  ('Degradado (fade)',     'Transición perfecta, diseño a detalle.', 30, 40),
  ('Afeitado tradicional', 'Navaja, toalla caliente y espuma.',      20, 25),
  ('Corte + barba',        'Servicio completo, perfilado incluido.', 40, 50),
  ('Diseño de barba',      'Perfilado con navaja y línea definida.', 18, 20),
  ('Corte infantil',       'Para los más pequeños, con paciencia.',  20, 30)
on conflict do nothing;

insert into public.barberos (nombre, especialidad) values
  ('Renzo Vílchez', 'Degradados y diseño'),
  ('Jorge Salinas', 'Afeitado tradicional'),
  ('Diego Morán',   'Cortes clásicos')
on conflict do nothing;

-- Habilita la publicación de tiempo real (usada por Servicios.jsx)
alter publication supabase_realtime add table public.servicios;
