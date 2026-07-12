/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F3ECDC',
        ink: '#10281F',
        charcoal: '#183A2C',
        smoke: '#9C9478',
        line: '#E0D6BC',
        'line-dark': '#2A4438',
        laton: '#C2A25F',
        'laton-oscuro': '#A3854A',
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