/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F3EE',   // blanco hueso, fondo principal claro
        ink: '#0B0B0A',     // negro profundo, fondo principal oscuro
        charcoal: '#1A1A18',
        smoke: '#8A8880',   // gris medio para texto secundario
        line: '#D9D6CC',    // línea/hairline sobre fondo claro
        'line-dark': '#333330', // línea/hairline sobre fondo oscuro
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Work Sans"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      backgroundImage: {
        'punch-row': 'radial-gradient(circle, transparent 6px, currentColor 6.5px, currentColor 7px, transparent 7.5px)',
      },
    },
  },
  plugins: [],
}
